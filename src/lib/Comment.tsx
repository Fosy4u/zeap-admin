
import { CommentInterface } from "../interface/interface"
import NoPic from '../images/user/avatar-anika-visser.png';
import { displayDate } from "../utils/helpers";
import {  useContext, useState } from "react";
import zeapApiSlice from "../redux/services/zeapApi.slice";
import Loading from "./Loading";
import { AuthContext } from "../contexts/authContext";



const Comment = ({comment}:{
    comment : CommentInterface
}) => {
   const {user} = useContext(AuthContext)
   const commentedByAuthUser = String(user?._id) === String(comment?.commentBy?._id)
   const [showActions, setShowActions] = useState(false)
   const [edit, setEdit] = useState(false)
   const [updateComment, updateCommentStatus] = zeapApiSlice.useUpdateCommentMutation();
   const [deleteComment, deleteCommentStatus] = zeapApiSlice.useDeleteCommentMutation();
   const [editedComment, setEditedComment] = useState<string>(comment?.comment)

  
   const updateCommentHandler = () => {
       const payload = {
           _id: comment?._id,
           comment : editedComment
       }
       updateComment({payload}).unwrap()
       .then(() => {
           setEditedComment(comment?.comment)
             setEdit(!edit)
             setShowActions(!showActions)
       }).catch((err) => {
           console.log("err", err)
       }
       )
   }

   const deleteCommentHandler = () => {
      const payload = {
             _id: comment?._id
      }
         deleteComment({payload}).unwrap()
         .then(() => {
           setShowActions(!showActions)
         }).catch((err) => {
            console.log("err", err)
         }
         )
   }

 
  return (
    
<div className="flex items-start gap-2.5" key={comment?._id}>
   {(updateCommentStatus.isLoading || deleteCommentStatus?.isLoading) && <Loading />}
   <img className="w-8 h-8 rounded-full" src={comment?.commentBy?.imageUrl?.link || NoPic} alt="commentBy" />
   {!edit && (
      <><div className="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-blue-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
         <span className="text-sm font-semibold ">{comment?.commentBy?.displayName}</span>
         <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{displayDate(comment?.createdAt)}</span>
      </div>
      <p className="text-sm font-normal py-2.5 text-slate-600 ">{comment?.comment}</p>
      {comment?.createdAt !== comment?.updatedAt && <span className="text-xs font-normal text-black w-fit bg-warning ">Edited {displayDate(comment?.updatedAt)}</span>}
   </div>
   {(!showActions && commentedByAuthUser) && (
   <button 
   onClick={() => setShowActions(!showActions)}
   id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 border bg-blue-100 border-darkGold rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
      <svg className="w-4 h-4 text-black"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
         <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
      </svg>
   </button>)}  
   </>
)}
   {edit && (
   <div className="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-blue-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
         <span className="text-sm font-semibold ">{comment?.commentBy?.displayName}</span>
         <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{displayDate(comment?.createdAt)}</span>
      </div>
      <textarea className="w-full h-20 p-2 text-sm border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600" 
      value={editedComment || ""}
      onChange={(e) => setEditedComment(e.target.value)}
       />
      <div className="flex mt-2 gap-2">
      <button
      onClick={() => updateCommentHandler()}
       className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-darkGold rounded-md hover:bg-opacity-90">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
         </svg>
         Save
      </button>
      <button
      onClick={() => {setEdit(!edit); setEditedComment(comment?.comment); setShowActions(!showActions)}}
       className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-danger rounded-md hover:bg-opacity-90">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
         </svg>
         Cancel
      </button>
      </div>
   </div>)}
   {showActions && !edit && (
   <div id="dropdownDots" className="z-10  bg-white  rounded-lg shadow w-40">
      <div className="flex flex-end m-1 justify-end">
        

      <span
         onClick={() => setShowActions(!showActions)}
          className=" text-darkGold cursor-pointer block px-2 py-1 text-xs text-end    border w-fit rounded-full dark:border-gray-600"
         >
            x
         </span>
      </div>
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 " aria-labelledby="dropdownMenuIconButton">
        
     
         <li className="block px-4 py-2 hover:text-darkGold cursor-pointer"
         onClick={() => setEdit(!edit)}
         >
           Edit
         </li>
         <li
         onClick={() => deleteCommentHandler()}
          className="block px-4 py-2 hover:text-danger cursor-pointer">
              Delete
         </li>
        
      </ul>
   </div>)}
</div>

  )
}

export default Comment