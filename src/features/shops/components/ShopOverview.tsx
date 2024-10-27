import { ShopInterface } from "../../../interface/interface"
import StatCard2 from "../../../lib/StatCard2"
import ShopReport from "./ShopReport"
import ShopSalesCount from "./ShopSalesCount"
import ShopSalesRevenue from "./ShopSalesRevenue"
import ShopWeeklySales from "./ShopWeeklySales"


const ShopOverview = ({shop}:{
    shop: ShopInterface
}) => {
  return (
    <div className="my-4 w-full">
        
        <div className="text-darkGold my-2">
            Overview
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard2 title= "Product Sold" value = {203}/>
        <StatCard2 title= "Orders Received" value = {203}/>
        <StatCard2 title= "Orders Delivered" value = {203}/>
        <StatCard2 title= "Orders Pending" value = {203}/>
        </div>
        <div className="flex flex-col my-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShopSalesCount />
                <ShopSalesRevenue shop = {shop}/>
            </div>
        </div>
        <div>
            <ShopReport />
        </div>
        <div>
            <ShopWeeklySales shop = {shop} />
        </div>
       
    </div>
  )
}

export default ShopOverview