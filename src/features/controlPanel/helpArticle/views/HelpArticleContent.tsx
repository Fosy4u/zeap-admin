import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
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
import BreadCrumb from '../../../../lib/BreadCrumb';
import SearchHelpArticle from '../components/SearchHelpArticle';
import AddHelpArticleButton from '../components/AddHelpArticleButton';

const HelpArticleContent = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { articleId } = useParams<{
    articleId: string;
  }>();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const subCategory = searchParams.get('subcategory') || '';

  const getHelpArticleQuery = zeapApiSlice.useGetHelpArticleQuery(
    {
      articleId,
    },
    { skip: !token || !articleId },
  );
  const isLoading = getHelpArticleQuery.isLoading;
  const article: HelpArticleInterface | undefined =
    getHelpArticleQuery?.data?.data || undefined;
  const isFulfilled = getHelpArticleQuery.status === 'fulfilled';

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
    {
      label: capitalizeFirstLetter(
        getSubCategoryLabel(subCategory) || 'Help Articles',
      ),
      link: `/control-panel/help/article?category=${category}&subcategory=${subCategory}`,
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
          {isLoading ? (
            <div className="text-center py-8">
              <Loading />
            </div>
          ) : (
            <div className="space-y-4">
              {isFulfilled && article ? (
                <div className="p-4 bg-white dark:bg-boxdark rounded-lg shadow">
                  <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
                  <div className="text-gray-700 dark:text-gray-300">
                    <div
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>
                      Category: {getCategoryLabel(article.category) || 'N/A'}
                    </p>
                    <p>
                      Sub-category:{' '}
                      {getSubCategoryLabel(article.subCategory) || 'N/A'}
                    </p>
                    <p>
                      Tags:{' '}
                      {article.tags.length > 0
                        ? article.tags.join(', ')
                        : 'No tags available'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No article found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <AddHelpArticleButton />
    </>
  );
};

export default HelpArticleContent;
