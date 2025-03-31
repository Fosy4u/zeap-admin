import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import {
  Alert,
  Button,
  Label,
  Modal,
  TextInput,
  Timeline,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../../utils/helpers';
import { HiCalendar } from 'react-icons/hi';
import ReactTimeAgo from 'react-time-ago';

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

const DeliveryFee = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [newDeliveryFee, setNewDeliveryFee] = useState<number>(0);
  const [updateDeliveryFee, updateDeliveryFeeStatus] =
    zeapApiSlice.useUpdateDeliveryFeeMutation();
  const getDeliveryFeeQuery = zeapApiSlice.useGetDeliveryFeeQuery(
    {},
    { skip: !token },
  );
  const deliveryFee = getDeliveryFeeQuery.data?.data;
  console.log('deliveryFee', deliveryFee);
  const fee = deliveryFee?.fee;
  const currency = deliveryFee?.currency;
  const logs =
    (deliveryFee?.logs &&
      [...deliveryFee?.logs].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })) ||
    [];
  const isLoading =
    getDeliveryFeeQuery.isLoading || updateDeliveryFeeStatus.isLoading;

  useEffect(() => {
    if (deliveryFee) {
      setNewDeliveryFee(deliveryFee.fee);
    }
  }, [deliveryFee]);

  const handleUpdateDeliveryFee = () => {
    if (newDeliveryFee === deliveryFee?.fee) {
      return;
    }
    if (newDeliveryFee < 0 && newDeliveryFee !== 0) {
      setError('Delivery fee cannot be less than 0');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
    if (!newDeliveryFee) {
      setError('Delivery fee cannot be empty');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
    const payload = {
      fee: newDeliveryFee,
    };
    updateDeliveryFee({ payload })
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
    <div>
      {' '}
      <div className="flex justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          {' '}
          <h1 className="text-xl md:text-2xltext-dark">Delivery Fee</h1>
        </div>
      </div>
      {isLoading && <Loading />}
      {error && <Alert color="failure">Error - {error}</Alert>}
      {deliveryFee && (
        <div className="flex flex-col gap-4 p-4 text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-lg">
          <Alert color="info">
            <div className="flex flex-col gap-2">
              <span>
                <span className="font-semibold"> Note:</span>Total Delivery fee
                of a basket is the sum of the current delivery fee multiply by
                the number of basket items no matter the quantity of each item.
              </span>
            </div>
          </Alert>
          <div className="flex text-md justify-between items-center gap-2">
            <Label htmlFor="fieldTitle">Current Delivery Fee</Label>
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold text-success">
                {formatCurrency(fee, currency)}
              </div>
            </div>
          </div>
        </div>
      )}
      {logs?.length > 0 && (
        <div className="flex flex-col max-h-96 overflow-y-auto gap-4 p-4 text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-lg">
          <p className="text-sm font-semibold">Delivery Fee Update History</p>
          <Timeline>
            {logs.map(
              (
                log: {
                  value: number;
                  currency: string;
                  date: Date;
                  user: {
                    firstName: string;
                    lastName: string;
                    imageUrl?: {
                      link: string;
                      name: string;
                    };
                  };
                },
                index: number,
              ) => (
                <Timeline.Item key={index}>
                  <Timeline.Point icon={HiCalendar} />
                  <Timeline.Content>
                    <Timeline.Time>
                      {' '}
                      <ReactTimeAgo date={log.date} locale="en-US" />
                    </Timeline.Time>
                    <Timeline.Title className="text-sm md:text-md font-normal">
                      Updated Delivery Fee to{' '}
                      <span className="font-semibold">
                        {formatCurrency(log.value, log.currency)}
                      </span>
                    </Timeline.Title>
                    <Timeline.Body>
                      <span className="flex gap-2 items-center text-sm">
                        by {log.user.firstName} {log.user.lastName}{' '}
                        {log.user.imageUrl && (
                          <img
                            src={log.user.imageUrl.link}
                            alt={log.user.imageUrl.name}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                      </span>
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              ),
            )}
          </Timeline>
        </div>
      )}
      <Button
        onClick={() => setOpen(!open)}
        className="w-full"
        color="primary"
        size="sm"
        disabled={isLoading}
      >
        Update Delivery Fee
      </Button>
      {open && (
        <Modal
          className="bg-black bg-opacity-50"
          theme={modalTheme}
          title="Delete Image"
          onClose={() => setOpen(false)}
          show={open}
        >
          <Modal.Header>
            <div className="text-lg font-bold">Update Delivery Fee</div>
          </Modal.Header>
          <Modal.Body>
            {isLoading && <Loading />}
            {error && <Alert color="failure">Error - {error}</Alert>}
            <div className="flex flex-col gap-4 p-4  text-gray-500 dark:text-gray-400">
              <Label htmlFor="fieldTitle">Delivery Fee</Label>
              <TextInput
                id="deliveryFee"
                name="deliveryFee"
                value={newDeliveryFee}
                onChange={(e) => setNewDeliveryFee(Number(e.target.value))}
                addon={currency}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-between items-center">
            <Button
              color="success"
              onClick={() => {
                handleUpdateDeliveryFee();
              }}
            >
              Save
            </Button>
            <Button
              color="failure"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default DeliveryFee;
