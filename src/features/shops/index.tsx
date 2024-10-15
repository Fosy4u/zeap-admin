import { useSelector } from "react-redux";
import zeapApiSlice from "../../redux/services/zeapApi.slice";
import { globalSelectors } from "../../redux/services/global.slice";

import Loading from "../../lib/Loading";
import { useEffect, useState } from "react";
import ShopHeader from "./components/ShopHeader";
import ShopTable from "./components/ShopTable";





const Shops = () => {


  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredShops, setFilteredShops] = useState([]);
  const [input, setInput] = useState("");
  const shopsQuery = zeapApiSlice.useGetShopsQuery({},  { skip: !token });
  const shops = shopsQuery?.data?.data;

  useEffect(() => {
    if (shops?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");

      const result = shops?.filter((row:any) => {
        return Object.keys(row).some((field) => {
          return (
            searchRegex.test(row[field]?.toString()) ||
            searchRegex.test(row[field]?.regNo?.toString())
          );
        });
      });

      setFilteredShops(result);
    }
  }, [input, shops]);

  const escapeRegExp = (value:string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
 
  return <div>
    
  
    <ShopHeader setInput={setInput} title={"Shops"}  />

    {shops?.length === 0 && !shopsQuery.isLoading && <div>No shops found</div>}
    {shopsQuery.isLoading && <Loading />}
    {filteredShops?.length > 0 && (
      <ShopTable shops={filteredShops} />
    )
      }
   
  </div>;
}

export default Shops