import AddHelpArticleButton from './components/AddHelpArticleButton';
import HelpArticleHeader from './components/HelpArticleHeader';
import HelpCenter from './components/HelpCenter';
import SearchHelpArticle from './components/SearchHelpArticle';

const HelpArtices = () => {
  return (
    <>
      {' '}
      <HelpArticleHeader />
      <div className="flex flex-col gap-4 mt-8">
        <SearchHelpArticle />
        <HelpCenter />
      </div>
      <AddHelpArticleButton />
    </>
  );
};

export default HelpArtices;
