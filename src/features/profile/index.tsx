
import CoverOne from '../../images/logo/cover.png';
import NoPic from '../../images/user/avatar-anika-visser.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import EditProfile from './EditProfile';


const MyProfile = () => {
    const { user} = useContext(AuthContext);
   

    
  return <><div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="relative z-20 h-35 md:h-65">
    <img
      src={CoverOne}
      alt="profile cover"
      className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
    />
    <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
        <EditProfile />
      {/* <label
        htmlFor="cover"
        className="flex cursor-pointer items-center justify-center gap-2 rounded bg-lightGold py-1 px-2 text-sm font-medium text-black hover:bg-opacity-90 xsm:px-4"
      >
        
        
        <span>Edit Profile</span>
      </label> */}
    </div>
  </div>
  <div className=" h-screen px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
    <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
      <div className="relative drop-shadow-2">
        <img src={ user?.imageUrl?.link || NoPic} alt="profile" />
        <label
          htmlFor="profile"
          className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
        >
          <svg
            className="fill-current"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
              fill=""
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
              fill=""
            />
          </svg>
          <input
            type="file"
            name="profile"
            id="profile"
            className="sr-only"
          />
        </label>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
        {user?.firstName} {user?.lastName}
      </h3>
      <p className="font-medium">{user?.role || "Administrator"}</p>

      <div className="flex items-center justify-center gap-1.5 mt-2">
        {user?.address && <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

     <p className="font-medium">{user?.address},</p></>}
      {user?.region && <p className="font-medium">{user?.region},</p>}
      <p className="font-medium">{user?.country}</p>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2">
            {user?.phoneNumber && <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>

            <p className="font-medium">{user?.phoneNumber}</p></>}
            </div>
     
      
     
    </div>
  </div>
</div>
</>;
}

export default MyProfile;