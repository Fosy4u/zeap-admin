

import { UserInterface } from '../../../interface/interface';
import { capitalizeFirstLetter } from '../../../utils/helpers';


const SignInInfo = ({user}:{user: UserInterface}) => {
  
   
  return (
    

<div className="w-full my-2 max-w-md p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:text-white dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold text-darkGold">Sign In Info</h5>
       
   </div>
   <div className="flow-root">
        <ul  className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div>
                        SignUp Method
                    </div>
                    <div className=' text-slate-500 dark:text-slate-300
                    '>
                        {capitalizeFirstLetter(user?.userAccessRecord?.providerId) || "N/A"}
                    </div>
                </div>
            </li>
        <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div>
                        Sign Up By
                    </div>
                    <div className=' text-slate-500 dark:text-slate-300
                    '>
                        {user?.userAccessRecord?.createdBy || "N/A"}
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div>
                        Sign Up 
                    </div>
                    <div className=' text-slate-500 dark:text-slate-300
                    '>
                        {user?.userAccessRecord?.creationTime || "N/A"}
                    </div>
                </div>
            </li>
           
            <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div>
                        Last Sign In
                    </div>
                    <div className=' text-slate-500 dark:text-slate-300
                    '>
                        {user?.userAccessRecord?.lastSignInTime || "N/A"}
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div>
                        Last Refresh
                    </div>
                    <div className=' text-slate-500 dark:text-slate-300
                    '>
                        {user?.userAccessRecord?.lastRefreshTime || "N/A"}
                    </div>
                </div>
            </li>
            
        </ul>
   </div>
</div>

  )
}

export default SignInInfo