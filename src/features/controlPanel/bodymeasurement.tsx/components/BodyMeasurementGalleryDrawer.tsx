'use client';

import { Alert, Badge, Drawer } from 'flowbite-react';

import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../../redux/services/global.slice';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import Loading from '../../../../lib/Loading';
import { useEffect, useState } from 'react';
import SearchBar from '../../../../lib/SearchBar';
import { useParams } from 'react-router-dom';

//import { useSelector } from 'react-redux';
//import { globalSelectors } from '../../../redux/services/global.slice';
// import { numberWithCommas } from '../../../utils/helpers';

const drawerTheme = {
  root: {
    base: 'fixed z-99999  overflow-y-auto bg-slate-100   p-4 transition-transform ',

    position: {
      right: {
        on: 'right-0 top-0 h-screen w-100 md:w-[65vw] transform-none',
        off: 'right-0 top-0 h-screen w-80 translate-x-full',
      },
    },
  },
};

export function BodyMeasurementGalleryDrawer({
  isOpen,
  setIsOpen,
  fieldId,
  setOpenModal,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fieldId: string;
  setOpenModal: (open: boolean) => void;
}) {
  const { gender } = useParams();
  const [input, setInput] = useState('');
  const [filteredGallery, setFilteredGallery] = useState([]);
  const [error, setError] = useState<string>('');
  const token = useSelector(globalSelectors.selectAuthToken);
  const bodyMeasurementGuideGalleryQuery =
    zeapApiSlice.useGetBodyMeasurementGuideGalleryQuery({}, { skip: !token });
  const gallery = bodyMeasurementGuideGalleryQuery.data?.data || [];
  const [uploadImageMutation, uploadImageMutationStatus] =
    zeapApiSlice.useUploadBodyMeasurementGuideImageMutation();
  const isLoading =
    bodyMeasurementGuideGalleryQuery.isLoading ||
    uploadImageMutationStatus.isLoading;

  const handleClose = () => setIsOpen(false);

  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  };
  const searchRegex = new RegExp(escapeRegExp(input), 'i');
  // recursive search function
  const search = (item: any) => {
    let found = false;

    if (typeof item === 'string') {
      if (searchRegex.test(item?.toString())) {
        found = true;
        return found;
      }
    }

    if (typeof item === 'object' && item !== null) {
      Object.keys(item).forEach((key) => {
        const value = item[key];
        const match = search(value);
        if (match) {
          found = true;
          return found;
        }
      });
    }
    return found;
  };
  useEffect(() => {
    if (gallery?.length > 0) {
      const result = gallery?.filter((row: any) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof any]);
        });
      });

      setFilteredGallery(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, gallery]);

  const handleImageUpload = (existingLink: string) => {
    if (!gender) return;
    const payload = {
      existingLink,
      fieldId,
      gender,
    };
    uploadImageMutation({ payload })
      .unwrap()
      .then(() => {
        setError('');
        setOpenModal(false);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log('err', err);
        setError(err.data.error);
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      theme={drawerTheme}
    >
      <Drawer.Header title="Parent Order" className="text-darkGold" />
      <Drawer.Items>
        {gallery.length > 0 && (
          <div className="flex items-center gap-2">
            <SearchBar
              setInput={setInput}
              placeHolder="Search Image"
              className="w-full"
            />
          </div>
        )}
        {isLoading && <Loading />}
        {bodyMeasurementGuideGalleryQuery.status === 'fulfilled' &&
          gallery.length === 0 && (
            <Alert color="info">
              No images found in the gallery. Please upload new images.
            </Alert>
          )}
        {error && <Alert color="failure">Error - {error}</Alert>}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredGallery.map(
            (image: { imageUrl: string; title: string }, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 cursor-pointer hover:shadow-md p-2"
                onClick={() => handleImageUpload(image.imageUrl)}
              >
                <img
                  src={image?.imageUrl}
                  alt="gallery"
                  className="h-auto max-w-full rounded-lg"
                />
                <Badge size="md" color="info">
                  {image.title}
                </Badge>
              </div>
            ),
          )}
        </div>
      </Drawer.Items>
    </Drawer>
  );
}
