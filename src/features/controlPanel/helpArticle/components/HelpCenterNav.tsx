import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../../utils/helpers';
import {
  helpCenterCategoryOptions,
  helpCenterSubCategoryOptions,
} from '../../../../utils/helpCenterStructure';

const HelpCenterNav = ({
  category,
  subCategory,
}: {
  category: string;
  subCategory: string;
}) => {
  const getCategoryLabel = (value: string) => {
    const categoryOption = helpCenterCategoryOptions.find(
      (option) => option.value === value,
    );
    return categoryOption ? categoryOption.label : '';
  };
  return (
    <>
      {' '}
      <h2 className="text-lg font-semibold mb-4">
        {capitalizeFirstLetter(getCategoryLabel(category))}
      </h2>
      <div className="flex flex-col space-y-4">
        {helpCenterSubCategoryOptions
          .filter((sub) => sub.categories.includes(category))
          .map((sub) => (
            <Link
              to={`/control-panel/help/article?category=${category}&subcategory=${sub.value}`}
              key={sub.value}
              className={`px-4 py-2 rounded-md cursor-pointer  transition-colors ${
                sub.value === subCategory
                  ? 'bg-darkGold text-white '
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {sub.label}
            </Link>
          ))}
      </div>
    </>
  );
};

export default HelpCenterNav;
