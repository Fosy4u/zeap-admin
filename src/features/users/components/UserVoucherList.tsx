import { useState } from 'react';
import { UserInterface, VoucherInterface } from '../../../interface/interface';
import UserVoucher from './UserVoucher';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { Alert, Button, Label, Modal, TextInput } from 'flowbite-react';
import Loading from '../../../lib/Loading';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-99999 w-screen h-screen overflow-y-auto overflow-x-hidden ',
    show: {
      on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
      off: 'hidden',
    },
    sizes: {
      custom: 'w-screen h-screen md:max-w-xl md:h-full',
    },
  },
  content: {
    base: 'relative h-full w-full  md:h-auto ',
    inner:
      'relative flex w-screen h-screen md:max-h-[90dvh] md:w-full md:h-full flex-col rounded-lg bg-white shadow dark:bg-gray-700 ',
  },
};

const UserVoucherList = ({
  vouchers,
  user,
}: {
  vouchers: VoucherInterface[];
  user: UserInterface;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [serverError, setServerError] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [issueVoucher, issueVoucherStatus] =
    zeapApiSlice.useIssueVoucherMutation();
  const isLoading = issueVoucherStatus.isLoading;

  const handleIssueVoucher = async () => {
    if (!amount) {
      setServerError('Amount is required');
      setTimeout(() => {
        setServerError('');
      }, 3000);
      return;
    }
    const payload = {
      amount,
      expiryDate,
      user_id: user._id,
    };
    issueVoucher({ payload })
      .unwrap()
      .then(() => {
        setAmount(0);
        setExpiryDate(new Date());
        setOpenModal(false);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError('');
        }, 5000);
      });
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <Button size="xs" color="success" onClick={() => setOpenModal(true)}>
          Issue Voucher
        </Button>
      </div>

      {vouchers?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2  ">
          {vouchers.map((voucher) => (
            <UserVoucher key={voucher?._id} voucher={voucher} />
          ))}
        </div>
      )}
      <Modal
        size="custom"
        theme={modalTheme}
        show={openModal}
        onClose={() => setOpenModal(false)}
        position="bottom-center"
        className="bg-black"
      >
        <Modal.Header>Issue Voucher to {user?.displayName}</Modal.Header>
        <Modal.Body>
          {serverError && (
            <Alert color="failure" className="mb-4">
              Error - {serverError}
            </Alert>
          )}
          {isLoading && <Loading />}
          <div className="flex flex-col gap-2 w-full h-full justify-center">
            <Label>Amount</Label>
            <TextInput
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Label>Expiry Date</Label>
            <TextInput
              type="date"
              value={expiryDate ? expiryDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setExpiryDate(new Date(e.target.value))}
            />

            <Button color="success" onClick={handleIssueVoucher}>
              Issue Voucher
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserVoucherList;
