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
import { DeliveryFeeInterface } from '../../../interface/interface';

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

const DeliveryFeeDetails = ({
  deliveryFee,
}: {
  deliveryFee: DeliveryFeeInterface;
}) => {
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [newDeliveryFee, setNewDeliveryFee] = useState<number>(0);
  const [updateDeliveryFee, updateDeliveryFeeStatus] =
    zeapApiSlice.useUpdateDeliveryFeeMutation();

  const fee = deliveryFee?.fee;
  const currency = deliveryFee?.currency;
  const logs =
    (deliveryFee?.logs &&
      [...deliveryFee?.logs].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })) ||
    [];
  const isLoading = updateDeliveryFeeStatus.isLoading;
  const handleClick = () => {
    setActive(!active);
  };

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
    if (!newDeliveryFee && newDeliveryFee !== 0) {
      setError('Delivery fee cannot be empty');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
    const payload = {
      fee: newDeliveryFee,
      country: deliveryFee.country,
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
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <h2 id="accordion-flush-heading-1">
        <button
          onClick={handleClick}
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <span className="text-lg font-bold text-info">
            {deliveryFee.country}
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`py-5 border-b border-gray-200 dark:border-gray-700 text-sm flex flex-col  bg-neutral-100 p-2 ${
          active ? 'block' : 'hidden'
        }`}
        aria-labelledby="accordion-flush-heading-1"
      >
        {isLoading && <Loading />}
        {error && <Alert color="failure">Error - {error}</Alert>}
        {deliveryFee && (
          <div className="flex flex-col gap-4 p-4 text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-lg">
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
              <div className="text-lg font-bold">
                Update Delivery Fee For {deliveryFee.country}
              </div>
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
    </div>
  );
};

export default DeliveryFeeDetails;
