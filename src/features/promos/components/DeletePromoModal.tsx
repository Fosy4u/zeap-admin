import { Alert, Button, Modal } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { ThemeContext } from '../../../contexts/themeContext';
import { HiInformationCircle } from 'react-icons/hi';
import { PromoInterface } from '../../../interface/interface';
import Loading from '../../../lib/Loading';

const DeletePromoModal = ({
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
  const [deletePromo, deletePromoStatus] =
    zeapApiSlice.useDeletePromoMutation();
  const isLoading = deletePromoStatus.isLoading;

  useEffect(() => {
    setDimBackground(openModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  const handleDeletePromo = () => {
    const payload = { promoId: promo.promoId };
    deletePromo({ payload })
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
      size="2xl"
      onClose={() => {
        setDimBackground(false);
        setOpenModal(false);
      }}
      popup
    >
      <Modal.Header className="text-danger">Delete Promo</Modal.Header>
      <Modal.Body>
        {isLoading && <Loading />}
        <div className="text-center">
          {errorMsg && (
            <Alert color="failure" icon={HiInformationCircle} className="my-4">
              {errorMsg}
            </Alert>
          )}
          <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to permanently delete {promo?.title}/
            {promo?.promoId}?
          </p>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeletePromo}>
              Yes, I'm sure
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeletePromoModal;
