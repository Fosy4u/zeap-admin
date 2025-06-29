import { useState } from 'react';
import { HelpArticleInterface } from '../../../../interface/interface';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import { Alert, Button, Modal } from 'flowbite-react';
import Loading from '../../../../lib/Loading';

import { VscDebugStepInto } from 'react-icons/vsc';
import { HiChartBarSquare } from 'react-icons/hi2';

const AddRemovePopularHelpArticle = ({
  article,
}: {
  article: HelpArticleInterface;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [addToPopularTopics, addToPopularTopicsStatus] =
    zeapApiSlice.useAddToPopularTopicsMutation();
  const [removeFromPopularTopics, removeFromPopularTopicsStatus] =
    zeapApiSlice.useRemoveFromPopularTopicsMutation();
  const isLoading =
    addToPopularTopicsStatus.isLoading ||
    removeFromPopularTopicsStatus.isLoading;
  const handleAddToPopularTopics = () => {
    const payload = {
      articleId: article.articleId,
    };
    addToPopularTopics({ payload })
      .unwrap()
      .then(() => {
        setOpenModal(false);
      })
      .catch((error) => {
        setServerError(error.data.error || 'An error occurred');
      });
  };
  const handleRemoveFromPopularTopics = () => {
    const payload = {
      articleId: article.articleId,
    };
    removeFromPopularTopics({ payload })
      .unwrap()
      .then(() => {
        setOpenModal(false);
      })
      .catch((error) => {
        setServerError(error.data?.error || 'An error occurred');
      });
  };
  return (
    <>
      <div className="flex items-center gap-2">
        {article.isPopular ? (
          <VscDebugStepInto
            className="inline-block mr-1 text-warning cursor-pointer hover:scale-110 transition-transform"
            size={20}
            title="Remove from Popular Topics"
            onClick={() => setOpenModal(true)}
          />
        ) : (
          <HiChartBarSquare
            className="inline-block mr-1 text-success cursor-pointer hover:scale-110 transition-transform"
            size={20}
            title="Add to Popular Topics"
            onClick={() => setOpenModal(true)}
          />
        )}
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {article.isPopular
            ? 'Remove from Popular Topics'
            : 'Add to Popular Topics'}
        </Modal.Header>
        <Modal.Body>
          {isLoading && <Loading />}
          {serverError && (
            <Alert color="failure" onDismiss={() => setServerError(null)}>
              {serverError}
            </Alert>
          )}
          <p>
            Are you sure you want to{' '}
            {article.isPopular
              ? 'remove this article from'
              : 'add this article to'}{' '}
            popular topics?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            onClick={() => setOpenModal(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color={article.isPopular ? 'error' : 'success'}
            onClick={
              article.isPopular
                ? handleRemoveFromPopularTopics
                : handleAddToPopularTopics
            }
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : article.isPopular ? 'Remove' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRemovePopularHelpArticle;
