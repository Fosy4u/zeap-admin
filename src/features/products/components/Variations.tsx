import { Alert, Badge, Button, Label, Table } from "flowbite-react"
import { useContext, useState } from "react"
import { HiInformationCircle } from "react-icons/hi"
import AddVariationModal from "./AddVariationModal"
import { ProductInterface, VariationInterface } from "../../../interface/interface"
import { ThemeContext } from "../../../contexts/themeContext"
import { numberWithCommas } from "../../../utils/helpers"
import DeleteVariationModal from "./DeleteVariationModal"






const Variations = ({
    product
}:{
    product: ProductInterface 
}) => {const { setDimBackground} = useContext(ThemeContext);
    const [showInfo, setShowInfo] = useState(true)
    const [currVariation, setCurrVariation] = useState<VariationInterface | null>(null)
    const[openModal, setOpenModal] = useState<boolean>(false)
    const[openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
   const currency = product?.currency?.symbol|| "₦"
   

    
  return (
    <div className="flex flex-col gap-4">
       
 {!showInfo && <Badge color="info"
 icon = {HiInformationCircle}
 className="cursor-pointer"
  size="xs" onClick={() => setShowInfo(true)} >Show Info</Badge>}

      {showInfo && 
    <Alert

    color="info"
    icon={HiInformationCircle}
    onDismiss={() => setShowInfo(false)}
    rounded
  
  >
    <span className="font-medium">Info alert! </span> 
    <span className="block sm:inline">
        You can add multiple variations to your product. For example, if you are selling a T-shirt, you can add different sizes and colors as variations.
        Start by selecting one of the selected colors and then add the sizes, price and quantity. 
    </span>
  </Alert>}

  <div className=' p-2'>
   
        <div className="mb-2 block">
          <Label  value="Added Variations" />
          
        </div>
        <div>
    <div className="hidden md:block">
        <Table striped >
        <Table.Head>
          <Table.HeadCell>SKU</Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Size</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {product?.variations?.map((variation) => (
                <Table.Row key={variation.sku}>
                    <Table.Cell>{variation.sku}</Table.Cell>
                    <Table.Cell className="text-darkGold">{variation.colorValue}</Table.Cell>
                    <Table.Cell className="text-darkGold">{variation.size}</Table.Cell>
                    <Table.Cell>{currency}{numberWithCommas( variation.price)}</Table.Cell>
                    <Table.Cell>{variation.quantity}</Table.Cell>
                    <Table.Cell className="flex gap-2">
                        <Badge 
                        className="cursor-pointer"
                        color="failure" size="xs" onClick={() => {
                            setCurrVariation(variation)
                            setOpenDeleteModal(true)
                            setDimBackground(true)
                        }}>Delete</Badge>
                    
                        <Badge 
                        className="cursor-pointer"
                        onClick={() => {
                            setCurrVariation(variation)
                            setDimBackground(true)
                            setOpenModal(true)
                        }}
                        color="primary" size="xs">Edit</Badge>
                        </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
        </Table>
    </div>
    <div className="md:hidden">
        {product?.variations?.map((variation) => (
            <div key={variation.sku} className="border rounded p-2 mb-2">
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="text-sm font-semibold">SKU: <span className="font-normal text-slate-400">{variation.sku}</span></p>
                       
                    </div>
                    <div>
                      
                        <p className="text-sm font-semibold">Color: <span className="font-normal text-darkGold">{variation.colorValue}</span></p>
                        <p className="text-sm font-semibold">Size: <span className="font-normal text-darkGold">{variation.size}</span></p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Price: <span className="font-normal text-slate-400">{currency}{numberWithCommas( variation.price)}</span></p>
                        <p className="text-sm font-semibold">Quantity: <span className="font-normal text-slate-400">{variation.quantity}</span></p>
                    </div>
                </div>
                <div className="flex justify-end mt-2 gap-2 ">
                    <Badge
                    className="cursor-pointer"
                     color="failure" size="xs"
                    onClick={() => {
                        setCurrVariation(variation)
                        setOpenDeleteModal(true)
                        setDimBackground(true)
                    }}
                     >Delete</Badge>
                    <Badge
                    className="cursor-pointer"
                        onClick={() => {
                            setCurrVariation(variation)
                            setDimBackground(true)
                            setOpenModal(true)
                        }}
                     color="primary" size="xs">Edit</Badge>
                </div>
                </div>
        ))}
        </div>
        </div>
    </div>
    <div className="flex mt-4">
    <Button color="primary" size="sm"
    onClick={() => {
        setDimBackground(true)
        setOpenModal(true) 
    }}
     >Add Variation </Button>
    </div>

    {openModal && <AddVariationModal
    currVariation={currVariation}
     close={() => {setDimBackground(false); setOpenModal(false)}} open={openModal} product={product} />}

     {openDeleteModal && <DeleteVariationModal open={openDeleteModal} close={() => {
        setCurrVariation(null)
        setDimBackground(false)
        setOpenDeleteModal(false)}} productId={product?.productId}
        variation={currVariation} 
      />}
</div>
  )
}

export default Variations