import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../contexts/themeContext';
import {
  Modal,
  Textarea,
  TextInput,
  FileInput,
  Label,
  Button,
  Radio,
  Alert,
} from 'flowbite-react';
import Multiselect from 'multiselect-react-dropdown';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { PromoInterface } from '../../../interface/interface';
import { productTypeOptions } from '../../../utils/producttypes';

const AddPromo = ({
  openModal,
  setOpenModal,
  promo,
  mode = 'add',
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  promo?: PromoInterface;
  mode?: 'add' | 'edit';
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [showFileInput, setShowFileInput] = useState<boolean>(
    mode === 'add' ? true : false,
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [discount, setDiscount] = useState<{
    type: 'fixed' | 'range';
    fixedPercentage?: number;
    rangePercentage: {
      min: number;
      max: number;
    };
  }>({
    type: 'range',
    fixedPercentage: 0,
    rangePercentage: { min: 0, max: 0 },
  });

  const [startDate, setStartDate] = useState<string>('');

  const [endDate, setEndDate] = useState<string>('');
  const [permittedProductTypes, setPermittedProductTypes] =
    useState<string[]>();

  const [addpromo, addpromoStatus] = zeapApiSlice.useCreatePromoMutation();
  const [updatepromo, updatepromoStatus] =
    zeapApiSlice.useUpdatePromoMutation();
  const isLoading = addpromoStatus.isLoading || updatepromoStatus.isLoading;

  useEffect(() => {
    setDimBackground(openModal);
  }, [openModal, setDimBackground]);
  useEffect(() => {
    if (promo) {
      setTitle(promo.title);
      setSubTitle(promo.subTitle);
      setDescription(promo.description);
      setDiscount({
        ...promo.discount,
        rangePercentage: promo.discount.rangePercentage || { min: 0, max: 0 },
      });
      setStartDate(promo.startDate);
      setEndDate(promo.endDate);
      setPermittedProductTypes(promo.permittedProductTypes);
      setPreview(promo.imageUrl.link);
      setShowFileInput(false);
    }
  }, [promo]);

  useEffect(() => {
    setPermittedProductTypes(productTypeOptions.map((option) => option.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productTypeOptions]);
  useEffect(() => {
    if (selectedFile) {
      const MAX_FILE_SIZE = 1120; // 1MB

      const fileSizeKiloBytes = selectedFile?.size / 1024;

      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        setErrorMsg(
          'Selected file size is greater than 1MB. Please select a smaller file',
        );
        setTimeout(() => {
          setSelectedFile(undefined);
        }, 1000);
        return;
      }

      setErrorMsg('');
    }
  }, [selectedFile]);

  const validate = () => {
    if (!title) {
      setErrorMsg('Please enter a title');
      return false;
    }
    if (!subTitle) {
      setErrorMsg('Please enter a sub title');
      return false;
    }
    if (!description) {
      setErrorMsg('Please enter a description');
      return false;
    }

    if (!startDate) {
      setErrorMsg('Please enter a start date');
      return false;
    }
    if (!endDate) {
      setErrorMsg('Please enter an end date');
      return false;
    }
    if (!selectedFile && mode === 'add') {
      setErrorMsg('Please select an image');
      return false;
    }
    if (
      (discount?.fixedPercentage === 0 ||
        discount?.fixedPercentage === undefined) &&
      discount?.type === 'fixed'
    ) {
      setErrorMsg('Please enter a discount percentage');
      return false;
    }
    if (
      discount?.type === 'range' &&
      (discount?.rangePercentage?.min === 0 ||
        discount?.rangePercentage?.min === undefined)
    ) {
      setErrorMsg('Please enter a minimum discount percentage');
      return false;
    }
    if (
      discount?.type === 'range' &&
      (discount?.rangePercentage?.max === 0 ||
        discount?.rangePercentage?.max === undefined)
    ) {
      setErrorMsg('Please enter a maximum discount percentage');
      return false;
    }
    if (
      discount?.type === 'range' &&
      discount?.rangePercentage?.min !== undefined &&
      discount?.rangePercentage?.max !== undefined &&
      discount?.rangePercentage?.min >= discount?.rangePercentage?.max
    ) {
      setErrorMsg(
        'Minimum discount percentage must be less than maximum discount percentage',
      );
      return false;
    }

    return true;
  };

  const getCurrentDateInput = (date: string) => {
    const dateObj = new Date(date);

    // get the month in this format of 04, the same for months
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };
  const clearForm = () => {
    setTitle('');
    setSubTitle('');
    setDescription('');
    setDiscount({
      type: 'fixed',
      fixedPercentage: 0,
      rangePercentage: { min: 0, max: 0 },
    });
    setStartDate('');
    setEndDate('');
    setPermittedProductTypes(productTypeOptions.map((option) => option.value));
    setSelectedFile(undefined);
    setPreview(null);
    setErrorMsg('');
  };

  const handleSavePromo = () => {
    setErrorMsg('');
    if (!validate()) return;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('description', description);
    formData.append('discount', JSON.stringify(discount));
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append(
      'permittedProductTypes',
      JSON.stringify(permittedProductTypes),
    );
    if (selectedFile) {
      formData.append('file', selectedFile as Blob);
    }
    if (mode === 'edit' && promo?.promoId) {
      formData.append('promoId', promo?.promoId);
    }

    if (mode === 'edit') {
      updatepromo({ payload: formData })
        .unwrap()
        .then(() => {
          clearForm();
          setOpenModal(false);
        })
        .catch((e) => {
          setErrorMsg(e.data.error);
        });
      return;
    }
    addpromo({ payload: formData })
      .unwrap()
      .then(() => {
        clearForm();
        setOpenModal(false);
      })
      .catch((e) => {
        setErrorMsg(e.data.error);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClose = () => {
    clearForm();
    setOpenModal(false);
    setDimBackground(false);
  };

  return (
    <Modal show={openModal} size="2xl" onClose={() => handleClose()} popup>
      <Modal.Header className="text-darkGold">
        {mode === 'edit' ? 'Edit Promo' : 'Add Promo'}
      </Modal.Header>
      <Modal.Body>
        {isLoading && <Loading />}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col border rounded-md p-2 gap-4">
            <Label className="text-darkGold">Discount Type</Label>
            <Alert color="info" className="text-xs">
              when fixed is selected, the discount percentage will be the same
              for all products that joins the promo. when range is selected, the
              discount percentage will be randomly generated between the minimum
              and maximum discount percentage for each product that joins the
              promo.
            </Alert>
            <div className="flex gap-4">
              <Label
                className={`font-bold ${discount?.type === 'fixed' && 'text-success'}`}
              >
                Fixed
              </Label>
              <Radio
                checked={discount?.type === 'fixed'}
                onChange={() => setDiscount({ ...discount, type: 'fixed' })}
              />
              <Label
                className={`font-bold ${discount?.type === 'range' && 'text-success'}`}
              >
                Range
              </Label>
              <Radio
                checked={discount?.type === 'range'}
                onChange={() => setDiscount({ ...discount, type: 'range' })}
              />
            </div>
            {discount?.type === 'fixed' && (
              <>
                <Label className="text-darkGold">Discount Percentage</Label>
                <TextInput
                  placeholder="Discount Percentage"
                  type="number"
                  value={discount?.fixedPercentage}
                  onChange={(e) =>
                    setDiscount({
                      ...discount,
                      fixedPercentage: parseInt(e.target.value),
                    })
                  }
                />
              </>
            )}

            {discount?.type === 'range' && (
              <>
                <Label className="text-darkGold">
                  Minimum Discount Percentage
                </Label>
                <TextInput
                  placeholder="Minimum Discount Percentage"
                  type="number"
                  value={discount?.rangePercentage?.min}
                  onChange={(e) =>
                    setDiscount({
                      ...discount,
                      rangePercentage: {
                        ...discount.rangePercentage,
                        min: parseInt(e.target.value),
                      },
                    })
                  }
                />
                <Label className="text-darkGold">
                  Maximum Discount Percentage
                </Label>
                <TextInput
                  placeholder="Maximum Discount Percentage"
                  type="number"
                  value={discount?.rangePercentage?.max}
                  onChange={(e) =>
                    setDiscount({
                      ...discount,
                      rangePercentage: {
                        ...discount.rangePercentage,
                        max: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </>
            )}
          </div>
          <div className="flex flex-col border rounded-md p-2 gap-4">
            <Label className="text-darkGold">Permitted Product Types</Label>
            <Alert color="info" className="text-xs">
              Select the product types that can join the promo. If no product
              type is selected, all product types can join the promo by default.
            </Alert>
            <Multiselect
              options={productTypeOptions}
              selectedValues={permittedProductTypes?.map((type) =>
                productTypeOptions.find((option) => option.value === type),
              )}
              onSelect={(selectedList) => {
                setPermittedProductTypes(
                  selectedList.map(
                    (selected: { value: string }) => selected.value,
                  ),
                );
              }}
              onRemove={(selectedList) => {
                setPermittedProductTypes(
                  selectedList.map(
                    (selected: { value: string }) => selected.value,
                  ),
                );
              }}
              displayValue="name"
            />
          </div>
          <Label className="text-darkGold">Title</Label>
          <TextInput
            placeholder="E.g. Black Friday Sale"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label className="text-darkGold">Sub Title</Label>
          <TextInput
            placeholder="E.g. Up to 50% off"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />

          <Label className="text-darkGold">Start Date</Label>
          <TextInput
            placeholder="Start Date"
            type="date"
            value={getCurrentDateInput(startDate)}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Label className="text-darkGold">End Date</Label>
          <TextInput
            placeholder="End Date"
            type="date"
            value={getCurrentDateInput(endDate)}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="flex flex-col border rounded-md p-2 gap-4">
            <Label className="text-darkGold">Description</Label>
            <Alert color="info" className="text-xs">
              Describe the promo here. This description will be shown to sellers
              only before they decide to join the promo. Hence, it is important
              to provide a clear and concise description of the promo.
            </Alert>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col border rounded-md p-2 gap-4">
            <Label className="text-darkGold">Image</Label>
            <Alert color="info" className="text-xs">
              Upload an image that represents the promo. This image will be use
              as the background image for the promo on the market home page. The
              image should be in landscape orientation and should be at least
              1920px wide and 1080px tall.
            </Alert>
            {showFileInput && (
              <FileInput
                accept="image/*"
                id="file"
                onChange={(e) => handleFileChange(e)}
              />
            )}
            {!showFileInput && (
              <>
                {promo?.imageUrl.name && (
                  <span className="text-darkGold">{promo?.imageUrl.name}</span>
                )}
                <Button
                  size="sm"
                  onClick={() => setShowFileInput(true)}
                  color="primary"
                >
                  Change Image
                </Button>
              </>
            )}
            {preview && (
              <img src={preview} alt="preview" className="w-full h-full" />
            )}
          </div>
          {errorMsg && <Alert color="failure">{errorMsg}</Alert>}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={() => handleClose()} color="failure">
            Cancel
          </Button>
          {mode !== 'edit' && (
            <Button onClick={clearForm} color="warning">
              Reset
            </Button>
          )}

          <Button onClick={handleSavePromo} color="success">
            Save Promo
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddPromo;
