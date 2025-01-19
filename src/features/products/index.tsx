import { useSelector } from 'react-redux';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import { globalSelectors } from '../../redux/services/global.slice';

import Loading from '../../lib/Loading';
import { useEffect, useState } from 'react';
import ProductHeader from './components/ProductHeader';

import { ProductInterface } from '../../interface/interface';
import ProductTileList from './components/ProductTileList';
import ProductNav from './components/ProductNav';
import { Alert, Pagination } from 'flowbite-react';
import ProductFilters from './components/ProductFilters';
import { useParams, useSearchParams } from 'react-router-dom';
import { MobileProductFilters } from './components/MobileProductFilters';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = searchParams.get('pageNumber') || '1';
  const limit = 100;
  const { status } = useParams<{ status: string }>();
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [input, setInput] = useState('');

  const param: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    param[key] = value;
  });

  const productsQuery = zeapApiSlice.useGetProductsQuery(
    {
      status: status || 'live',
      limit,
      pageNumber: pageNumber ? parseInt(pageNumber) : 1,
      ...(status === 'deleted' && { disabled: true }),
      ...param,
    },
    { skip: !token },
  );
  const products = productsQuery?.data?.data?.products;

  const dynamicFilters = productsQuery?.data?.data?.dynamicFilters;
  const totalCount = productsQuery?.data?.data?.totalCount;

  const isLoading = productsQuery.isLoading;

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
    if (products?.length > 0) {
      const result = products?.filter((row: ProductInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof ProductInterface]);
        });
      });

      setFilteredProducts(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, products]);
  const changePage = (page: number) => {
    searchParams.set('pageNumber', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div>
      <ProductHeader setInput={setInput} title={'Products'} />

      {isLoading && <Loading />}
      <ProductNav />
      {totalCount === 0 && !productsQuery.isLoading && (
        <div className="m-2 mt-4">
          <Alert color="info">{`No ${status} products`}</Alert>
        </div>
      )}
      {products?.length > 0 && (
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="flex md:hidden">
            <MobileProductFilters
              dynamicFilters={dynamicFilters}
              totalCount={totalCount}
            />
          </div>
          <div className="hidden md:flex flex-none md:w-64">
            <ProductFilters
              dynamicFilters={dynamicFilters}
              totalCount={totalCount}
            />
          </div>
          <div className="flex flex-col gap-8">
            <ProductTileList products={filteredProducts} />
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
        </div>
      )}
    </div>
  );
};

export default Products;
