import { ShopInterface, UserInterface } from "../../../interface/interface"
import UserInfo from "../../users/components/UserInfo"
import ShopInfo from "./ShopInfo"


const ShopProfile = ({user, shop}:{
    user: UserInterface,
    shop: ShopInterface
}) => {
  return (
    <div className="my-4 w-full">
        
    <div className="text-darkGold my-2">
        Profile
    </div>
    <div className="flex flex-col gap-2">
         <UserInfo user={user}/>
         <ShopInfo shop={shop} />
         </div>
    </div>
  )
}

export default ShopProfile