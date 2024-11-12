
import { ProductInterface } from "../../../interface/interface"

// import { shortenLongString } from "../../../utils/helpers";
import NoPic from '../../../images/icon/noPhoto.png';
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../redux/services/global.slice";
import { Badge } from "flowbite-react";
// import { HiChevronRight } from "react-icons/hi";
// import { NavLink } from "react-router-dom";


const ProductTileList = ({products=[]}:{
    products: ProductInterface[]
}) => {
   
const currency = useSelector(globalSelectors.selectCurrency);
    
    // const getProductTypeLabel = (type:string) => {
    
    //     if(type === "readyMadeCloth") return "Ready Made Cloth"
    //     if(type ==="readyMadeShoe") return "Ready Made Footwear"
    //     if(type ==="accessory") return "Accessory"
    // }
    const getDefaultImageLink = (product:ProductInterface) => {
        if(product?.colors?.length > 0) {
          const colors = product.colors;
          //array of color images
          const colorImages = colors.map((color) => color.images).flat();
          const isDefault = colorImages.find((image) => image.isDefault);
          if(isDefault) {
              return isDefault.link;
          }
          return colorImages[0]?.link;
        }
        return NoPic
    }

    

   
  return (
    <div className="flex flex-col md:mt-16">
        
        
        <div className="flex text-md text-darkGold mt-6 mb-2">

    Draft Products
  </div>
        <div className="md:hidden grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 w-full items-center justify-center">
            {products?.map((product:ProductInterface) => (
              <div
              key={product?.productId}
              className="flex flex-col light:bg-grey8 gap-2 p-2 my-2 cursor-pointer rounded-lg shadow-md duration-300 hover:scale-105 hover:shadow-lg  "
             
             >
                <img src={getDefaultImageLink(product)} alt={product?.title} className="w-full h-50 object-contain" />

               
                <div className="">
                  <p className="mb-2 text-sm  dark:text-white text-gray-900">{product?.title}</p>
        
                </div>
                <div className="flex  flex-col">
                  <span className="flex justify-between">
                  {product?.variations[0]?.price ? <p className="mr-2 text-md font-semibold text-gray-900 dark:text-white">{currency?.symbol}{product?.variations[0]?.discount?.discountPrice || product?.variations[0]?.price}</p> : <Badge color="failure">No price set </Badge>}
                 {product?.variations[0]?.discount?.discountPrice && <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300 ">{currency?.symbol}{product?.variations[0]?.price}</p>}
                  </span>
                  {product?.variations[0]?.discount?.percentage && <p className="text-xs text-green-500">{product?.variations[0]?.discount?.percentage}% off</p>}
                </div>
               

              </div>
              // <div
              // key={product?.productId}
              // className="flex flex-col light:bg-grey8 gap-2 p-2 my-2 cursor-pointer w-[160]  border rounded-lg"
             
              // >
              //   <div style={{
              //   background: `url(${getDefaultImageLink(product)})`,
              //   backgroundSize: 'cover',
              //   backgroundPosition: 'center',
              //   backgroundRepeat: 'no-repeat'
              // }}
              // className="flex flex-col p-2 border rounded-lg my-2  h-[484px] "
              // >

              //   </div>
              //   <div className="">
              //     <p className=" text-sm font-bold">{product?.title}</p>
              //     <p className=" text-sm">{getProductTypeLabel(product?.productType)}</p>
              //   </div>
               

              // </div>
            ))}

        </div>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 w-full  items-center justify-center">
            {products?.map((product:ProductInterface) => (
              <div className="mx-auto mt-2  transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
              <img className="h-[484px] w-full object-cover object-center" src={getDefaultImageLink(product)} alt={product?.title}/>
              <div className="p-4 h-32">
                <h2 className="mb-2 text-sm  dark:text-white text-gray-900">{product?.title}</h2>
    
                <div className="flex items-center">
                {product?.variations[0]?.price ? <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">{currency?.symbol}{product?.variations[0]?.price}</p> : <Badge color="failure">No price set </Badge>}
                {product?.variations[0]?.discount?.discountPrice && <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">{currency?.symbol}{product?.variations[0]?.discount?.discountPrice}</p>}
                {product?.variations[0]?.discount?.percentage && <p className="text-xs text-green-500">{product?.variations[0]?.discount?.percentage}% off</p>}
                </div>
              </div>
            </div>
           
              // <div
              // key={product?.productId}
              // className="flex flex-col light:bg-grey8 gap-2 p-2 my-2 cursor-pointer w-[160]  border rounded-lg"
             
              // >
              //   <div style={{
              //   background: `url(${getDefaultImageLink(product)})`,
              //   backgroundSize: 'cover',
              //   backgroundPosition: 'center',
              //   backgroundRepeat: 'no-repeat'
              // }}
              // className="flex flex-col p-2 border rounded-lg my-2  h-[484px] "
              // >

              //   </div>
              //   <div className="">
              //     <p className=" text-sm font-bold">{product?.title}</p>
              //     <p className=" text-sm">{getProductTypeLabel(product?.productType)}</p>
              //   </div>
               

              // </div>
            ))}

        </div>
     
    </div>
  )
}

export default ProductTileList