import {
  Alert,
  Button,
  Label,
  Modal,
  TextInput,
  ToggleSwitch,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { DeliveryFeeInterface } from '../../../interface/interface';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { formatCurrency } from '../../../utils/helpers';

const ModalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-99999 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full opacity-100',
  },
  content: {
    base: 'relative h-full w-full p-4 md:h-auto',
    inner:
      'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700',
  },
};
const toggleTheme = {
  root: {
    base: 'group flex rounded-lg focus:outline-none',
    active: {
      on: 'cursor-pointer',
      off: 'cursor-not-allowed opacity-50',
    },
    label:
      'ms-3 mt-0.5 text-start text-sm font-medium text-gray-900 dark:text-gray-300',
  },
  toggle: {
    base: 'relative rounded-full border after:absolute after:rounded-full after:bg-white after:transition-all group-focus:ring-4 group-focus:ring-cyan-500/25',
    checked: {
      on: 'after:translate-x-full after:border-white rtl:after:-translate-x-full',
      off: 'border-gray-200 bg-slate-700 dark:border-gray-600 dark:bg-gray-700',
    },
  },
};

const FreeThreshold = ({ fee }: { fee: DeliveryFeeInterface }) => {
  const freeDeliveryThreshold = fee?.freeDeliveryThreshold;
  const [open, setOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [enabled, setEnabled] = useState(
    freeDeliveryThreshold?.enabled || false,
  );
  console.log('enabled', enabled);
  const [amount, setAmount] = useState(freeDeliveryThreshold?.amount || 0);
  const [serverError, setServerError] = useState<string>('');
  const [updateDeliveryFee, updateDeliveryFeeStatus] =
    zeapApiSlice.useUpdateDeliveryFeeMutation();
  const isLoading = updateDeliveryFeeStatus.isLoading;
  useEffect(() => {
    if (fee) {
      setEnabled(fee?.freeDeliveryThreshold.enabled || false);
      setAmount(fee?.freeDeliveryThreshold.amount || 0);
    }
  }, [fee]);

  const handleUpdateDeliveryFee = () => {
    if (amount === freeDeliveryThreshold?.amount) {
      return;
    }

    const payload = {
      id: fee._id,
      fee: fee.fee,
      freeDeliveryThreshold: {
        enabled,
        amount,
      },
    };
    updateDeliveryFee({ payload })
      .unwrap()
      .then(() => {
        setOpen(false);
        setOpenConfirmModal(false);
      })
      .catch((err) => {
        setServerError(err.data.serverError);
        setTimeout(() => {
          setServerError('');
        }, 5000);
      });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 flex-col md:flex-row justify-between md:items-center">
        <div className="flex md:gap-2 justify-between items-center w-full">
          <Label htmlFor="fieldTitle">Free Delivery Threshold</Label>{' '}
          <ToggleSwitch
            theme={toggleTheme}
            name="enabled"
            checked={enabled}
            onChange={() => {
              if (!enabled) {
                setEnabled(true);
                return setOpen(true);
              }

              if (enabled) {
                return setOpenConfirmModal(true);
              }
            }}
            // label="Enable Free Delivery Threshold"
          />
        </div>

        {enabled && (
          <div
            className="flex flex-col items-center gap-2"
            onClick={() => {
              setOpen(true);
            }}
          >
            <div className="text-lg font-semibold text-success">
              {formatCurrency(freeDeliveryThreshold?.amount, fee.currency)}
            </div>
            <Button
              className="w-full"
              color="primary"
              size="xs"
              disabled={isLoading}
            >
              Update Threshold
            </Button>
          </div>
          // <div className="flex gap-4 flex-col">
          //   <Label className="text-darkGold hidden md:block">
          //     Threshold Amount
          //   </Label>
          //   <Button
          //     color="success"
          //     onClick={() => {
          //       setOpen(true);
          //     }}
          //   >
          //     {fee.currency} {numberWithCommas(amount)}
          //   </Button>
          // </div>
        )}
      </div>
      <Modal
        size="7xl"
        theme={ModalTheme}
        show={open}
        onClose={() => {
          setEnabled(freeDeliveryThreshold?.enabled || false);
          setOpen(false);
        }}
      >
        <Modal.Header>Set Free Delivery Threshold Amount</Modal.Header>
        <Modal.Body>
          {isLoading && <Loading />}
          {serverError && (
            <Alert color="failure" icon={HiInformationCircle} className="my-4">
              {serverError}
            </Alert>
          )}
          <Alert color="warning" className="my-4">
            <p className="text-xs">
              This action will set the free delivery threshold for this delivery
              fee.
            </p>
          </Alert>
          <div className="flex gap-4 ">
            <TextInput
              name="amount"
              value={amount}
              color="success"
              addon={fee.currency}
              type="number"
              min={0}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={handleUpdateDeliveryFee}>
            Save
          </Button>
          <Button
            color="failure"
            onClick={() => {
              setEnabled(freeDeliveryThreshold?.enabled || false);
              setOpen(false);
            }}
          >
            Cancel{' '}
          </Button>
        </Modal.Footer>
      </Modal>
      {openConfirmModal && (
        <Modal
          size="7xl"
          theme={ModalTheme}
          show={openConfirmModal}
          onClose={() => {
            setEnabled(true);
            setOpenConfirmModal(false);
          }}
        >
          <Modal.Header>Confirm Free Delivery Threshold</Modal.Header>
          <Modal.Body>
            <Alert color="warning" className="my-4">
              <p className="text-xs">
                This action will disable free delivery threshold for this
                delivery fee. Are you sure you want to proceed?
              </p>
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="success"
              onClick={() => {
                setEnabled(false);
                setAmount(0);
                handleUpdateDeliveryFee();
                setOpenConfirmModal(false);
              }}
            >
              Yes, I'm sure
            </Button>
            <Button
              color="failure"
              onClick={() => {
                setEnabled(true);
                setOpenConfirmModal(false);
              }}
            >
              Cancel{' '}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default FreeThreshold;
