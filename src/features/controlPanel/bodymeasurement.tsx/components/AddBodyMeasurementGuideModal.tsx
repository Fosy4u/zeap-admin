import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
} from 'flowbite-react';
import Loading from '../../../../lib/Loading';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
// import { smallScreen } from '../../../../utils/screenSizes';
import { useParams } from 'react-router-dom';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-hidden ',
  },
};

const checkBoxTheme = {
  root: {
    base: 'h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700',
    color: {
      primary:
        'text-darkGold focus:ring-darkGold dark:ring-offset-darkGold dark:focus:ring-darkGold border-darkGold',
    },
  },
};

const AddBodyMeasurementGuideModal = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>();
  const [gender, setGender] = useState<string>(params?.gender || '');

  const [addBodyMeasurementGuide, addBodyMeasurementGuideStatus] =
    zeapApiSlice.useAddBodyMeasurementGuideMutation();
  const isLoading = addBodyMeasurementGuideStatus.isLoading;

  const handleDelete = () => {
    if (!name) {
      setError('Name name is required');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
    if (!gender) {
      setError('Gender is required');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
    const payload = {
      name,
      gender,
    };
    addBodyMeasurementGuide({ payload })
      .unwrap()
      .then(() => {
        setName('');
        setGender(params?.gender || '');
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
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="flex w-fit items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-darkGold rounded-md hover:bg-opacity-90"
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
        Add Category
      </button>

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
              Add Body Measurement Guide Category
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
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="description">Gender</Label>
              <div className="mb-2 flex items-center gap-2">
                <Checkbox
                  theme={checkBoxTheme}
                  color={gender === 'male' ? 'success' : 'primary'}
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                />
                <Label value="Male" />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <Checkbox
                  theme={checkBoxTheme}
                  color={gender === 'female' ? 'success' : 'primary'}
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                />
                <Label value="Female" />
              </div>
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

export default AddBodyMeasurementGuideModal;
