import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { Alert, Modal } from 'flowbite-react';
import NoPic from '../../../../images/icon/noPhoto.png';
import { globalSelectors } from '../../../../redux/services/global.slice';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import Loading from '../../../../lib/Loading';
import BodyMeasurementGuide from './BodyMeasurementGuide';
import { BodyMeasurementGuideInterface } from '../../../../interface/interface';
import BodyMeasurementGuideImageButton from './BodyMeasurementGuideImageButton';
import BodyMeasurementGuideImageDeleteButton from './BodyMeasurementGuideImageDeleteButton';
import BodyMeasurementEditModal from './BodyMeasurementEditModal';
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../../utils/helpers';
import AddBodyMeasurementGuideModal from './AddBodyMeasurementGuideModal';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-99999 w-screen h-screen overflow-y-auto overflow-x-hidden',
    show: {
      on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden',
    },
    sizes: {
      custom: 'w-screen h-screen md:max-w-xl md:h-full',
    },
  },
  content: {
    base: 'relative h-full w-full  md:h-auto',
    inner:
      'relative flex w-screen h-screen md:max-h-[90dvh] md:w-full md:h-full flex-col rounded-lg bg-white shadow dark:bg-gray-700',
  },
};

const BodyMeasurementGuideLayout = () => {
  // const { setDimBackground } = useContext(ThemeContext);
  const { gender } = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [field, setField] = useState<{
    field: string;
    description: string;
    imageUrl: {
      name: string;
      link: string;
    };
    _id: string;
  }>({
    field: '',
    description: '',
    imageUrl: {
      name: '',
      link: '',
    },
    _id: '',
  });

  const token = useSelector(globalSelectors.selectAuthToken);
  const getBodyMeasurementGuideQuery =
    zeapApiSlice.useGetBodyMeasurementGuideQuery(
      {
        gender,
      },
      { skip: !token || !gender },
    );
  const [uploadImageMutation, uploadImageMutationStatus] =
    zeapApiSlice.useUploadBodyMeasurementGuideImageMutation();

  const isLoading =
    getBodyMeasurementGuideQuery.isLoading ||
    uploadImageMutationStatus.isLoading;
  const bodyMeasurementGuide = getBodyMeasurementGuideQuery.data?.data
    ? [...getBodyMeasurementGuideQuery.data?.data].sort((a, b) =>
        a.name.localeCompare(b.name),
      )
    : [];

  // useEffect(
  //   () => {
  //     setDimBackground(openModal);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [openModal],
  // );

  useEffect(() => {
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile.name);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const handleImageUpload = () => {
    if (!selectedFile || !field._id) {
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('fieldId', field._id);
    const payload = formData;
    uploadImageMutation({ payload })
      .unwrap()
      .then(() => {
        setSelectedFile(undefined);
        setPreview('');
        setOpenModal(false);
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
      {isLoading && <Loading />}
      <div className="flex flex-col md:flex-row justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          {' '}
          <h1 className="text-md md:text-2xltext-dark">
            Body Measurement Guide - {capitalizeFirstLetter(gender || '')}
          </h1>
        </div>
        <AddBodyMeasurementGuideModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {bodyMeasurementGuide?.length > 0 &&
          bodyMeasurementGuide.map((guide: BodyMeasurementGuideInterface) => (
            <BodyMeasurementGuide
              guide={guide}
              setOpenModal={setOpenModal}
              setModalTitle={setModalTitle}
              setField={setField}
              setOpenEditModal={setOpenEditModal}
            />
          ))}
      </div>
      {openModal && (
        <Modal
          size="custom"
          theme={modalTheme}
          show={openModal}
          onClose={() => setOpenModal(false)}
          position="bottom-center"
          className="bg-black"
        >
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-2 items-center h-full justify-center">
              {error && <Alert color="failure">Error - {error}</Alert>}
              <img
                src={preview || field.imageUrl.link || NoPic}
                alt="guide"
                className=" object-contain rounded-lg w-full h-full"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-between items-center">
            <div className="flex justify-between w-full">
              {!preview && (
                <BodyMeasurementGuideImageButton
                  setSelectedFile={setSelectedFile}
                  image={field.imageUrl.link}
                  fieldId={field._id}
                  setOpenModal={setOpenModal}
                />
              )}
              {field.imageUrl.link && (
                <BodyMeasurementGuideImageDeleteButton
                  fieldId={field._id}
                  setOpenModal={setOpenModal}
                />
              )}
            </div>

            {preview && (
              <div className="flex gap-2">
                <button
                  onClick={() => setPreview('')}
                  className="text-white bg-red-500 p-2 rounded-lg  h-8 text-sm text-center items-center flex"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImageUpload}
                  className="text-white bg-green-500 p-2 rounded-lg  h-8 text-sm text-center items-center flex"
                >
                  Save
                </button>
              </div>
            )}
          </Modal.Footer>
        </Modal>
      )}
      {openEditModal && (
        <BodyMeasurementEditModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          modalTitle={modalTitle}
          field={field}
        />
      )}
    </div>
  );
};

export default BodyMeasurementGuideLayout;
