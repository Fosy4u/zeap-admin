import { useSelector } from "react-redux";
import { globalSelectors } from "../../../redux/services/global.slice";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import { CommentInterface } from "../../../interface/interface";
import Comment from "../../../lib/Comment";
import { useState } from "react";
import Loading from "../../../lib/Loading";


const UserComment = ({userId}:{
    userId: string
}) => {
    const token = useSelector(globalSelectors.selectAuthToken);

    const [newComment, setNewComment] = useState<string>("")
    const getUserCommentsQuery = zeapApiSlice.useGetUserCommentsQuery({userId},{
        skip: !token || !userId
      })
    const comments = getUserCommentsQuery?.data?.data;
    console.log("comments", comments)
    const [createComment, createCommentStatus] = zeapApiSlice.useCreateCommentMutation();
  

    const addComment = () => {
        const payload = {
            userId,
            comment: newComment,
            type: "user"
        }
        createComment({payload}).unwrap()
        .then(() => {
            setNewComment("")
        }).catch((err) => {
            console.log("err", err)
        }
        )
    }
   
  return (
    <div className="w-full  p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex flex-col  justify-between mb-4">
        <h5 className="text-xl font-bold text-darkGold">User Comments</h5>

        <div className="flex flex-col md:items-center md:flex-row w-full justify-between  gap-2 mt-2 mb-2">
   
            <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full flex-1 h-full p-2 text-sm border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Add Comment"
            />

<button
            onClick={() => {
                if(newComment){
                    addComment()
                }
            }}
            className="flex w-fit h-fit items-center flex-end gap-1 px-3 py-1.5 text-sm font-medium text-white bg-darkGold rounded-md hover:bg-opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                Add
            </button>

            </div>
            {createCommentStatus?.isLoading && <Loading />}

        {comments && comments.map ((comment : CommentInterface) => (
            <div
            key={comment?._id}
            className="flex flex-col gap-2.5 mt-2"
            >
         <Comment  comment={comment} />
            </div>
        ))}
        </div>
        </div>
  )
}

export default UserComment