import {
  Alert,
  Button,
  Label,
  Modal,
  Textarea,
  TextInput,
} from 'flowbite-react';
import { useState } from 'react';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import Loading from '../../../../lib/Loading';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-99999 w-screen h-screen overflow-y-auto overflow-x-hidden ',
    show: {
      on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden',
    },
    sizes: {
      custom: 'w-screen h-screen md:max-w-xl md:h-full',
    },
  },
  content: {
    base: 'relative h-full w-full  md:h-auto ',
    inner:
      'relative flex w-screen h-screen md:max-h-[90dvh] md:w-full md:h-full flex-col rounded-lg bg-white shadow dark:bg-gray-700 ',
  },
};

const BodyMeasurementEditModal = ({
  setOpenEditModal,
  openEditModal,
  modalTitle,
  field,
}: {
  setOpenEditModal: (value: boolean) => void;
  openEditModal: boolean;
  modalTitle: string;
  field: {
    field: string;
    description: string;
    imageUrl: {
      name: string;
      link: string;
    };
    _id: string;
    gender: string[];
  };
}) => {
  const [error, setError] = useState<string>('');
  const [fieldTitle, setFieldTitle] = useState<string>(field.field);
  const [description, setDescription] = useState<string>(field.description);

  const [
    updateBodyMeasurementGuideField,
    updateBodyMeasurementGuideFieldStatus,
  ] = zeapApiSlice.useUpdateBodyMeasurementGuideFieldMutation();
  const isLoading = updateBodyMeasurementGuideFieldStatus.isLoading;

  const handleUpdateField = () => {
    if (!fieldTitle) {
      setError('Field is required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    if (!description) {
      setError('Description is required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    const payload = {
      field: fieldTitle,
      description,
      fieldId: field._id,
    };
    updateBodyMeasurementGuideField({ payload })
      .unwrap()
      .then(() => {
        setOpenEditModal(false);
      })
      .catch((err) => {
        setError(err.data.error);
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };
  return (
    <Modal
      size="custom"
      theme={modalTheme}
      show={openEditModal}
      onClose={() => setOpenEditModal(false)}
      position="bottom-center"
      className="bg-black"
    >
      <Modal.Header>Edit {modalTitle}</Modal.Header>
      <Modal.Body>
        {isLoading && <Loading />}
        <div className="flex flex-col gap-2 items-center h-full justify-center">
          {error && <Alert color="failure">Error - {error}</Alert>}

          <div className="flex flex-col gap-4 p-4 w-full  text-gray-500 dark:text-gray-400">
            <Label htmlFor="fieldTitle">Field</Label>
            <TextInput
              id="fieldTitle"
              name="fieldTitle"
              value={fieldTitle}
              disabled
              onChange={(e) => setFieldTitle(e.target.value)}
            />
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="flex justify-between items-center">
        <Button
          color="success"
          onClick={() => {
            handleUpdateField();
          }}
        >
          Save
        </Button>
        <Button
          color="failure"
          onClick={() => {
            setOpenEditModal(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BodyMeasurementEditModal;
