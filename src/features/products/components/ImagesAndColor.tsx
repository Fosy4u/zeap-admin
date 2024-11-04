import { Accordion, Alert, Badge, Button, Dropdown, Label } from "flowbite-react"
import { useContext, useEffect, useState } from "react";
import AddImageToColor from "./AddImageToColor";
 import { ThemeContext } from "../../../contexts/themeContext";
import { ColorInterface,  ProductInterface } from "../../../interface/interface";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import Loading from "../../../lib/Loading";
import DeleteProductColor from "./DeleteProductColor";



const BadgeThem = {
    "root": {
      "base": "flex h-fit w-fit items-center gap-1 font-semibold cursor-pointer",
      "color": {

        "primary": "border border-darkGold text-black dark:text-white  hover:bg-gold hover:text-black ",
      },
      
      "size": {
        "xxs": "p-1 text-[0.6rem]",
       
      }
    },
    
  }

const ImagesAndColor = ({colors,product }:{
    colors: string[],
   product: ProductInterface 
}) => {
    console.log("product is", product)
     const { setDimBackground} = useContext(ThemeContext);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [newColor, setNewColor] = useState('');
    const [error, setError] = useState('');
    const [currColor, setCurrColor] = useState<ColorInterface>();

    const [setAsDefault, setAsDefaultStatus] = zeapApiSlice.useSetProductImageAsDefaultMutation();
    const [deleteProductImage, deleteProductImageStatus] = zeapApiSlice.useDeleteProductImageMutation();
    const isLoading = setAsDefaultStatus.isLoading || deleteProductImageStatus.isLoading;
useEffect(() => {
    setDimBackground(openModal)
}
// eslint-disable-next-line react-hooks/exhaustive-deps
, [openModal])
useEffect(() => {
    if(error) {
        setTimeout(() => {
            setError('')
        }, 3000)
    }
}
, [error])

  return (
<div className="">
    {isLoading && <Loading />}
    <div className='p-2'>
    {error && (
                <Alert  color="failure" className="mb-4">
                    {error}
                </Alert>
            )}
       
        <div className="mb-2 block">
          <Label  value="Selected Colors with Images" />
        </div>
        <Accordion>
            {product?.colors?.map((color, index) => (
                <Accordion.Panel key={index}>
        <Accordion.Title className="text-darkGold">{color?.value}</Accordion.Title>
        <Accordion.Content>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-2">
                       {color?.images?.map((image, index) => (
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <div key={index} className="relative   my-2 p-2">
                           <img key={index} src={image?.link} alt={color?.value} className="w-full h-50 object-contain" />
                <button
                    onClick={() => {
                        const payload = {productId: product?.productId, color: color?.value, imageName: image?.name}
                        deleteProductImage({payload}).unwrap().then().catch((err) => {
                            setError(err?.data?.error)
                            
                        }
                        )
                       }}
                 className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
            </div>
                           <Badge 
                            theme={BadgeThem}
                            onClick={
                                image?.isDefault ? () => {} : () => {
                                    const payload = {productId: product?.productId, color: color?.value, imageName: image?.name}
                                    setAsDefault({payload}).unwrap().then().catch((err) => {
                                  
                                        setError((err?.data?.error))
                                        
                                    }
                                    )
                                }
                            }

                           color={
                                 image?.isDefault ? "success" : "primary"
                            } size="xxs" >
                             {image?.isDefault ? "Default" : "Set Default"}
                             </Badge>
                           
                        </div>
                          ))}

                        </div>
            <div className="flex justify-end gap-2 my-4">
                <Button size="xs" color="primary" onClick={() => {
                    setCurrColor(color)
                    setOpenModal(true)}}>
                        {color?.images?.length > 0 ? "Add More Images" : "Add Image"}
                    </Button>
                <Button size="xs" color="failure" onClick={() => {
                    setCurrColor(color)
                    setDimBackground(true)
                    setOpenDeleteModal(true)
                }}>Delete Color</Button>
            </div>
                </Accordion.Content>
                </Accordion.Panel>
            ))}
           
           </Accordion>


     </div>
     <div className="flex my-4">
        <Dropdown  label={newColor? newColor : "Add Color"} color={newColor?"success" : "primary"} >
            {colors?.map((color) => (
                <Dropdown.Item className="text-black" key={color} value={color}
                onClick={() => {
                    setCurrColor(undefined);
                    setNewColor(color); setOpenModal(true)}}
                 >
                    {color}
                </Dropdown.Item>
            ))}
        </Dropdown>
     </div>
{openModal &&
     <AddImageToColor openModal={openModal} 
     productId={product? product?.productId : ''}
        close={() => {setOpenModal(false); setNewColor('')}}
        color={currColor?.value || newColor}   currColor={currColor}/>
      
        
}
{openDeleteModal && <DeleteProductColor open={openDeleteModal}
    productId={product? product?.productId : ''}
 close={() => {
    setCurrColor(undefined)
    setDimBackground(false)
    setOpenDeleteModal(false)}} color={currColor} />}
     
</div>
  )
}

export default ImagesAndColor