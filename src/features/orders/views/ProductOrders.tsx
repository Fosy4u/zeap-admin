import { Alert, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Loading from '../../../lib/Loading';
import { globalSelectors } from '../../../redux/services/global.slice';
import { useSelector } from 'react-redux';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import OrderHeader from '../components/OrderHeader';
import ProductOrderList from '../components/ProductOrderList';
import { ProductOrdersInterface } from '../../../interface/interface';
import { useParams, useSearchParams } from 'react-router-dom';

const ProductOrders = () => {
  const { status } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = 100;
  const pageNumber = searchParams.get('pageNumber') || '1';

  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredProductOrder, setFilteredProductOrder] = useState([]);

  const [input, setInput] = useState('');
  const productOrdersQuery = zeapApiSlice.useGetProductOrdersQuery(
    {
      status: status,
      limit: Number(limit),
      pageNumber: pageNumber ? parseInt(pageNumber) : 1,
    },
    { skip: !token },
  );
  const productOrders = productOrdersQuery?.data?.data?.productOrders;
  const totalCount = productOrdersQuery?.data?.data?.totalCount;
  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  };

  const searchRegex = new RegExp(escapeRegExp(input), 'i');
  // recursive search function
  const search = (item: any) => {
    let found = false;

    if (typeof item === 'string') {
      if (searchRegex.test(item?.toString())) {
        found = true;
        return found;
      }
    }

    if (typeof item === 'object' && item !== null) {
      Object.keys(item).forEach((key) => {
        const value = item[key];
        const match = search(value);
        if (match) {
          found = true;
          return found;
        }
      });
    }
    return found;
  };

  useEffect(() => {
    if (productOrders?.length > 0) {
      const result = productOrders?.filter((row: ProductOrdersInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof ProductOrdersInterface]);
        });
      });

      setFilteredProductOrder(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, productOrders]);

  const changePage = (page: number) => {
    searchParams.set('pageNumber', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div>
      <OrderHeader setInput={setInput} title={'Product Orders'} />

      {productOrders?.length === 0 &&
        productOrdersQuery.status === 'fulfilled' && (
          <div>
            <Alert color="info" className="mb-4">
              No order is on the selected status
            </Alert>
          </div>
        )}
      {productOrdersQuery.isLoading && <Loading />}
      {filteredProductOrder?.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="min-h-[55vh]">
            <ProductOrderList productOrders={filteredProductOrder} />
          </div>
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={pageNumber ? parseInt(pageNumber) : 1}
              totalPages={Math.ceil(totalCount / limit)}
              onPageChange={(page) => {
                console.log('page', page);
                changePage(page);
              }}
              showIcons
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOrders;
