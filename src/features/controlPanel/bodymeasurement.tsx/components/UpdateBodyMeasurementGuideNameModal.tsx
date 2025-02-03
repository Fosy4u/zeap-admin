import { useState } from 'react';
import { Alert, Button, Label, Modal, TextInput } from 'flowbite-react';
import Loading from '../../../../lib/Loading';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import { HiPencil } from 'react-icons/hi';
import { BodyMeasurementGuideInterface } from '../../../../interface/interface';
import { capitalizeFirstLetter } from '../../../../utils/helpers';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-hidden ',
  },
};

const UpdateBodyMeasurementGuideNameModal = ({
  guide,
}: {
  guide: BodyMeasurementGuideInterface;
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>(capitalizeFirstLetter(guide.name));

  const [updateBodyMeasurementGuideName, updateBodyMeasurementGuideNameStatus] =
    zeapApiSlice.useUpdateBodyMeasurementGuideNameMutation();
  const isLoading = updateBodyMeasurementGuideNameStatus.isLoading;

  const handleDelete = () => {
    const payload = {
      bodyMeasurementGuide_id: guide._id,
      name: name.toLocaleLowerCase(),
    };
    updateBodyMeasurementGuideName({ payload })
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
        className="bg-lightWarning p-2 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <HiPencil className="text-warning" />
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
              Update Body Measurement Guide Name
            </div>
          </Modal.Header>
          <Modal.Body>
            {isLoading && <Loading />}
            {error && <Alert color="failure">Error - {error}</Alert>}
            <div className="flex flex-col gap-4 p-4 w-full  text-gray-500 dark:text-gray-400">
              <Label htmlFor="fieldTitle">Name</Label>
              <TextInput
                id="fieldTitle"
                name="fieldTitle"
                value={name}
                onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="flex gap-4">
            <Button
              color="success"
              onClick={() => {
                handleDelete();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UpdateBodyMeasurementGuideNameModal;
