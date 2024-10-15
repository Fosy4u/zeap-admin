import { useSelector } from "react-redux";
import zeapApiSlice from "../../redux/services/zeapApi.slice";
import TopSection from "./components/TopSection"
import { globalSelectors } from "../../redux/services/global.slice";
import { useParams } from "react-router-dom";
import Loading from "../../lib/Loading";
import ShopOverview from "./components/ShopOverview";


const Shop = () => {
    const {id} = useParams() 
    const token = useSelector(globalSelectors.selectAuthToken);
    const shopQuery = zeapApiSlice.useGetShopQuery({
        shopId:id
    }, { skip: !token || !id });
    const shop = shopQuery?.data?.data;
    
  return (
    <div>
        {shopQuery.isLoading && <Loading />}
        {shop && 
        <> 
        <TopSection  shop={shop}/> 
        <ShopOverview shop={shop} />
       
        </>}
   
       
       
      
    </div>
  )
}

export default Shop