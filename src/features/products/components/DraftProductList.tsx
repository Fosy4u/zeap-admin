import { Alert } from "flowbite-react"
import { ProductInterface } from "../../../interface/interface"
import { List, Avatar } from "flowbite-react";
import { shortenLongString } from "../../../utils/helpers";
import NoPic from '../../../images/icon/noPhoto.png';
import { HiChevronRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";


const DraftProductList = ({draftProducts=[]}:{
    draftProducts: ProductInterface[]
}) => {
   

    
    const getProductTypeLabel = (type:string) => {
    
        if(type === "readyMadeCloth") return "Ready Made Cloth"
    }
    const getDefaultImageLink = (product:ProductInterface) => {
        if(product?.images?.length > 0) {
            const defaultValue = product?.images?.find((image:any) => image?.isDefault === true)
            if(defaultValue) return defaultValue?.link
            return product?.images[0]?.link
        }
        return NoPic
    }

   
  return (
    <div className="flex flex-col">
        
        {draftProducts?.length === 0 && <Alert color="info">No draft products found for this shop. You can start by selecting one of the below options</Alert>}
        <div className="flex text-md text-darkGold mt-6 mb-2">

    Draft Products
  </div>
        <List unstyled className="max-w-md ">
            {draftProducts?.map((product:ProductInterface) => (
                 <List.Item key={product?.productId} className="py-3 sm:py-4  border rounded-lg my-2 cursor-pointer">
                    <NavLink to={`/products/${product?.shopId}/add-product/readyMadeCloth/${product?._id}`}>
                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
                   <Avatar img={getDefaultImageLink(product)} alt="Neil image" rounded size="sm" />
                   <div className="min-w-0 flex-1">
                     <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{shortenLongString(product?.title, 35)}</p>
                     <p className="truncate text-sm text-slate-500 dark:text-gray-400">{getProductTypeLabel(product?.productType)}</p>
                   </div>
                   <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"><HiChevronRight 
                     className="text-darkGold text-2xl"
                    /></div>
                    
                 </div>
                    </NavLink>
               </List.Item>
            ))}

        </List>
     
    </div>
  )
}

export default DraftProductList