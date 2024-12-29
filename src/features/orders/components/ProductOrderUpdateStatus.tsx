import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import {
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';

const ProductOrderUpdateStatus = ({
  nextStatus,
  handleUpdateStatus,
  status,
  serverError,
  setServerError,
  openModal,
  setOpenModal,
  setDimBackground,
  deliveryTrackingLink,
  setDeliveryTrackingLink,
  deliveryCompany,
  setDeliveryCompany,
  deliveryTrackingNumber,
  setDeliveryTrackingNumber,
  deliveryDate,
  setDeliveryDate,
}: {
  nextStatus?: {
    name: string;
    value: string;
  };
  status?: {
    name: string;
    value: string;
  };
  handleUpdateStatus: (status: string) => void;
  serverError: string;
  setServerError: (error: string) => void;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  setDimBackground: (openModal: boolean) => void;
  deliveryTrackingLink: string;
  setDeliveryTrackingLink: (link: string) => void;
  deliveryCompany: string;
  setDeliveryCompany: (company: string) => void;
  deliveryTrackingNumber: string;
  setDeliveryTrackingNumber: (trackingNumber: string) => void;
  deliveryDate: Date | null;
  setDeliveryDate: (date: Date) => void;
}) => {
  const [statusValue, setStatusValue] = useState('');
  const [modalQuestion, setModalQuestion] = useState('');

  useEffect(
    () => {
      setDimBackground(openModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal],
  );

  const getQuestion = (status: { name: string; value: string }) => {
    const value = status?.value;

    if (value === 'order confirmed') {
      return `Are you sure you want to update status to ${status?.name}? This supposed to be actioned by the vendor`;
    }
    if (value === 'order processing') {
      return `Are you sure you want to update status to ${status?.name}? This supposed to be actioned by the vendor`;
    }
    if (value === 'order ready for delivery') {
      return `Are you sure you want to update status to ${status?.name}? This supposed to be actioned by the vendor`;
    }
    return `Are you sure you want to update status to ${status?.name}`;
  };

  return (
    <>
      {' '}
      {status?.name && (
        <button
          onClick={() => {
            setStatusValue(status?.value);
            setModalQuestion(
              `Are you sure you want to revert status back to ${status?.name}`,
            );
            setOpenModal(true);
          }}
          className="flex gap-2 border bg-lightDanger p-2 rounded-md text-danger justify-center items-center text-xs"
        >
          change status back to {status?.name}
          <HiArrowNarrowLeft className="mr-2 h-5 w-5" />
        </button>
      )}
      {nextStatus?.name && (
        <Button
          color="success"
          size="sm"
          onClick={() => {
            setServerError('');
            setStatusValue(nextStatus?.value);
            setOpenModal(true);
            setModalQuestion(getQuestion(nextStatus));
          }}
          className="w-full"
        >
          <HiArrowNarrowRight className="mr-2 h-5 w-5" />
          Update Status to {capitalizeFirstLetter(nextStatus?.name)}
        </Button>
      )}
      {openModal && (
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
          <Modal.Header />
          <Modal.Body>
            {serverError && <Alert color="failure">{serverError}</Alert>}
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-danger" />
              <div className="flex flex-col mb-4">
                <p className=" text-lg font-normal text-gray-500 dark:text-gray-400">
                  {modalQuestion}
                </p>
              </div>
              {statusValue === 'order dispatched' && (
                <div className="flex flex-col gap-4 my-6">
                  <Alert color="warning">
                    This action will update the status to order dispatched and
                    will notify the customer
                  </Alert>
                  <div className="flex flex-col gap-2">
                    <span>Delivery Company</span>
                    <TextInput
                      value={deliveryCompany}
                      onChange={(e) => {
                        setDeliveryCompany(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span>Delivery Tracking Number</span>
                    <TextInput
                      value={deliveryTrackingNumber}
                      onChange={(e) => {
                        setDeliveryTrackingNumber(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span>Delivery Tracking Link</span>
                    <TextInput
                      value={deliveryTrackingLink}
                      onChange={(e) => {
                        setDeliveryTrackingLink(e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
              {statusValue === 'order delivered' && (
                <div className="flex flex-col gap-4 my-6">
                  <Alert color="warning">
                    This action will update the status to order delivered and
                    will notify the customer
                  </Alert>
                  <div className="flex flex-col gap-2">
                    <span>Delivery Date</span>
                    <TextInput
                      type="date"
                      value={deliveryDate?.toISOString().split('T')[0]}
                      onChange={(e) => {
                        setDeliveryDate(new Date(e.target.value));
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-center gap-4">
                <Button
                  color="success"
                  onClick={() => {
                    handleUpdateStatus(statusValue);
                  }}
                >
                  Yes
                </Button>
                <Button color="failure" onClick={() => setOpenModal(false)}>
                  No
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ProductOrderUpdateStatus;
