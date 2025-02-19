import { PromoInterface } from '../../../interface/interface';
import NoPic from '../../../images/icon/noPhoto.png';
import { Badge, Button, Label } from 'flowbite-react';
import { useState } from 'react';
import AddPromo from './AddPromo';
import { displayDate } from '../../../utils/helpers';
import { getProductTypeLabel } from '../../../utils/producttypes';
import DeletePromoModal from './DeletePromoModal';
import { NavLink } from 'react-router-dom';
import SchedulePromoModal from './SchedulePromoModal';
import SetPromoLiveModal from './SetPromoLiveModal';
import ExpirePromoModal from './ExpirePromo';

const PromoCard = ({ promo }: { promo: PromoInterface }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openScheduleModal, setOpenScheduleModal] = useState<boolean>(false);
  const [openSetLiveModal, setOpenSetLiveModal] = useState<boolean>(false);
  const [openExpireModal, setOpenExpireModal] = useState<boolean>(false);
  return (
    <div
      key={promo?.promoId}
      className="flex flex-col  my-2 p-2 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-2 flex flex-col gap-2">
          <Badge color="warning" className="text-xs">
            Small Screen Cover Image
          </Badge>
          {promo?.smallScreenImageUrl?.type === 'video' && (
            <video
              className="max-w-[20rem] h-full object-contain"
              autoPlay
              muted
              loop
              id="myVideo"
            >
              <source src={promo?.smallScreenImageUrl?.link} type="video/mp4" />
            </video>
          )}
          {promo?.smallScreenImageUrl?.type !== 'video' && (
            <img
              src={promo?.smallScreenImageUrl?.link || NoPic}
              alt={promo?.title}
              className="max-w-[20rem] h-full object-contain"
            />
          )}
          {!promo?.smallScreenImageUrl && (
            <img src={NoPic} alt={promo?.title} className="w-full max-h-100" />
          )}
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <Badge color="warning" className="text-xs">
            Large Screen Cover Image
          </Badge>
          {promo?.largeScreenImageUrl?.type === 'video' && (
            <video
              className="max-w-[20rem] h-full object-contain"
              autoPlay
              muted
              loop
              id="myVideo"
            >
              <source src={promo?.largeScreenImageUrl?.link} type="video/mp4" />
            </video>
          )}
          {promo?.largeScreenImageUrl?.type !== 'video' && (
            <img
              src={promo?.largeScreenImageUrl?.link || NoPic}
              alt={promo?.title}
              className="w-full max-h-100 object-contain"
            />
          )}
          {!promo?.largeScreenImageUrl && (
            <img src={NoPic} alt={promo?.title} className="w-full max-h-100" />
          )}
        </div>
      </div>
      <div className="flex flex-col m-2">
        <p className="text-md font-bold">{promo?.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-300">
          {promo?.subTitle}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {promo?.description}
        </p>
        <span className="flex gap-1">
          <Label color="success" className="text-md">
            Discount:
          </Label>
          <p className="text-md text-gray-500 dark:text-gray-300">
            {promo?.discount?.type}:{' '}
            {promo?.discount?.type === 'fixed'
              ? `${promo?.discount?.fixedPercentage}%`
              : `from ${promo?.discount?.rangePercentage?.min || 0}% to ${promo?.discount?.rangePercentage?.max || 0}%`}
          </p>
        </span>
        <span className="flex gap-1">
          <Label color="success" className="text-md">
            Products:
          </Label>
          <span className="flex gap-1 flex-wrap">
            {promo?.permittedProductTypes?.map((type) => (
              <Badge key={type} color="info" className="text-xs">
                {getProductTypeLabel(type)}
              </Badge>
            ))}
          </span>
        </span>
        <span className="flex gap-1 items-center">
          <Label color="success" className="text-md">
            Start Date
          </Label>
          <p className="text-sm ">{displayDate(new Date(promo?.startDate))}</p>
        </span>
        <span className="flex gap-1 items-center">
          <Label color="success" className="text-md">
            End Date
          </Label>
          <p className="text-sm ">{displayDate(new Date(promo?.endDate))}</p>
        </span>
      </div>
      <div className="flex flex-col md:flex-row  justify-between gap-1 m-2">
        <NavLink
          to={`/promo/${promo?.promoId}/products`}
          className="flex justify-end gap-2 m-2"
        >
          <Button size="xs" color="success">
            View Joined Products
          </Button>
        </NavLink>
        <div className="flex justify-end gap-2 m-2">
          {promo?.status === 'draft' && (
            <Button
              size="xs"
              onClick={() => {
                setOpenScheduleModal(true);
              }}
              color="info"
            >
              Schedule
            </Button>
          )}
          {promo?.status === 'scheduled' && (
            <Button
              size="xs"
              onClick={() => {
                setOpenSetLiveModal(true);
              }}
              color="success"
            >
              Set Live
            </Button>
          )}
          {promo?.status === 'live' && (
            <Button
              size="xs"
              onClick={() => {
                setOpenExpireModal(true);
              }}
              color="warning"
            >
              Set Expired
            </Button>
          )}
          <Button size="xs" color="primary" onClick={() => setOpen(true)}>
            Edit
          </Button>
          <Button
            size="xs"
            onClick={() => {
              setOpenDeleteModal(true);
            }}
            color="failure"
          >
            Delete
          </Button>
        </div>
      </div>
      {openDeleteModal && (
        <DeletePromoModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          promo={promo}
        />
      )}
      {openScheduleModal && (
        <SchedulePromoModal
          openModal={openScheduleModal}
          setOpenModal={setOpenScheduleModal}
          promo={promo}
        />
      )}
      {openSetLiveModal && (
        <SetPromoLiveModal
          openModal={openSetLiveModal}
          setOpenModal={setOpenSetLiveModal}
          promo={promo}
        />
      )}
      {openExpireModal && (
        <ExpirePromoModal
          openModal={openExpireModal}
          setOpenModal={setOpenExpireModal}
          promo={promo}
        />
      )}

      <AddPromo
        openModal={open}
        setOpenModal={setOpen}
        promo={promo}
        mode="edit"
      />
    </div>
  );
};

export default PromoCard;
