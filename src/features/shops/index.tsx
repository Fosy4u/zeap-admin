import { useSelector } from "react-redux";
import zeapApiSlice from "../../redux/services/zeapApi.slice";
import { globalSelectors } from "../../redux/services/global.slice";

import Loading from "../../lib/Loading";
import { useEffect, useState } from "react";
import ShopHeader from "./components/ShopHeader";
import ShopTable from "./components/ShopTable";
import { ShopInterface } from "../../interface/interface";





const Shops = () => {


  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredShops, setFilteredShops] = useState([]);
  const [input, setInput] = useState("");
  const shopsQuery = zeapApiSlice.useGetShopsQuery({},  { skip: !token });
  const shops = shopsQuery?.data?.data;

  const escapeRegExp = (value:string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const searchRegex = new RegExp(escapeRegExp(input), "i");
  // recursive search function
  const search = (item:any) => {
    let found = false;

    if (typeof item === "string") {
      if (searchRegex.test(item?.toString())) {
        found = true;
        return found;
      }
    }

    if (typeof item === "object" && item !== null) {
      Object.keys(item).forEach((key) => {
        const value = item[key];
        const match = search(value);
        if (match) {
          found = true;
          return found;
        }
      });
    }
    return found;
  };

  useEffect(() => {
    if (shops?.length > 0) {
      const result = shops?.filter((row:ShopInterface) => {
        const keys =  Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof ShopInterface]);
        });
      });

      setFilteredShops(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, shops]);

 
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