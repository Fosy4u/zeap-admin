import { HiTrash } from 'react-icons/hi';
import { BodyMeasurementGuideInterface } from '../../../../interface/interface';
import { useState } from 'react';
import { Alert, Button, Modal } from 'flowbite-react';
import Loading from '../../../../lib/Loading';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import { capitalizeFirstLetter } from '../../../../utils/helpers';
import { useParams } from 'react-router-dom';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-hidden ',
  },
};

const DeleteBodyMeasurementGuideModal = ({
  guide,
}: {
  guide: BodyMeasurementGuideInterface;
}) => {
  const { gender } = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');

  const [deleteBodyMeasurementGuide, deleteBodyMeasurementGuideStatus] =
    zeapApiSlice.useDeleteBodyMeasurementGuideMutation();
  const isLoading = deleteBodyMeasurementGuideStatus.isLoading;

  const handleDelete = () => {
    const payload = { bodyMeasurementGuide_id: guide._id, gender };
    deleteBodyMeasurementGuide({ payload })
      .unwrap()
      .then(() => {
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
    <>
      <div
        className="bg-lightDanger p-2 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <HiTrash className="text-danger" />
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
            <div className="text-sm md:text-lg font-bold">
              Delete {capitalizeFirstLetter(guide.name)}
            </div>
          </Modal.Header>
          <Modal.Body>
            {isLoading && <Loading />}
            {error && <Alert color="failure">Error - {error}</Alert>}
            <div className="flex flex-col gap-4 p-4  text-danger">
              <p>
                Are you sure you want delete this Body Measurement Guide -{' '}
                {capitalizeFirstLetter(guide.name)} under{' '}
                {capitalizeFirstLetter(guide.gender)} category?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex gap-4">
            <Button
              color="failure"
              onClick={() => {
                handleDelete();
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
    </>
  );
};

export default DeleteBodyMeasurementGuideModal;
