import { Alert, Button, Datepicker, Label, Modal } from 'flowbite-react';
import { ProductOrdersInterface } from '../../../interface/interface';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../contexts/themeContext';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
  getCurrencySmallSymbol,
  numberWithCommas,
} from '../../../utils/helpers';

const ProductOrderPayShop = ({
  productOrder,
}: {
  productOrder: ProductOrdersInterface;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [paidAt, setPaidAt] = useState<Date | null>(null);
  const [reference, setReference] = useState('');
  const [serverError, setServerError] = useState('');
  const deliveryDate = productOrder?.deliveryDate;
  const shopRevenue = productOrder?.shopRevenue;
  const status = shopRevenue?.status;
  const [payShop, payShopStatus] = zeapApiSlice.usePayShopMutation();
  const [revertShopPayment, revertShopPaymentStatus] =
    zeapApiSlice.useRevertShopPaymentMutation();
  const isLoading =
    payShopStatus.isLoading || revertShopPaymentStatus.isLoading;
  useEffect(
    () => {
      setDimBackground(openModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal],
  );

  const validate = () => {
    if (!paidAt) {
      setServerError('Please select a date payment was made');
      setTimeout(() => {
        setServerError('');
      }, 5000);
      return false;
    }
    if (!reference) {
      setServerError('Please enter a payment reference');
      setTimeout(() => {
        setServerError('');
      }, 5000);
      return false;
    }
    return true;
  };

  const handlePayShop = () => {
    if (!validate()) {
      return;
    }
    const payload = {
      productOrder_id: productOrder._id,
      paidAt,
      reference,
    };
    payShop({ payload })
      .unwrap()
      .then(() => {
        setServerError('');
        setDimBackground(false);
        setOpenModal(false);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError('');
        }, 5000);
      });
  };
  const handleRevertShopPayment = () => {
    const payload = {
      productOrder_id: productOrder._id,
    };
    revertShopPayment({ payload })
      .unwrap()
      .then(() => {
        setServerError('');
        setDimBackground(false);
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
    <>
      {isLoading && <Loading />}
      {productOrder && (
        <Button
          onClick={() => setOpenModal(true)}
          disabled={productOrder?.status.value !== 'order delivered'}
          color={shopRevenue?.status === 'pending' ? 'success' : 'failure'}
          size="sm"
        >
          {status === 'pending' ? 'Pay Shop' : 'Revert Payment'}
        </Button>
      )}
      {openModal && (
        <Modal
          show={openModal}
          size="3xl"
          onClose={() => setOpenModal(false)}
          className="h-full"
        >
          <Modal.Header />
          <Modal.Body>
            {serverError && <Alert color="failure">{serverError}</Alert>}
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-danger" />
              <div className="flex flex-col mb-4">
                {status === 'pending' && (
                  <p className=" text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure this order has been delivered and shop has been
                    paid{' '}
                    <strong className="text-success">
                      {getCurrencySmallSymbol(shopRevenue?.currency)}
                      {numberWithCommas(shopRevenue?.value)}
                    </strong>
                    ?
                  </p>
                )}
                {status !== 'pending' && (
                  <p className=" text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to revert the payment for this order?
                  </p>
                )}
              </div>
            </div>
            {status === 'pending' && (
              <div className="flex  flex-col gap-4 my-6">
                <div className="flex flex-col gap-2 my-2">
                  <Alert color="warning">
                    This action will update the vendor payment status to paid
                    and the vendor will be notified
                  </Alert>
                </div>
                <div className="flex flex-col gap-2 my-2">
                  <Label>Date Payment was paid to vendor</Label>
                  <p className="text-xs text-slate-400">
                    Note that only dates after the delivery date are allowed to
                    be selected
                  </p>
                  <Datepicker
                    title="Paid on"
                    value={paidAt}
                    minDate={new Date(deliveryDate)}
                    maxDate={new Date()}
                    onChange={(e) => {
                      console.log('e', e);
                      if (e) {
                        setPaidAt(e);
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 my-2">
                  <Label>Payment Reference</Label>
                  <input
                    type="text"
                    placeholder="Payment Reference"
                    value={reference}
                    required
                    onChange={(e) => setReference(e.target.value)}
                    className="input input-bordered"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-center gap-4">
              <Button
                color={status === 'pending' ? 'success' : 'failure'}
                onClick={() => {
                  status === 'pending'
                    ? handlePayShop()
                    : handleRevertShopPayment();
                }}
              >
                {status === 'pending' ? 'Yes, Mark as paid' : 'Revert'}
              </Button>
              <Button color="failure" onClick={() => setOpenModal(false)}>
                No
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ProductOrderPayShop;
