'use client';

import { Drawer, Timeline } from 'flowbite-react';

import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { IoIosDoneAll } from 'react-icons/io';

import ReactTimeAgo from 'react-time-ago';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import ProductOrderUpdateStatus from './ProductOrderUpdateStatus';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../contexts/themeContext';
import ProductOrderCancellation from './ProductOrderCancellation';
//import { useSelector } from 'react-redux';
//import { globalSelectors } from '../../../redux/services/global.slice';
// import { numberWithCommas } from '../../../utils/helpers';

const drawerTheme = {
  root: {
    base: 'fixed z-9999  overflow-y-auto bg-white    p-4 transition-transform dark:bg-boxdark',

    position: {
      right: {
        on: 'right-0 top-0 h-screen w-100 md:w-[40vw] transform-none',
        off: 'right-0 top-0 h-screen w-80 translate-x-full',
      },
    },
  },
};
const timelineTheme = {
  root: {
    direction: {
      horizontal: 'sm:flex',
      vertical: 'relative border-l border-gray-200 dark:border-gray-700',
    },
  },
  item: {
    point: {
      horizontal: 'flex items-center',
      line: 'hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex',
      marker: {
        icon: {
          base: 'h-3 w-3 text-cyan-600 dark:text-cyan-300',
          wrapper:
            'absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-success ring-8 ring-white  dark:ring-gray-900',
        },
      },
      vertical: '',
    },
  },
};

export function ProductOrderStatusHistoryDrawer({
  isOpen,
  setIsOpen,
  productOrder_id,
}: {
  productOrder_id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { setDimBackground } = useContext(ThemeContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const [deliveryCompany, setDeliveryCompany] = useState('');
  const [deliveryTrackingNumber, setDeliveryTrackingNumber] = useState('');
  const [deliveryTrackingLink, setDeliveryTrackingLink] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [serverError, setServerError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openRevertModal, setOpenRevertModal] = useState(false);
  const [updateProductOrderStatus, updateProductOrderStatusStatus] =
    zeapApiSlice.useUpdateProductOrderStatusMutation();
  const productOrderStatusHistoryQuery =
    zeapApiSlice.useGetProductOrderStatusHistoryQuery(
      { productOrder_id },
      { skip: !token || !productOrder_id },
    );
  const history = productOrderStatusHistoryQuery?.data?.data.statusHistory;
  const nextStatus = productOrderStatusHistoryQuery?.data?.data.nextStatus;
  const currentStatus =
    productOrderStatusHistoryQuery?.data?.data.currentStatus;
  const isLoading =
    productOrderStatusHistoryQuery.isLoading ||
    updateProductOrderStatusStatus.isLoading;
  console.log('history', history);

  const handleClose = () => setIsOpen(false);

  const handleUpdateStatus = (status: string) => {
    const payload = {
      status,
      productOrder_id,
      deliveryCompany,
      deliveryTrackingNumber,
      deliveryTrackingLink,
      deliveryDate,
    };
    updateProductOrderStatus({ payload })
      .unwrap()
      .then(() => {
        setServerError('');
        setDimBackground(false);
        setOpenModal(false);
        setOpenRevertModal(false);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError('');
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
      <Drawer.Header
        title="Parent Order Status History"
        className="text-darkGold"
      />
      <Drawer.Items className="p-4 flex flex-col gap-4">
        {isLoading && <Loading />}

        <Timeline theme={timelineTheme}>
          {history?.map((status: any, index: number) => (
            <Timeline.Item key={index}>
              <Timeline.Point icon={IoIosDoneAll} />
              <Timeline.Content>
                {status?.date && (
                  <Timeline.Time>
                    <ReactTimeAgo date={status?.date} locale="en-US" />
                  </Timeline.Time>
                )}
                {/* <Timeline.Title>{status?.name}</Timeline.Title> */}
                <Timeline.Body
                  className={`${status?.value === currentStatus?.value && 'text-success'}`}
                >
                  {capitalizeFirstLetter(status?.name)}
                </Timeline.Body>
                {status?.value !== currentStatus?.value && (
                  <ProductOrderUpdateStatus
                    status={status}
                    handleUpdateStatus={handleUpdateStatus}
                    serverError={serverError}
                    setServerError={setServerError}
                    openModal={openRevertModal}
                    setOpenModal={setOpenRevertModal}
                    setDimBackground={setDimBackground}
                    deliveryTrackingLink={deliveryTrackingLink}
                    setDeliveryTrackingLink={setDeliveryTrackingLink}
                    deliveryCompany={deliveryCompany}
                    setDeliveryCompany={setDeliveryCompany}
                    deliveryTrackingNumber={deliveryTrackingNumber}
                    setDeliveryTrackingNumber={setDeliveryTrackingNumber}
                    deliveryDate={deliveryDate}
                    setDeliveryDate={setDeliveryDate}
                  />
                )}
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
        {nextStatus && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <ProductOrderUpdateStatus
              nextStatus={nextStatus}
              handleUpdateStatus={handleUpdateStatus}
              serverError={serverError}
              setServerError={setServerError}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setDimBackground={setDimBackground}
              deliveryTrackingLink={deliveryTrackingLink}
              setDeliveryTrackingLink={setDeliveryTrackingLink}
              deliveryCompany={deliveryCompany}
              setDeliveryCompany={setDeliveryCompany}
              deliveryTrackingNumber={deliveryTrackingNumber}
              setDeliveryTrackingNumber={setDeliveryTrackingNumber}
              deliveryDate={deliveryDate}
              setDeliveryDate={setDeliveryDate}
            />
          </div>
        )}
        <div className="flex justify-center items-center gap-2 mt-6">
          <ProductOrderCancellation
            productOrder_id={productOrder_id}
            currentStatus={currentStatus}
          />
        </div>
      </Drawer.Items>
    </Drawer>
  );
}
