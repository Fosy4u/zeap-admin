import { useState } from 'react';
import {
  Alert,
  Button,
  Dropdown,
  Label,
  Modal,
  Textarea,
} from 'flowbite-react';
import Loading from '../../../../lib/Loading';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';

import { BodyMeasurementGuideInterface } from '../../../../interface/interface';
import { HiPlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../../redux/services/global.slice';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-hidden ',
  },
};

const dropDownTheme = {
  content: 'py-1 focus:outline-none max-h-70 overflow-y-auto',
};

const AddBodyMeasurementGuideFieldModal = ({
  guide,
}: {
  guide: BodyMeasurementGuideInterface;
}) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const [field, setField] = useState<string>();
  const [description, setDescription] = useState<string>();
  const getBodyMeasurementGuideFieldsQuery =
    zeapApiSlice.useGetBodyMeasurementGuideFieldsQuery({}, { skip: !token });
  const bodyMeasurementGuideFields: { _id: string; field: string }[] =
    getBodyMeasurementGuideFieldsQuery?.data?.data
      ? [...getBodyMeasurementGuideFieldsQuery?.data?.data].sort(
          (a: { field: string }, b: { field: string }) =>
            a.field.localeCompare(b.field),
        )
      : [];
  const [addBodyMeasurementGuideField, addBodyMeasurementGuideFieldStatus] =
    zeapApiSlice.useAddBodyMeasurementGuideFieldMutation();
  const isLoading =
    addBodyMeasurementGuideFieldStatus.isLoading ||
    getBodyMeasurementGuideFieldsQuery.isLoading;

  const handleDelete = () => {
    if (!field) {
      setError('Field name is required');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
    if (!description) {
      setError('Description is required');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
    const payload = {
      bodyMeasurementGuide_id: guide._id,
      field,
      description,
    };
    addBodyMeasurementGuideField({ payload })
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
        className="bg-lightSuccess p-2 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <HiPlus className="text-success" />
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
              Add Body Measurement Guide Field
            </div>
          </Modal.Header>
          <Modal.Body>
            {isLoading && <Loading />}
            {error && <Alert color="failure">Error - {error}</Alert>}
            <div className="flex flex-col gap-4 p-4 w-full  text-gray-500 dark:text-gray-400">
              {bodyMeasurementGuideFields.length > 0 && (
                <Dropdown
                  theme={dropDownTheme}
                  color={field ? 'success' : 'primary'}
                  label={field || 'Select Field'}
                >
                  {bodyMeasurementGuideFields.map(
                    (field: { _id: string; field: string }) => (
                      <Dropdown.Item
                        key={field._id}
                        onClick={() => setField(field.field)}
                      >
                        {field.field}
                      </Dropdown.Item>
                    ),
                  )}
                </Dropdown>
              )}
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
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

export default AddBodyMeasurementGuideFieldModal;
