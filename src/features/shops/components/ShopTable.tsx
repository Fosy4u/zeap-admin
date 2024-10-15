import { ShopInterface } from "../../../interface/interface"
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils/helpers";


const ShopTable = ({shops}:{shops : ShopInterface[] 

}) => {
    const navigate = useNavigate()
    console.log("shops", shops)
  
  return (
   <div className="mt-5 bg-white dark:bg-boxdark dark:text-white w-full overflow-x-auto">





  <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
    <tbody>
      <tr>
        <th scope="col" className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Shop Id</th>
        <th scope="col" className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Shop Name</th>
        <th scope="col" className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Owner</th>
        <th scope="col" className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Phone</th>
        <th scope="col" className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Address</th>
        <th scope="col" className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Disabled</th>
      </tr>
    
       
    {shops?.map((shop: ShopInterface) => (
         <tr 
         onClick={() => navigate(`/shops/${shop?.shopId}`)}
               key={shop?._id}
               className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 cursor-pointer hover:bg-slate-100">
             
         

    <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">{shop?.shopId} </td>
    <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">{capitalizeFirstLetter(shop?.shopName)} </td>
    <td
     onClick={(e) => {
      e.stopPropagation()
      navigate(`/users/${shop?.userId}`)}}
     className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 underline cursor-pointer text-darkGold">{capitalizeFirstLetter(shop?.user?.displayName)} </td>
    <td className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500  ">{shop?.phoneNumber || "N/A"}</td>
      <td className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">{shop?.address || "N/A"}</td>
     
    
      <td className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500  ">{shop?.disabled? "Yes": "No"}</td>
     
    
      </tr>
      
    ))}
    </tbody>
  </table>

</div>
 
 

 
  )
}

export default ShopTable