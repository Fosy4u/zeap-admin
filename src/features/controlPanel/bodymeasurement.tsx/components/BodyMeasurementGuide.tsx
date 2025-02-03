import { capitalize } from 'lodash';
import { BodyMeasurementGuideInterface } from '../../../../interface/interface';
import { useState } from 'react';
import { Alert, Badge, Popover } from 'flowbite-react';
import DeleteBodyMeasurementGuideModal from './DeleteBodyMeasurementGuideModal';
import { HiArrowsExpand, HiArrowSmUp, HiDotsVertical } from 'react-icons/hi';
import DeleteBodyMeasurementGuideFieldModal from './DeleteBodyMeasurementGuideFieldModal';
import UpdateBodyMeasurementGuideNameModal from './UpdateBodyMeasurementGuideNameModal';
import AddBodyMeasurementGuideFieldModal from './AddBodyMeasurementGuideFieldModal';

const BodyMeasurementGuide = ({
  guide,
  setOpenModal,
  setModalTitle,
  setField,
  setOpenEditModal,
}: {
  guide: BodyMeasurementGuideInterface;
  setOpenModal: (open: boolean) => void;
  setModalTitle: (title: string) => void;
  setField: (field: {
    field: string;
    description: string;
    imageUrl: {
      name: string;
      link: string;
    };
    _id: string;
  }) => void;
  setOpenEditModal: (open: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div>
      {' '}
      <div
        onClick={() => setOpen(!open)}
        className="col-span-1 shadow-md p-2  text-center h-[6rem] flex  flex-col w-full gap-4 items-center cursor-pointer dark:bg-slate-800"
      >
        <div className="text-lg font-bold">{capitalize(guide.name)}</div>
        <div className="flex justify-between w-full">
          <div
            className={` p-2 rounded-full ${open ? 'bg-lightDanger' : 'bg-blue-100'}`}
          >
            {open ? (
              <HiArrowSmUp className="text-warning" />
            ) : (
              <HiArrowsExpand className="text-info" />
            )}
          </div>

          <div className="flex gap-2">
            <Popover
              aria-labelledby="area-popover"
              open={openPopup}
              onOpenChange={setOpenPopup}
              content={
                <div className="flex flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
                  <AddBodyMeasurementGuideFieldModal guide={guide} />
                  <UpdateBodyMeasurementGuideNameModal guide={guide} />
                  <DeleteBodyMeasurementGuideModal guide={guide} />
                </div>
              }
            >
              <div
                className="bg-slate-100 p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPopup(!openPopup);
                }}
              >
                <HiDotsVertical className="text-darkGold" />
              </div>
            </Popover>
          </div>
        </div>
      </div>
      {open && (
        <div className="  relative border-t border-solid border-green-700 after:absolute after:-top-px after:left-1/2 after:h-7 after:w-7 after:-translate-x-2/4 after:-translate-y-2/4 after:-rotate-45 after:border after:border-b-0 after:border-l-0 after:border-solid after:border-green-700 after:bg-white dark:after:bg-slate-800">
          {[...guide.fields]
            .sort((a, b) => {
              if (a.field < b.field) {
                return -1;
              }
              if (a.field > b.field) {
                return 1;
              }
              return 0;
            })
            .map((field, index) => (
              <div
                key={index}
                className="p-4 border-b border-solid border-green-800 dark:border-slate-400"
              >
                <div className="pb-9 pt-6">
                  <div className="flex  gap-2 items-center justify-between">
                    <h2 className="mb-3 text-md font-semibold text-info">
                      {field.field}
                    </h2>
                  </div>

                  {field.description ? (
                    <p className="mb-4">{capitalize(field.description)} </p>
                  ) : (
                    <Alert color="info" className="text-sm m-2 mb-4">
                      No description available. Click on Edit to add a
                      description
                    </Alert>
                  )}
                  <div className="flex justify-between item-center">
                    <div
                      onClick={() => {
                        setModalTitle(
                          `${capitalize(guide.name)} - ${field.field}`,
                        );
                        setField(field);
                        setOpenModal(true);
                      }}
                      className="text-xs cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-solid border-green-700 bg-green-50 p-1 font-semibold text-green-800 shadow transition-colors hover:bg-green-900 hover:text-green-50 focus:bg-green-900 focus:text-green-50"
                    >
                      View Image
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
                    <div className="flex gap-2">
                      <Badge
                        onClick={() => {
                          setModalTitle(
                            `${capitalize(guide.name)} - ${field.field}`,
                          );
                          setField(field);
                          setOpenEditModal(true);
                        }}
                        size="xs"
                        color="warning"
                        className="cursor-pointer"
                      >
                        Edit
                      </Badge>
                      <DeleteBodyMeasurementGuideFieldModal field={field} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BodyMeasurementGuide;
