
"use client";

import {  Drawer } from "flowbite-react";
import { useState } from "react";
import { HiAdjustments, HiMinus, HiPlus } from "react-icons/hi";
import { HiBars2 } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

export function MobileProductFilters({dynamicFilters, totalCount}:{dynamicFilters:any[];
    totalCount:number;}) {
       
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showOptionsList, setShowOptionsList] = useState<string[]>([]);
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
  const handleClose = () => setIsOpen(false);
  const getSearchParamsNumber = () => {
    let count = 0;
    searchParams.forEach((value) => {
       
        if(value){
        count += value.split(",").length
        }
    })
    return count;
}
const checkIsAdded = (name:string, value:string) => {
return searchParams.get(lowerFirstChar (name?.replace(/ /g, "")))?.split(",").includes(value)
}
  return (
    <>
      
      <Drawer edge open={isOpen} onClose={handleClose} position="bottom" className="p-0">
      <Drawer.Header
          
          title={!isOpen?`Filters (${getSearchParamsNumber()})`:`See ${getSearchParamsNumber()} items`}
          titleIcon={HiAdjustments}
          closeIcon={ HiBars2}

          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-darkGold px-4 pt-4 hover:bg-gray-50 dark:hover:bg-gray-700"
        />

        <Drawer.Items>
        <div className="flex flex-col h-[78vh] overflow-scroll p-2">
        
       
        
        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex justify-between items-center">
            <span className="text-xs border border-darkGold rounded-full cursor-pointer p-1 mt-6 mb-2 " onClick={() => {
            setSearchParams({})
        }}>
           
            Clear all ({getSearchParamsNumber()})
        
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
                        <div className="flex flex-wrap max-h-60 overflow-y-scroll">
                            {filter?.type === "checkbox" &&<>
                            {Object.keys(filter?.options).map(key => filter?.options[key]).map((obj:any) => (
                                
                                <div key={obj?.value} className={`flex items-center cursor-pointer border ${!checkIsAdded(filter?.name, obj?.value)?"border-grey7":"border-success"} m-2 w-fit p-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-xs`}
                                onClick={() => handleFilterChange(lowerFirstChar( filter?.name?.replace(/ /g, "")),  obj?.value)}

                                >
                                    {/* <Checkbox id={obj?.value} name={obj?.value} color="success" 
                                    checked = {searchParams.get(lowerFirstChar (filter?.name?.replace(/ /g, "")))?.split(",").includes(obj?.value)}
                                    onChange={() => handleFilterChange(lowerFirstChar( filter?.name?.replace(/ /g, "")),  obj?.value)}
                                     /> */}
                                    {obj?.value}
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
        </Drawer.Items>
      </Drawer>
    </>
  );
}
