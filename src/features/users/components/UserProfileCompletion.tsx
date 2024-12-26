import { UserInterface } from '../../../interface/interface';
import { capitalizeFirstLetter } from '../../../utils/helpers';

const fields: string[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'address',
  'imageUrl',
  'region',
  'country',
];

const UserProfileCompletion = ({ user }: { user: UserInterface }) => {
  const completeFields = fields.filter((field) => user[field]);
  const progress = (completeFields.length / fields.length) * 100;
  return (
    <div className="flex flex-col">
      {/*<!-- Component: Progress bar 50% with trailing label --> */}
      <div className="flex gap-2">
        <label
          id="p02e-label"
          className="order-2 mb-0 text-center text-xs text-slate-500 "
        >
          <span className="sr-only">
            {capitalizeFirstLetter(user?.firstName)}{' '}
            {capitalizeFirstLetter(user?.lastName)}'s profile completion
          </span>{' '}
          {progress}%
        </label>
        <progress
          id={user?.userId}
          max="100"
          value={progress}
          className="block w-100% overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
        >
          {progress}%
        </progress>
      </div>
      {/*<!-- End Progress bar 50% with trailing label --> */}
      <span className=" w-full text-xs text-slate-500">
        {' '}
        Core Fields Profile Completion
      </span>
    </div>
  );
};

export default UserProfileCompletion;
