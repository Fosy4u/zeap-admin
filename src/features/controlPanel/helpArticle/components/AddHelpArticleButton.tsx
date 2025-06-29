import { Link } from 'react-router-dom';

const AddHelpArticleButton = () => {
  return (
    <Link
      to="/control-panel/help/article/add"
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-12 h-12 bg-success text-white rounded-full shadow-lg hover:bg-success/90 transition-colors"
      title="Add Help Article"
      aria-label="Add Help Article"
      data-testid="add-help-article-button"
      role="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </Link>
  );
};

export default AddHelpArticleButton;
