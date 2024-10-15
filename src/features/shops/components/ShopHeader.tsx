import { useState } from "react"
import { smallScreen } from "../../../utils/screenSizes"

import SimpleModal from "../../../lib/SimpleModal"
import SignUp from "../../Authentication/SignUp"
import SearchBar from "../../../lib/SearchBar"


const ShopHeader = ({setInput, title, showSearchBar = true}: 
    {setInput: (input: string) => void, title:string, showSearchBar?: boolean}
    
) => {
    const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="flex justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
       <div> <h1 className="text-2xl text-dark">{title}
       </h1></div>

        <div className="flex items-center gap-2">
          {showSearchBar && <SearchBar setInput={setInput}  placeHolder="Search Shop"/>}
         
            <button 
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-darkGold rounded-md hover:bg-opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                {smallScreen ? "Add" : "Add Shop"}
            </button>
            </div>
            {open && (<SimpleModal 
            isLoading={false}
            closeOnOutsideClick={false}
            open
            showActionButtons={false}
            headerText="Add Shop" close={() => setOpen(false)}   onclick={() => {}}>

                <SignUp 
                close={() => setOpen(false)}
              
                />
            </SimpleModal>)}
        </div>
  )
}

export default ShopHeader