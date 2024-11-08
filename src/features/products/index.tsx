import { useSelector } from "react-redux";
import zeapApiSlice from "../../redux/services/zeapApi.slice";
import { globalSelectors } from "../../redux/services/global.slice";

import Loading from "../../lib/Loading";
import { useEffect, useState } from "react";
import ProductHeader from "./components/ProductHeader";

import { ProductInterface } from "../../interface/interface";
import ProductTable from "./components/ProductTable";
import { useLocation } from "react-router-dom";
import ProductTileList from "./components/ProductTileList";



const tileLink ="/table"

const Products = () => {

const location = useLocation().pathname
  const view = location.includes(tileLink)? "table":"tile"
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log("filterPro",filteredProducts)
  const [input, setInput] = useState("");
  const productsQuery = zeapApiSlice.useGetProductsQuery({
   
  },  { skip: !token });
  const products = productsQuery?.data?.data;
  console.log("products", products)
  const isLoading = productsQuery.isLoading;

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
    if (products?.length > 0) {
      const result = products?.filter((row:ProductInterface) => {
        const keys =  Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof ProductInterface]);
        });
      });

      setFilteredProducts(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, products]);

 
  return <div>
    
  
    <ProductHeader setInput={setInput} title={"Products"}  />

    {products?.length === 0 && !productsQuery.isLoading && <div>No products found</div>}
    {isLoading && <Loading />}
   
       {products?.length > 0 && <>{
         view === "table"? <ProductTable /> :
         <ProductTileList />
       }
       
       </>
       }
    
      
   
  </div>;
}

export default Products