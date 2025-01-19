import { Button, Popover } from 'flowbite-react';
import { useState } from 'react';
import { BodyMeasurementGalleryDrawer } from './BodyMeasurementGalleryDrawer';

const BodyMeasurementGuideImageButton = ({
  setSelectedFile,
  image,
  fieldId,
  setOpenModal,
}: {
  setSelectedFile: (file: File) => void;
  image: string;
  fieldId: string;
  setOpenModal: (isOpen: boolean) => void;
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openGalleryDrawer, setOpenGalleryDrawer] = useState(false);

  return (
    <>
      <Popover
        aria-labelledby="area-popover"
        open={openPopup}
        onOpenChange={setOpenPopup}
        content={
          <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
            <Button
              onClick={() => {
                setOpenGalleryDrawer(true);
                setOpenPopup(false);
              }}
              size="sm"
            >
              Select from Gallery
            </Button>
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                document.getElementById('image')?.click();
                setOpenPopup(false);
              }}
            >
              Upload New Image
            </Button>
          </div>
        }
      >
        <div
          onClick={() => {
            setOpenPopup(!openPopup);
          }}
          className="cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-solid border-yellow-700 bg-yellow-50 p-1 font-semibold text-yellow-800 shadow transition-colors hover:bg-warning hover:text-indigo-50 focus:bg-indigo-900 focus:text-indigo-50"
        >
          {image ? 'Change Image' : 'Add Image'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </Popover>
      <input
        type="file"
        name="image"
        id="image"
        className="sr-only"
        accept="image/*"
        onChange={(e) => {
          console.log('e', e);
          const file = e.target.files?.[0];
          if (file) {
            setSelectedFile(file);
          }
        }}
      />
      {openGalleryDrawer && (
        <BodyMeasurementGalleryDrawer
          isOpen={openGalleryDrawer}
          setIsOpen={setOpenGalleryDrawer}
          fieldId={fieldId}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default BodyMeasurementGuideImageButton;
