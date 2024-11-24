import { useSelector } from 'react-redux';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { globalSelectors } from '../../../redux/services/global.slice';
import { useParams, useSearchParams } from 'react-router-dom';
import Loading from '../../../lib/Loading';
import { useEffect, useState } from 'react';
import {
  ColorInterface,
  VariationInterface,
} from '../../../interface/interface';
import { Accordion, Alert, Badge, Button, Table } from 'flowbite-react';
import ProductImage from './ProductImage';
import { getStatusColor, numberWithCommas } from '../../../utils/helpers';
import ShopBar from '../../shops/components/ShopBar';
import UserTile from '../../users/components/UserTile';
import ProductActions from './ProductActions';
import ProductTimeline from './ProductTimeline';
import ProductReview from './ProductReview';
import ProductPromo from './ProductPromo';

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}
const Product = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { id } = useParams<{
    shopId: string;
    option: string;
    step: string;
    id: string;
  }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currency = useSelector(globalSelectors.selectCurrency);
  const color = searchParams.get('color');
  const productQuery = zeapApiSlice.useGetProductByIdQuery(
    { _id: id },
    { skip: !token || !id },
  );
  const product = productQuery?.data?.data;
  const categories = product?.categories;
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token },
  );
  const options = productOptionsQuery?.data?.data;
  const colors: ColInterface[] = options?.readyMadeClothes?.colorEnums;
  const isLoading = productQuery.isLoading || productOptionsQuery.isLoading;

  const [images, setImages] = useState<string[]>([]);
  const [numberOfShownVariations, setNumberOfShownVariations] =
    useState<number>(5);
  const [viewAllTimeline, setViewAllTimeline] = useState<boolean>(false);
  const getTextColor = (hex: string) => {
    const red = parseInt(hex.substring(1, 3), 16);
    const green = parseInt(hex.substring(3, 5), 16);
    const blue = parseInt(hex.substring(5, 7), 16);
    return red * 0.299 + green * 0.587 + blue * 0.114 > 186
      ? 'text-black'
      : 'text-white';
  };
  useEffect(() => {
    if (!color && product) {
      setImages(
        product.colors[0]?.images.map((image: { link: string }) => image.link),
      );
    }
  }, [product, color]);
  useEffect(() => {
    if (product) {
      const color = product.colors.find(
        (color: ColorInterface) => color.value === searchParams.get('color'),
      );
      if (color) {
        setImages(color?.images.map((image: { link: string }) => image.link));
      }
    }
  }, [product, searchParams]);

  const getBg = (value: string) => {
    const color = colors.find((color) => color.name === value);
    return color?.hex || color?.background;
  };

  return (
    <div>
      {isLoading && <Loading />}
      {!product?._id && productQuery?.status === 'fulfilled' && (
        <Alert color="info">Product not found</Alert>
      )}
      {product?._id && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            {product?.colors?.length > 0 && (
              <ProductImage images={images || []} />
            )}
            {product?.colors?.length === 0 && (
              <div className="flex items-center h-100">
                <Alert color="info">
                  No images or colours uploaded yet found for this product
                </Alert>
              </div>
            )}
            <div className="hidden md:block mt-4">
              <div className="text-darkGold text-lg mt-4">Reviews</div>
              <div>
                <ProductReview product={product} />
              </div>
            </div>
          </div>
          <div className=" flex flex-col">
            <div>
              <p className="text-2xl font-bold">{product?.title}</p>
              <p className="text-md text-slate-500">{product?.subTitle}</p>
              <p className="text-sm text-gray-500">{product?.description}</p>
            </div>
            <div>
              <div className="text-darkGold text-lg mt-4">Status</div>
              <Badge
                size="md"
                color={getStatusColor(product?.status)}
                className="w-fit"
              >
                {product?.status}
              </Badge>
            </div>
            <div>
              <div className="text-darkGold text-lg mt-4">Colors</div>
              <p>{color}</p>
              <div className="flex gap-2">
                {product?.colors?.map(
                  (color: ColorInterface, index: number) => (
                    <div
                      onClick={() => {
                        setSearchParams({ color: color.value });
                        setImages(color?.images.map((image) => image.link));
                      }}
                      key={index}
                      className="w-8 h-8 rounded-full cursor-pointer"
                      style={{ background: getBg(color?.value) }}
                    ></div>
                  ),
                )}
              </div>
            </div>

            <div>
              <div className="text-darkGold text-lg mt-4">Sizes</div>
              <div className="flex gap-2">
                {product?.sizes?.map((size: string, index: number) => (
                  <div
                    key={index}
                    className="p-2 border rounded-md cursor-pointer"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-darkGold text-lg mt-4">Prices</div>
              <div className="flex gap-2 flex-wrap">
                {product?.variations?.map(
                  (variation: VariationInterface, index: number) => (
                    <div
                      key={index}
                      className="p-2 border rounded-md cursor-pointer"
                    >
                      {currency?.symbol}
                      {numberWithCommas(variation?.price)}
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="text-darkGold text-lg mt-4">Categories</div>
              <div className="flex gap-2">
                <Accordion className="w-full">
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Main
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {categories?.main?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          ),
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Designs
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap flex-wrap">
                        {categories?.design?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          ),
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Fit
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {categories?.fit?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          ),
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Style
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {categories?.style?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          ),
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Occasion
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap flex-wrap">
                        {categories?.occasion?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          ),
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Fastening
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {categories?.fastening?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          ),
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Gender
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {categories?.gender?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          ),
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Sleeve Length
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">{categories?.sleeveLength}</Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Heel Type
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">{categories?.heelType}</Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Heel Height
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">{categories?.heelHeight}</Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Product Group
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">{categories?.productGroup}</Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Accessory Type
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">{categories?.accessoryType}</Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className="h-8 text-md rounded-md items-center  flex">
                      Brand
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">{categories?.brand}</Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Age Group
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">{categories?.age?.ageGroup}</Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Age Range
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">
                          {categories?.age?.ageGroup === 'Adults'
                            ? 'N/A'
                            : categories?.age?.ageRange}
                        </Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>
              <div>
                <div className="flex justify-between mt-4 item-center mb-2">
                  <span className="text-darkGold text-lg ">Variation</span>
                  <div>
                    <Button
                      onClick={() => {
                        setNumberOfShownVariations(
                          numberOfShownVariations === 5
                            ? product?.variations?.length
                            : 5,
                        );
                      }}
                      color="primary"
                      size="xs"
                    >
                      {numberOfShownVariations === 5 ? 'View All' : 'View Less'}
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>SKU</Table.HeadCell>
                      <Table.HeadCell>Color</Table.HeadCell>
                      <Table.HeadCell>Size</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                      <Table.HeadCell>Discount</Table.HeadCell>
                      <Table.HeadCell>Quantity</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {product?.variations
                        ?.slice(0, numberOfShownVariations)
                        ?.map((variation: VariationInterface) => (
                          <Table.Row key={variation.sku}>
                            <Table.Cell>{variation.sku}</Table.Cell>
                            <Table.Cell>
                              <span
                                className={`text-sm font-semibold p-1 rounded-md ${getTextColor(getBg(variation.colorValue) as string)}`}
                                style={{
                                  background: getBg(variation.colorValue),
                                }}
                              >
                                {variation.colorValue}
                              </span>
                            </Table.Cell>
                            <Table.Cell className="text-darkGold">
                              {variation.size}
                            </Table.Cell>
                            <Table.Cell>
                              {currency?.symbol}
                              {numberWithCommas(variation.price)}
                            </Table.Cell>
                            <Table.Cell>
                              {variation.discount
                                ? `${currency?.symbol}${numberWithCommas(
                                    variation.discount,
                                  )}`
                                : 'N/A'}
                            </Table.Cell>
                            <Table.Cell>{variation.quantity}</Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </div>
                <div className="md:hidden">
                  {product?.variations?.map((variation: VariationInterface) => (
                    <div
                      key={variation.sku}
                      className="border rounded p-2 mb-2"
                    >
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-semibold">
                            SKU:{' '}
                            <span className="font-normal text-slate-400">
                              {variation.sku}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            Color:{' '}
                            <span
                              className={`text-sm font-semibold ${getTextColor(getBg(variation.colorValue) as string)}`}
                              style={{
                                background: getBg(variation.colorValue),
                              }}
                            >
                              {variation.colorValue}
                            </span>
                          </p>
                          <p className="text-sm font-semibold">
                            Size:{' '}
                            <span className="font-normal text-darkGold">
                              {variation.size}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            Price:{' '}
                            <span className="font-normal text-slate-400">
                              {currency?.symbol}
                              {numberWithCommas(variation.price)}
                            </span>
                          </p>
                          <p className="text-sm font-semibold">
                            Discount:{' '}
                            <span className="font-normal text-slate-400">
                              {variation.discount
                                ? `${currency?.symbol}${numberWithCommas(
                                    variation.discount,
                                  )}`
                                : 'N/A'}
                            </span>
                          </p>
                          <p className="text-sm font-semibold">
                            Quantity:{' '}
                            <span className="font-normal text-slate-400">
                              {variation.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-darkGold text-lg mt-4">Promo</div>
                <div>
                  <ProductPromo productId={product?.productId} />
                </div>
              </div>
              <div>
                <div className="text-darkGold text-lg mt-4">Shop</div>
                <div>
                  <ShopBar shop={product?.shop} />
                </div>
              </div>

              <div>
                <div className="text-darkGold text-lg mt-4">Posted By</div>
                <div>
                  <UserTile user={product?.postedBy} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mt-4 item-center mb-2">
                  <span className="text-darkGold text-lg ">TimeLine</span>
                  <div>
                    <Button
                      onClick={() => {
                        setViewAllTimeline(!viewAllTimeline);
                      }}
                      color="primary"
                      size="xs"
                    >
                      {!viewAllTimeline ? 'Expand' : 'Collapse'}
                    </Button>
                  </div>
                </div>
                <div>
                  <ProductTimeline
                    timeLines={product?.timeLine}
                    viewAll={viewAllTimeline}
                  />
                </div>
              </div>
              <div className="md:hidden ">
                <div className="text-darkGold text-lg mt-4">Reviews</div>
                <div>
                  <ProductReview product={product} />
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )}
      {product && <ProductActions product={product} />}
    </div>
  );
};

export default Product;
