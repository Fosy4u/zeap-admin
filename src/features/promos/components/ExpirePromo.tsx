import { Alert, Button, Modal } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { ThemeContext } from '../../../contexts/themeContext';
import { HiInformationCircle } from 'react-icons/hi';
import { PromoInterface } from '../../../interface/interface';
import Loading from '../../../lib/Loading';

const ExpirePromoModal = ({
  promo,
  openModal,
  setOpenModal,
}: {
  promo: PromoInterface;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setDimBackground } = useContext(ThemeContext);
  const [expirePromo, expirePromoStatus] =
    zeapApiSlice.useExpirePromoMutation();
  const isLoading = expirePromoStatus.isLoading;

  useEffect(() => {
    setDimBackground(openModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  const handleExpirePromo = () => {
    const payload = { promoId: promo.promoId };
    expirePromo({ payload })
      .unwrap()
      .then(() => {
        setDimBackground(false);
        setOpenModal(false);
      })
      .catch((err) => {
        console.log('err', err);
        setErrorMsg(err.data.error);
      });
  };

  return (
    <Modal
      show={openModal}
      size="xl"
      onClose={() => {
        setDimBackground(false);
        setOpenModal(false);
      }}
      popup
    >
      <Modal.Header className="text-darkGold">Expire Promo</Modal.Header>
      <Modal.Body>
        {isLoading && <Loading />}
        <div className="text-center">
          {errorMsg && (
            <Alert color="failure" icon={HiInformationCircle} className="my-4">
              {errorMsg}
            </Alert>
          )}
          <span className="flex flex-col gap-1">
            <p className=" text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to expire
            </p>
            <p className="text-success">
              {promo?.title} / {promo?.promoId}?
            </p>
            <Alert color="warning" className="my-4">
              <p className="text-xs ">
                This action will set promo status to expired and discounts from
                participating products will be removed.
              </p>
            </Alert>
          </span>
          <div className="flex justify-center  my-6">
            <Button color="success" onClick={handleExpirePromo}>
              Yes, I'm sure
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ExpirePromoModal;
