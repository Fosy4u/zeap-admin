import { Alert, Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import Loading from '../../../../lib/Loading';
import { useParams } from 'react-router-dom';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-hidden ',
  },
};

const BodyMeasurementGuideImageDeleteButton = ({
  fieldId,
  setOpenModal,
}: {
  fieldId: string;
  setOpenModal: (open: boolean) => void;
}) => {
  const { gender } = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const [
    deleteBodyMeasurementGuideImage,
    deleteBodyMeasurementGuideImageStatus,
  ] = zeapApiSlice.useDeleteBodyMeasurementGuideFieldImageMutation();
  const isLoading = deleteBodyMeasurementGuideImageStatus.isLoading;

  const handleDeleteImage = () => {
    const payload = { fieldId, gender };
    deleteBodyMeasurementGuideImage({ payload })
      .unwrap()
      .then(() => {
        setOpenModal(false);
        setOpen(false);
      })
      .catch((err) => {
        setError(err.data.error);
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };
  return (
    <div>
      {' '}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-solid border-red-700 bg-red-50 p-1 font-semibold text-red-800 shadow transition-colors hover:bg-danger hover:text-indigo-50 focus:bg-indigo-900 focus:text-indigo-50"
      >
        Delete Image
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      {open && (
        <Modal
          className="bg-black bg-opacity-50"
          theme={modalTheme}
          title="Delete Image"
          onClose={() => setOpen(false)}
          show={open}
        >
          <Modal.Header>
            <div className="text-lg font-bold">Delete Image</div>
          </Modal.Header>
          <Modal.Body>
            {isLoading && <Loading />}
            {error && <Alert color="failure">Error - {error}</Alert>}
            <div className="flex flex-col gap-4 p-4  text-gray-500 dark:text-gray-400">
              <p>Are you sure you want to delete this image?</p>
              <Alert color="warning" className="text-sm">
                This will equally delete the image from the gallery if no other
                field is using it.
              </Alert>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex gap-4">
            <Button
              color="failure"
              onClick={() => {
                handleDeleteImage();
              }}
            >
              Yes, Delete
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setOpen(false);
              }}
            >
              No, Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BodyMeasurementGuideImageDeleteButton;
