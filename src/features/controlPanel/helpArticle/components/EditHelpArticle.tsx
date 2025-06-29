import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { HelpArticleInterface } from '../../../../interface/interface';

const EditHelpArticle = ({ article }: { article: HelpArticleInterface }) => {
  const navigate = useNavigate();
  return (
    <>
      <FaEdit
        className="text-info hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer hover:scale-110 transition-transform"
        size={20}
        onClick={() =>
          navigate(
            `/control-panel/help/article/edit?articleId=${article.articleId}&mode=edit`,
          )
        }
      />
    </>
  );
};

export default EditHelpArticle;
