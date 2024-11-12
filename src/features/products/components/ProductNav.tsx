import { useNavigate, useParams } from "react-router-dom";


const ProductNav = (
   
) => {
    const {status} = useParams<{status:string}>();
    const navigate = useNavigate();
    const listOfStatus = ["Live", "Draft", "Under Review", "Rejected", "Deleted"];
  return (
    <div className="inline-flex overflow-scroll rounded w-full">
    {listOfStatus.map((item) => (
        <button 
        key={item}
        onClick={()=>navigate(`/products/${item?.toLowerCase()}`)}
        
        className={`inline-flex w-full h-7 md:h-10 ${status === item?.toLowerCase() && "bg-darkGold text-white"} items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}>
          <span className="text-xs md:text-sm">{item}</span>
        </button>
    ))}
    </div>
  )
}

export default ProductNav