import { UserInterface } from "../../../interface/interface"
import NoPic from '../../../images/user/avatar-anika-visser.png';
import { capitalizeFirstLetter } from "../../../utils/helpers";
 import UserProfileCompletion from "./UserProfileCompletion";
import { smallScreen } from "../../../utils/screenSizes";
import SimpleModal from "../../../lib/SimpleModal";
import SignUp from "../../Authentication/SignUp";
import { useState } from "react";


const UserProfilePaper = ({user}:{user: UserInterface}) => {
    
    const [open, setOpen] = useState(false)

    const getLevel = ()=>{
        if(user?.superAdmin){
            return "Super Admin"
        }
        if(user?.isAdmin){
            return "Admin"
        }
       
        return null
    }
   
  return (
    <div>
        <>
      {/*<!-- Component: User profile card --> */}
      <div className="overflow-scroll rounded text-center text-slate-500  w-90  md:w-150 bg-slate-100 dark:bg-slate-300 ">
        {/*  <!-- Image --> */}
        <figure className="p-6 pb-0">
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full text-white">
            <img
              src={user?.imageUrl?.link || NoPic}
              alt="user name"
              title="user name"
              width="80"
              height="80"
              className="max-w-full rounded-full"
            />
          </span>
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6 ">
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">
            { capitalizeFirstLetter(user?.firstName) +" "+ capitalizeFirstLetter(user?.lastName)}
            </h3>
            {user?.role &&
            <p className=" text-slate-500">{capitalizeFirstLetter(user?.role)}</p>}
             <div className="flex overflow-scroll mt-3 items-center justify-center">
       <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-500 px-1.5 text-sm text-white mr-2">
            ID: {user?.userId}
        </span>
        <span className={`inline-flex items-center justify-center gap-1 rounded-full  px-1.5 text-sm text-white mr-2 ${user?.disabled ? "bg-danger" : "bg-success"}`}>
            {user?.disabled? "Disabled": "Active"}
        </span>
        {user?.isVendor&& <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-sm text-white mr-2">
            Vendor
        </span>}
        {getLevel()&& <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-sm text-white mr-2">
            {getLevel()}
        </span>}
        </div>
          </header>
          {getLevel() &&       <div
        className="flex w-100% items-start gap-4 rounded border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-500 mb-2"
        role="alert"
      >
       
        <svg className="w-6 h-6 text-emerald-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"/>
</svg>
    
        <p>User has access to Zeap Admin App</p>
      </div >}
               <div
        className={`flex w-100% items-start gap-4 rounded border border-emerald-100  px-4 py-3 text-sm ${user?.phoneNumberVerified ? "text-emerald-500 bg-emrald-50" : "text-black bg-danger"} mb-2`}
        role="alert"
      >
       
       <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd"/>
</svg>

    
        {user?.phoneNumberVerified ? <p>Phone number verified</p> : <p>Phone number not verified</p>}
      </div>
        </div>
        <div className=" flex justify-between p-2 items-center ">
        <div>
            <UserProfileCompletion user={user} />
        </div>
        <div>
            <button
            onClick={() => setOpen(true)}
             className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-darkGold rounded-md hover:bg-opacity-90">
            {smallScreen ? "Edit" : "Edit User"}
            </button>
        </div>
        </div>
      </div>
      {open && (<SimpleModal 
            isLoading={false}
            closeOnOutsideClick={false}
            open
            showActionButtons={false}
            headerText="Edit User" close={() => setOpen(false)}   onclick={() => {}}>

                <SignUp 
                close={() => setOpen(false)}
                user = {user}
                mode ="edit"
              
                />
            </SimpleModal>)}
    
    </>
    </div>
  )
}

export default UserProfilePaper


