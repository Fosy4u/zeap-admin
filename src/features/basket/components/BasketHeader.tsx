

import SearchBar from '../../../lib/SearchBar';

const BasketHeader = ({
  setInput,
  title,
  showSearchBar = true,
}: {
  setInput?: (input: string) => void;
  title: string;
  showSearchBar?: boolean;
}) => {

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div>
        {' '}
        <h1 className="text-xl md:text-2xltext-dark">{title}</h1>
      </div>

      <div className="flex justify-between items-center gap-2">
        {showSearchBar && setInput && (
          <SearchBar setInput={setInput} placeHolder="Search Basket" />
        )}

       
      </div>

    
    </div>
  );
};

export default BasketHeader;
