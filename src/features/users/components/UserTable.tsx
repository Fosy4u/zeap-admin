import { UserInterface } from "../../../interface/interface"
import NoPic from '../../../images/user/avatar-anika-visser.png';
import { useNavigate } from "react-router-dom";

const UserTable = ({users}:{users : UserInterface[] 

}) => {
    const navigate = useNavigate()
  return (
   <div className="mt-5 bg-white dark:bg-boxdark dark:text-white">
<table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
  <tbody>
    <tr>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Name</th>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Email</th>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Phone</th>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Vendor</th>
      <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Disabled</th>
    </tr>
   
    {users?.map((user: UserInterface) => (
      <tr 
onClick={() => navigate(`/users/${user?._id}`)}
      key={user?._id} className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none cursor-pointer hover:bg-darkGold">
      <td data-th="Name" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500  ">
        <div className="flex items-center">
          <img src={user?.imageUrl?.link || NoPic} alt="profile" className="w-8 h-8 rounded-full" />
          <span className="ml-3">{user?.firstName} {user?.lastName}</span>
        </div>
      </td>
      <td data-th="Email" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500  ">{user?.email}</td>
      <td data-th="Phone" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500  ">{user?.phoneNumber}</td>
      <td data-th="Vendor" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500  ">{user?.isVendor? "Yes": "No"}</td>
      <td data-th="Disabled" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500  ">{user?.disabled? "Yes": "No"}</td>
    </tr>
    ))}
  </tbody>
</table>
</div>
 
 

 
  )
}

export default UserTable