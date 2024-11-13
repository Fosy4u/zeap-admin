import { useState, useEffect, useContext } from 'react';
import { smallScreen } from '../../utils/screenSizes';
import { AuthContext } from '../../contexts/authContext';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import SimpleModal from '../../lib/SimpleModal';
import CountrySelector from '../../lib/CountrySelector';

interface ErrorInterface {
  firstName?: string;
  lastName?: string;
  address?: string;
  region?: string;
  country?: string;
  phoneNumber?: string;
}

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isShowing, setIsShowing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState<ErrorInterface>({});

  const [updateUser, UpdateUserStatus] = zeapApiSlice.useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAddress(user.address);
      setRegion(user.region);
      setCountry(user.country);
      setPhoneNumber(user.phoneNumber);
      setRole(user.role);
    }
  }, [user]);

  const validate = () => {
    let valid: boolean = true;
    let errors: ErrorInterface = {};

    if (!firstName) {
      errors.firstName = 'First Name is required';
      valid = false;
    }

    if (!lastName) {
      errors.lastName = 'Last Name is required';
      valid = false;
    }

    if (!address) {
      errors.address = 'Address is required';
      valid = false;
    }

    if (!region) {
      errors.region = 'Region is required';
      valid = false;
    }

    if (!country) {
      errors.country = 'Country is required';
      valid = false;
    }

    if (!phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
      valid = false;
    }

    setError(errors);

    return valid;
  };

  const handleUpdateUser = async () => {
    if (!validate()) return;

    const payload = {
      ...(firstName && firstName !== user?.firstName && { firstName }),
      ...(lastName && lastName !== user?.lastName && { lastName }),
      ...(address && address !== user?.address && { address }),
      ...(region && region !== user?.region && { region }),
      ...(country && country !== user?.country && { country }),
      ...(phoneNumber && phoneNumber !== user?.phoneNumber && { phoneNumber }),
      ...(role && role !== user?.role && { role }),
      _id: user?._id,
    };
    console.log(payload);
    updateUser({ payload })
      .then((data) => {
        const user = data?.data?.data;
        if (user) {
          setUser(user);
        }
        setIsShowing(false);
      })

      .catch((e) => {
        console.error(e.data);
      });
  };

  return (
    <>
      <label
        htmlFor="cover"
        onClick={() => setIsShowing(true)}
        className="flex cursor-pointer items-center justify-center gap-2 rounded bg-lightGold py-1 px-2 text-sm font-medium text-black hover:bg-opacity-90 xsm:px-4"
      >
        <span>{smallScreen ? 'Edit' : 'Edit Profile'}</span>
      </label>
      {isShowing && (
        <SimpleModal
          isLoading={UpdateUserStatus?.isLoading}
          actionText={UpdateUserStatus?.isLoading ? 'Updating...' : 'Update'}
          showActionButtons
          onclick={handleUpdateUser}
          close={() => setIsShowing(false)}
          open={isShowing}
          headerText="Edit My Profile"
        >
          <div id="content-4a" className="flex-1 overflow-scroll w-96">
            <div className="flex flex-col gap-6  mt-3 ">
              {/*                <!-- Input field --> */}
              <div className="relative">
                <input
                  id="id-b03"
                  type="email"
                  name="id-b03"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  disabled={UpdateUserStatus?.isLoading}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white  focus:border-emerald-500 focus:outline-none  disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b03"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm  peer-required:after:content-['\00a0*'] peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Your First Name
                </label>
                {error.firstName && !firstName && (
                  <span className="text-xs text-red-500">
                    {error.firstName}
                  </span>
                )}
              </div>
              {/*                <!-- Input field --> */}
              <div className="relative my-6">
                <input
                  id="id-b13"
                  type="text"
                  name="id-b13"
                  placeholder="your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  disabled={UpdateUserStatus?.isLoading}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b13"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Your Last Name
                </label>
                {error.lastName && !lastName && (
                  <span className="text-xs text-red-500">{error.lastName}</span>
                )}
              </div>
              <div className="relative my-6">
                <input
                  id="id-b13"
                  type="text"
                  name="id-b13"
                  placeholder="your address"
                  value={address}
                  onChange={(e) => setAddress(e.currentTarget.value)}
                  disabled={UpdateUserStatus?.isLoading}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b13"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Your Address
                </label>
                {error.address && !address && (
                  <span className="text-xs text-red-500">{error.address}</span>
                )}
              </div>

              <div className="relative my-6">
                <input
                  id="id-b13"
                  type="text"
                  name="id-b13"
                  placeholder="your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                  disabled={UpdateUserStatus?.isLoading}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b13"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Your Phone Number
                </label>
                {error.phoneNumber && !phoneNumber && (
                  <span className="text-xs text-red-500">
                    {error.phoneNumber}
                  </span>
                )}
              </div>

              <div className="relative my-6">
                <input
                  id="id-b13"
                  type="text"
                  name="id-b13"
                  placeholder="your role"
                  value={role}
                  onChange={(e) => setRole(e.currentTarget.value)}
                  disabled={UpdateUserStatus?.isLoading}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b13"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Your Role
                </label>
              </div>
              <CountrySelector
                country={country}
                setCountry={setCountry}
                region={region}
                setRegion={setRegion}
              />
            </div>
          </div>
        </SimpleModal>
      )}
    </>
  );
};

export default EditProfile;
