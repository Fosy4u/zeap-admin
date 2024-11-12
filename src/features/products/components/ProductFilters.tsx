import { Checkbox } from "flowbite-react";

import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";


interface ProductFiltersProps {
    dynamicFilters:any[];
    totalCount:number;
}

const ProductFilters = ({dynamicFilters,totalCount}:ProductFiltersProps) => {
   
    
   
    const [showOptionsList, setShowOptionsList] = useState<string[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
  
    const lowerFirstChar = (str:string) => {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

const handleFilterChange = (key:string, value:string) => {
    const exist = searchParams.get(key);
    // join the values with comma if exist
    if(exist) {
        
        const values = exist.split(",")
        
        if(values.includes(value)) {
            values.splice(values.indexOf(value), 1)
            searchParams.set(key, values.join(","))
        } else {
            searchParams.set(key, `${exist},${value}`)
        }
    } else {
        searchParams.set(key, value)
    }
    setSearchParams(searchParams)
}
const getSearchParamsNumber = () => {
    let count = 0;
    searchParams.forEach((value) => {
        if(value){
            count += value.split(",").length
            }
    })
    return count;
}

  return (
    <div className="flex flex-col">
        {getSearchParamsNumber() > 0 && 
        <div 
        onClick={() => {
            setSearchParams({})
        }}
        className="flex items-center mt-6 mb-2 border rounded-full justify-center w-40 text-md cursor-pointer hover:border-darkGold">
            Clear all ({getSearchParamsNumber()})
        </div>
        }
        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex justify-between items-center">
            <span className="text-lg text-darkGold mt-6 mb-2 ">
                Refine by
            </span>
            <span className="text-sm text-success mt-6 mb-2 ">
            {totalCount} {totalCount > 1 ? "Products" : "Product"}
            </span>
            </div>
            <div className="flex flex-col">
            {dynamicFilters.map((filter) => (
                    <div key={filter?.name} className="flex flex-col p-2">
                        <div className="flex w-full h-12 items-center rounded-md justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2"
                        onClick={() => {
                            if(showOptionsList.includes(filter?.name)) {
                                setShowOptionsList(showOptionsList.filter((item) => item !== filter?.name))
                            } else {
                                setShowOptionsList([...showOptionsList, filter?.name])
                            }
                        }}
                        >
                        <span className="text-sm text-darkGold mt-6 mb-2 ">
                            {filter?.name}
                        </span>
                        <div className="text-lg text-darkGold mt-6 mb-2 cursor-pointer hover:text-darkGold"
                        
                        >
                           {showOptionsList.includes(filter?.name) ? <HiMinus /> : <HiPlus />}
                            </div>

                        </div>
                        {showOptionsList.includes(filter?.name) &&
                        <div className="flex flex-col max-h-60 overflow-y-scroll">
                            {filter?.type === "checkbox" &&<>
                            {Object.keys(filter?.options).map(key => filter?.options[key]).map((obj:any) => (
                                
                                <div key={obj?.value} className="flex items-center cursor-pointer mt-2">
                                    <Checkbox id={obj?.value} name={obj?.value} color="success" 
                                    checked = {searchParams.get(lowerFirstChar (filter?.name?.replace(/ /g, "")))?.split(",").includes(obj?.value)}
                                    onChange={() => handleFilterChange(lowerFirstChar( filter?.name?.replace(/ /g, "")),  obj?.value)}
                                     />
                                    <label htmlFor={obj?.value} className="ml-2 text-sm text-gray-900 dark:text-white">{obj?.value}</label>
                                </div>
                            ))}
                            </>}
                            {filter?.type === "range" &&
                            <div className="relative mb-6">
                                <input type="range" min={filter?.options?.min} max={filter?.options?.max} value="10000" className="w-full h-2 bg-slate-500 rounded-lg  accent-success cursor-pointer dark:bg-gray-700" />
                                <div className="flex justify-between text-sm text-gray-900 dark:text-white">
                                    <span>{filter?.options?.min}</span>
                                    <span>{filter?.options?.max}</span>
                                   
                                </div>
                            
                            </div>}

                        </div>
}
                    </div>
                ))}
                </div>
        </div>
        
    </div>
  )
}

export default ProductFilters