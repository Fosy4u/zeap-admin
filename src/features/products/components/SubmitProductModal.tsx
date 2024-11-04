import { useContext, useState } from "react";

import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import Loading from "../../../lib/Loading";
import { Alert, Button, Modal } from "flowbite-react";
import { HiInformationCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../contexts/themeContext";


const SubmitProductModal = ({ close,open,   productId}:{
  
    close: (open:boolean) => void,
    open: boolean,
    productId: string,
  
    
}) => {
    const { setDimBackground} = useContext(ThemeContext);
    const navigation = useNavigate();
    const [submitVariation, submitVariationStatus ] = zeapApiSlice.useSubmitProductMutation();
    
    const isLoading = submitVariationStatus.isLoading
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = () => {
        
       
        const payload = {
       productId,
    
    
        }
       
        submitVariation({payload}).unwrap()
        .then(() => {
            setDimBackground(false)
            navigation(-1)
          
    
           
        }).catch((err) => {
            console.log("err", err)
            setError(err.data.error)
          
        }
        )
      
      }

        

  return (
   
<>
<Modal show={open} size="md" onClose={() => close(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">

          {isLoading && <Loading />}
          {error && <Alert color="failure"icon={HiInformationCircle} className="my-4">{error}</Alert>}
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-info" />
            <div className="flex flex-col mb-4">
            <p className=" text-md font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to submit this product?
                    
            </p>
            <p className="text-xs text-slate-500">
              This will change the status of the product to <span className="text-gray-500">under review</span> and seller will not be able to edit the product without contacting the admin except for the variation
            </p>
            
            </div>
            <div className="flex justify-center gap-4">
              <Button color="success" 
                onClick={handleSubmit}
                >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => close(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
</>

  )
}

export default SubmitProductModal