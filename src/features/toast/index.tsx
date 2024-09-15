import { useSelector } from "react-redux";
import { globalSelectors } from "../../redux/services/global.slice";
import Toast from "./Toast";


const ToastContainer = () => {
    const toasts = useSelector(globalSelectors.selectToasts);

  return (
    <div 
    className="absolute right-0 bottom-0 z-9999 p-4"
    > 
    
         
        {
        toasts.map((toast) => (
          <div key={toast.id} >
            <Toast  
            message={toast.title || toast.message}
            id={toast.id}
            variant={toast.variant}
            />
          </div>
        ))
        
        }</div>
  )
}

export default ToastContainer;