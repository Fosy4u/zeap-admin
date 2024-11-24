import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { capitalizeFirstLetter, getStatusColor } from '../../../utils/helpers';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../../lib/Loading';
import { Alert, Badge, Button, Drawer, Modal, TextInput } from 'flowbite-react';
import { ProductInterface } from '../../../interface/interface';
import { ThemeContext } from '../../../contexts/themeContext';

const ModalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-99999 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full opacity-100',
  },
  content: {
    base: 'flex h-full items-center w-full p-4 md:h-auto',
    inner:
      'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700',
  },
};

const drawerTheme = {
  root: {
    base: 'fixed z-99999 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800',

    position: {
      bottom: {
        on: 'bottom-0  right-0 w-100 md:w-[40vw] transform-none',
        off: 'bottom-0 left-0 right-0 w-full translate-y-full',
      },
    },
  },
};

const statusList = [
  {
    status: 'draft',
    description:
      'The product will be on draft status and can be edited until you submit it for review',
  },
  {
    status: 'live',
    description: 'The product will be live and visible to customers',
  },
  {
    status: 'under review',
    description: 'The product will be under review by the admin',
  },

  {
    status: 'rejected',
    description: 'The product will be rejected with reasons',
  },
];

const ProductStatus = ({
  open,
  close,
  product,
}: {
  open: boolean;
  close: () => void;
  product: ProductInterface;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [rejectionReasons, setRejectionReasons] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [changeStatus, changeStatusStatus] =
    zeapApiSlice.useSetProductStatusMutation();
  const isLoading = changeStatusStatus.isLoading;
  useEffect(() => {
    if (product) {
      setStatus(product.status);
      if (product.status === 'rejected') {
        setRejectionReasons(product?.rejectionReasons);
      }
    }
  }, [product]);
  useEffect(
    () => {
      setDimBackground(openModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal],
  );
  const handleChangeStatus = () => {
    const payload = {
      productId: product?.productId,
      status,
      rejectionReasons,
    };
    changeStatus({ payload })
      .unwrap()
      .then(() => {
        setDimBackground(false);
        close();
      })
      .catch((err) => {
        setErrorMsg(err?.data?.error);
      });
  };
  console.log(handleChangeStatus);
  return (
    <Drawer
      open={open}
      onClose={close}
      position="bottom"
      edge
      theme={drawerTheme}
    >
      <Drawer.Header
        title={`Current Status : ${product?.status}`}
        titleIcon={() => <></>}
      />
      <Drawer.Items>
        {changeStatusStatus?.isLoading && <Loading />}
        <div className="w-full  p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col space-y-4">
            {statusList.map((statusEnum) => (
              <div
                key={statusEnum?.status}
                className={`flex items-center justify-between p-4 border ${status === statusEnum?.status || status === 'deleted' ? 'border-success border-2 pointer-events-none opacity-40' : 'border-gray-200'} rounded-lg cursor-pointer dark:border-gray-700 hover:bg-darkGold dark:hover:bg-gray-700`}
                onClick={() => {
                  setStatus(statusEnum?.status);
                  setErrorMsg('');
                  setOpenModal(true);
                }}
              >
                <div className="flex flex-col  space-x-4">
                  <span>
                    <Badge
                      className="w-fit"
                      color={getStatusColor(statusEnum?.status)}
                    >
                      {capitalizeFirstLetter(statusEnum?.status)}
                    </Badge>
                  </span>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {statusEnum?.description}
                  </div>
                </div>
                {status === statusEnum?.status && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
          {/* <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
              color="primary"
              disabled={status === product?.status}
            >
              Change Status
            </Button>
          </div> */}
        </div>
        <Modal
          //   size="7xl"
          theme={ModalTheme}
          show={openModal}
          onClose={() => {
            setOpenModal(false);
            setErrorMsg('');
            setStatus(product?.status);
          }}
        >
          <Modal.Header>{`Write a review`}</Modal.Header>
          <Modal.Body>
            {isLoading && <Loading />}
            {errorMsg && (
              <Alert color="failure" className="mb-4">
                {errorMsg}
              </Alert>
            )}
            <div className="flex flex-col">
              <p className="text-gray-500 dark:text-gray-400">
                Are you sure you want to change the status to {status}?
              </p>

              {status === 'rejected' && (
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      Please provide resaons for rejection
                    </p>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col gap-2">
                        {rejectionReasons.map((reason, index) => (
                          <div key={index}>
                            <span>Reason {index + 1}</span>
                            <span className="flex gap-1 w-full items-center">
                              <TextInput
                                value={reason}
                                onChange={(e) => {
                                  const newReasons = [...rejectionReasons];
                                  newReasons[index] = e.target.value;
                                  setRejectionReasons(newReasons);
                                }}
                                className="w-full"
                              />
                              <span
                                onClick={() => {
                                  setRejectionReasons(
                                    rejectionReasons.filter(
                                      (_, i) => i !== index,
                                    ),
                                  );
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6 text-danger"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </span>
                            </span>
                          </div>
                        ))}
                        <Button
                          onClick={() => {
                            setRejectionReasons([...rejectionReasons, '']);
                          }}
                          color="primary"
                        >
                          Add Reason
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleChangeStatus}
                color="primary"
                disabled={
                  isLoading ||
                  (status === 'rejected' &&
                    (rejectionReasons.length === 0 ||
                      rejectionReasons[rejectionReasons.length - 1] === ''))
                }
              >
                Change Status
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Drawer.Items>
    </Drawer>
  );
};

export default ProductStatus;
