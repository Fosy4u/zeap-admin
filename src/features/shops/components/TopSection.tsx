import { useNavigate } from 'react-router-dom';
import NoPic from '../../../images/user/avatar-anika-visser.png';
import { ShopInterface } from '../../../interface/interface';
import { capitalizeFirstLetter } from '../../../utils/helpers';


const TopSection = ({shop}:{
    shop: ShopInterface
}) => {
  const navigate = useNavigate()
  return (
    <div
    className="bg-lightGreen text-black dark:text-white dark:bg-baseGreen  opacity-100 rounded-b-3xl p-2">
<div className='flex flex-col gap-0.5'>

  <img data-tooltip-target="tooltip-jese" className="w-10 h-10 rounded" src={shop?.imageUrl?.link || NoPic} alt="Medium avatar" />
  <p className=" text-md font-bold">{shop?.shopName}</p>
  <p className=" text-sm text-grey-700 dark:text-slate-400 ">{capitalizeFirstLetter(shop?.address) || "No address"}</p>
  <p className=" text-sm text-grey-700 dark:text-slate-400 ">{shop?.phoneNumber || "No phone number "}</p>
  <div className="flex gap-1 my-2">
    {shop?.disabled ? <span className="inline-flex items-center justify-center gap-1 rounded-full  px-1.5 text-xs text-white mr-2 bg-danger">
        Disabled
        </span> : <span className="inline-flex items-center justify-center gap-1 rounded-full  px-1.5 text-xs text-white mr-2 bg-success">
        Active
        </span>}
    {shop?.isTailor && <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2">
        Tailor
        </span>}
    {shop?.isShoeMaker && <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2">
        Shoe Maker
        </span>}
    {shop?.isMakeUpArtist && <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2">
        MakeUp Artist
        </span>}

  </div>
<div className='my-3 w-full flex flex-1 justify-between items-center'>
  <div
  className='  bg-baseGreen dark:bg-lightGreen text-white dark:text-black rounded-2xl p-2  '
  >
    <p className=" text-sm text-lightGold dark:text-darkGold ">Total Revenue</p>
    <p className=" text-lg font-bold"> {`${shop?.currency?.symbol
}${shop?.totalRevenue || 0}`}</p>
  </div>
  <button 
  onClick={() => navigate(`/products/${shop?.shopId}/add-product`)}
            
            className="flex  w-fit h-fit items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-darkGold rounded-md hover:bg-opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                Add Product
            </button>

  </div>

        </div>
    </div>
  )
}

export default TopSection