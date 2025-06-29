import { useState } from 'react';
import { HelpArticleInterface } from '../../../../interface/interface';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import { MdDelete } from 'react-icons/md';
import { Alert, Button, Modal } from 'flowbite-react';
import Loading from '../../../../lib/Loading';

const DeleteHelpArticle = ({ article }: { article: HelpArticleInterface }) => {
  const [openModal, setOpenModal] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [deleteHelpArticle, deleteHelpArticleStatus] =
    zeapApiSlice.useDeleteHelpArticleMutation();
  const isLoading = deleteHelpArticleStatus.isLoading;
  const handleDeleteHelpArticle = () => {
    const payload = {
      articleId: article.articleId,
    };
    deleteHelpArticle({ payload })
      .unwrap()
      .then(() => {
        setOpenModal(false);
      })
      .catch((err) => {
        setServerError(err.data.error || 'An error occurred');
      });
  };
  return (
    <>
      <MdDelete
        className="inline-block mr-1 text-danger cursor-pointer hover:scale-110 transition-transform"
        size={20}
        title="Delete Help Article"
        onClick={() => setOpenModal(true)}
      />

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Delete Help Article</Modal.Header>
        <Modal.Body>
          {serverError && (
            <Alert color="failure" className="mb-4">
              {serverError}
            </Alert>
          )}
          {isLoading && <Loading />}
          <p>
            Are you sure you want to delete the article titled{' '}
            <strong>{article.title}</strong>?
          </p>
          <p className="text-danger">This action cannot be undone.</p>
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
            color="failure"
            onClick={handleDeleteHelpArticle}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteHelpArticle;
