import {
  Alert,
  Button,
  Label,
  Modal,
  TextInput,
  Timeline,
} from 'flowbite-react';
import { useState } from 'react';
import ReactTimeAgo from 'react-time-ago';

import { HiCalendar } from 'react-icons/hi';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import Loading from '../../../../lib/Loading';

type RateType = {
  currency: string;
  rate: number;
  logs?: [
    {
      currency: string;
      date: Date;
      value: number;
      user: {
        firstName: string;
        lastName: string;
        imageUrl: {
          name: string;
          link: string;
        };
      };
    },
  ];
};

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

const CurrencyRate = ({ rateInfo }: { rateInfo: RateType }) => {
  const currency = rateInfo.currency;
  const logs =
    (rateInfo?.logs &&
      [...rateInfo?.logs].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })) ||
    [];

  const [inputValue, setInputValue] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [newRate, setNewRate] = useState<number>(rateInfo.rate);
  const [error, setError] = useState<string>('');
  const [showLog, setShowLog] = useState(false);
  const [updateExchangeRate, updateExchangeRateStatus] =
    zeapApiSlice.useUpdateExchangeRateMutation();
  const isLoading = updateExchangeRateStatus.isLoading;

  const handleUpdateRate = () => {
    if (!newRate) {
      setError('Please enter a rate');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    if (newRate === rateInfo.rate) {
      return;
    }
    const payload = {
      rate: newRate,
      currency: currency,
    };
    updateExchangeRate({ payload })
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
    <div className="bg-grey8 dark:bg-grey2 p-1 flex flex-col">
      <div className="flex flex-col  p-2 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex justify-between mb-4">
          <h4 className="text-md md:text-2xltext-dark">
            {currency === 'USD' ? 'US Dollar (USD)' : 'British Pound (GBP)'}
          </h4>
          <Button
            onClick={() => setOpen(!open)}
            color="primary"
            size="sm"
            disabled={isLoading}
          >
            Update {currency === 'USD' ? 'US Dollar' : 'British Pound'} Rate
          </Button>
        </div>
        <Alert color="info">
          {currency === 'USD' && (
            <div className="flex flex-col gap-2 font-bold text-xs">
              1 Nigerian Naira (NGN) = {rateInfo.rate} US Dollar (USD)
            </div>
          )}
          {currency === 'GBP' && (
            <div className="flex flex-col gap-2 font-bold text-xs">
              1 Nigerian Naira (NGN) = {rateInfo.rate} British Pound (GBP)
            </div>
          )}
        </Alert>

        <div className="flex flex-col gap-4 p-4 text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-lg">
          <h5 className="text-sm font-semibold">Convert</h5>
          <div className="flex text-md justify-between items-center gap-2">
            <TextInput
              type="number"
              id="convert"
              name="convert"
              placeholder="Enter amount to convert"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              addon="NGN"
              className="w-40 md:w-100"
              color="success"
            />
            <div className="flex items-center gap-2">
              <div className="text-xs md:text-lg font-semibold text-success">
                {currency === 'USD'
                  ? `USD ${(rateInfo.rate * inputValue).toFixed(5)}`
                  : `GBP ${(rateInfo.rate * inputValue).toFixed(5)}`}
              </div>
            </div>
          </div>
        </div>

        {logs?.length > 0 && (
          <div className="flex flex-col max-h-96 overflow-y-auto gap-4 p-4 text-gray-500 dark:text-gray-400 border p-4 m-4 rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">
                {currency === 'USD' ? 'US Dollar' : 'British Pound'} Rate Update
                History
              </p>
              <Button
                color="info"
                size="xs"
                onClick={() => setShowLog(!showLog)}
              >
                {showLog ? 'Hide' : 'Show'} Log
              </Button>
            </div>
            {showLog && (
              <Timeline>
                {logs.map((log, index: number) => (
                  <Timeline.Item key={index}>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                      <Timeline.Time>
                        {' '}
                        <ReactTimeAgo date={log.date} locale="en-US" />
                      </Timeline.Time>
                      <Timeline.Title className="text-sm md:text-md font-normal">
                        Updated Delivery Fee to{' '}
                        <span className="font-semibold">{log.value}</span>
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
                ))}
              </Timeline>
            )}
          </div>
        )}

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
                Update {currency === 'USD' ? 'US Dollar' : 'British Pound'} Rate
              </div>
            </Modal.Header>
            <Modal.Body>
              {isLoading && <Loading />}
              {error && <Alert color="failure">Error - {error}</Alert>}
              <div className="flex flex-col gap-4 p-4  text-gray-500 dark:text-gray-400">
                <Label htmlFor="fieldTitle">
                  {currency === 'USD' ? 'US Dollar' : 'British Pound'} Rate to
                  NGN
                </Label>
                <TextInput
                  id="rate"
                  name="rate"
                  value={newRate}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  type="number"
                />
              </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-between items-center">
              <Button
                color="success"
                onClick={() => {
                  handleUpdateRate();
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

export default CurrencyRate;
