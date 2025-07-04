import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { globalSelectors } from '../../../../redux/services/global.slice';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import Loading from '../../../../lib/Loading';
import { HelpArticleInterface } from '../../../../interface/interface';
import { capitalizeFirstLetter } from '../../../../utils/helpers';
import {
  helpCenterCategoryOptions,
  helpCenterSubCategoryOptions,
} from '../../../../utils/helpCenterStructure';
import HelpCenterNav from '../components/HelpCenterNav';
import Article from '../components/Article';
import BreadCrumb from '../../../../lib/BreadCrumb';
import SearchHelpArticle from '../components/SearchHelpArticle';
import AddHelpArticleButton from '../components/AddHelpArticleButton';
import HelpArticleActions from '../components/HelpArticleActions';

const ListOfHelpArticles = () => {
  const token = useSelector(globalSelectors.selectAuthToken);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const subCategory = searchParams.get('subcategory') || '';

  const getHelpArticlesQuery = zeapApiSlice.useGetHelpArticlesQuery(
    {
      category,
      subCategory,
    },
    { skip: !token || !category || !subCategory },
  );
  const isLoading = getHelpArticlesQuery.isLoading;
  const isFulfilled = getHelpArticlesQuery.status === 'fulfilled';
  const helpArticles = getHelpArticlesQuery?.data?.data || [];
  const totalCount = helpArticles?.length || 0;

  const getCategoryLabel = (value: string) => {
    const categoryOption = helpCenterCategoryOptions.find(
      (option) => option.value === value,
    );
    return categoryOption ? categoryOption.label : '';
  };
  const getSubCategoryLabel = (value: string) => {
    const subCategoryOption = helpCenterSubCategoryOptions.find(
      (option) => option.value === value,
    );
    return subCategoryOption ? subCategoryOption.label : '';
  };
  const getSubCategoryIcon = (value: string) => {
    if (!value) return null;
    const subCategoryOption = helpCenterSubCategoryOptions.find(
      (option) => option.value === value,
    );
    return subCategoryOption ? subCategoryOption.icon : null;
  };

  const breadCrumbs = [
    {
      label: 'Help Center',
      link: '/control-panel/help/articles',
    },
    {
      label: capitalizeFirstLetter(
        getCategoryLabel(category) || 'Help Articles',
      ),
      link: `/control-panel/help/articles?category=${category}`,
    },
  ];
  return (
    <>
      <SearchHelpArticle />
      <BreadCrumb breadCrumbs={breadCrumbs} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {/* There will be sideNav with sub category navigation but only for large screens */}
        {/* Then a list of fetched articles by the side */}
        <div className="hidden lg:block">
          <HelpCenterNav category={category} subCategory={subCategory} />
        </div>
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-info">
              {getSubCategoryIcon(subCategory) && (
                <span className="inline-block mr-2">
                  {getSubCategoryIcon(subCategory)}
                </span>
              )}
              <span className="text-xl font-semibold">
                {capitalizeFirstLetter(getSubCategoryLabel(subCategory)) ||
                  'Help Articles'}
              </span>
            </div>
            {totalCount > 0 && (
              <span className="text-sm text-gray-500">
                {totalCount} articles found
              </span>
            )}
          </div>
          {isLoading ? (
            <div className="text-center py-8">
              <Loading />
            </div>
          ) : (
            <div className="space-y-4">
              {helpArticles.length > 0 &&
                helpArticles.map((article: HelpArticleInterface) => (
                  <div
                    key={article._id}
                    className="flex flex-col md:flex-row  w-full my-4  md:justify-between items-start bg-white dark:bg-boxdark gap-4"
                  >
                    <Article article={article} />
                    <HelpArticleActions article={article} />
                  </div>
                ))}{' '}
              {isFulfilled && helpArticles.length === 0 && (
                <p className="text-center text-gray-500 text-sm">
                  No articles found for{' '}
                  <span className="font-semibold">
                    {capitalizeFirstLetter(getSubCategoryLabel(subCategory))}
                  </span>{' '}
                  under{' '}
                  <span className="font-semibold">
                    {capitalizeFirstLetter(getCategoryLabel(category))}
                  </span>{' '}
                  category.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <AddHelpArticleButton />
    </>
  );
};

export default ListOfHelpArticles;
