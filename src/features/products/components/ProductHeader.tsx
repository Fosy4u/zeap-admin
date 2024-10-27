


import SearchBar from "../../../lib/SearchBar"




const ProductHeader = ({setInput, title, showSearchBar = true}: 
    {setInput?: (input: string) => void, title:string, showSearchBar?: boolean}
    
) => {
  
  return (
    <div className="flex justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
       <div> <h1 className="text-xl md:text-2xltext-dark">{title}
       </h1></div>

        <div className="flex items-center gap-2">
          {showSearchBar && setInput && <SearchBar setInput={setInput}  placeHolder="Search Product"/>}
         
           
            </div>
         

               
            
        </div>
  )
}

export default ProductHeader