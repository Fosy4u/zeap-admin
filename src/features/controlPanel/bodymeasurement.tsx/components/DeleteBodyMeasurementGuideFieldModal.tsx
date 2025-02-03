import { useState } from 'react';
import { Alert, Badge, Button, Modal } from 'flowbite-react';
import Loading from '../../../../lib/Loading';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import { capitalizeFirstLetter } from '../../../../utils/helpers';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-hidden ',
  },
};

const DeleteBodyMeasurementGuideFieldModal = ({
  field,
}: {
  field: {
    _id: string;
    field: string;
    imageUrl: {
      name: string;
      link: string;
    };
    description: string;
  };
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');

  const [
    deleteBodyMeasurementGuideField,
    deleteBodyMeasurementGuideFieldStatus,
  ] = zeapApiSlice.useDeleteBodyMeasurementGuideFieldMutation();
  const isLoading = deleteBodyMeasurementGuideFieldStatus.isLoading;

  const handleDelete = () => {
    const payload = { fieldId: field._id };
    deleteBodyMeasurementGuideField({ payload })
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
      <Badge
        size="xs"
        color="failure"
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        Delete
      </Badge>
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
              Delete Body Measurement Guide
            </div>
          </Modal.Header>
          <Modal.Body>
            {isLoading && <Loading />}
            {error && <Alert color="failure">Error - {error}</Alert>}
            <div className="flex flex-col gap-4 p-4  text-danger">
              <p>
                Are you sure you want delete this field -{' '}
                {capitalizeFirstLetter(field.field)}
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

export default DeleteBodyMeasurementGuideFieldModal;
