import { HelpArticleInterface } from '../../../../interface/interface';
import AddRemovePopularHelpArticle from './AddRemovePopularHelpArticle';
import DeleteHelpArticle from './DeleteHelpArticle';
import EditHelpArticle from './EditHelpArticle';

const HelpArticleActions = ({ article }: { article: HelpArticleInterface }) => {
  return (
    <div className="flex items-center gap-2">
      <EditHelpArticle article={article} />
      <DeleteHelpArticle article={article} />
      <AddRemovePopularHelpArticle article={article} />
    </div>
  );
};

export default HelpArticleActions;
