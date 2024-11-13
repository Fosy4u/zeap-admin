import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { CommentInterface } from '../../../interface/interface';
import Comment from '../../../lib/Comment';
import { useState } from 'react';
import Loading from '../../../lib/Loading';
import { Drawer } from 'flowbite-react';

const drawerTheme = {
  root: {
    base: 'fixed z-99999 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800',

    position: {
      bottom: {
        on: 'bottom-0  right-0 w-100 md:w-[700px] transform-none',
        off: 'bottom-0 left-0 right-0 w-full translate-y-full',
      },
    },
  },
};

const ShopComment = ({
  shopId,
  open,
  close,
}: {
  shopId: string;
  open: boolean;
  close: () => void;
}) => {
  const token = useSelector(globalSelectors.selectAuthToken);

  const [newComment, setNewComment] = useState<string>('');
  const getShopCommentsQuery = zeapApiSlice.useGetShopCommentsQuery(
    { shopId },
    {
      skip: !token || !shopId,
    },
  );
  const comments = getShopCommentsQuery?.data?.data;
  console.log('comments', comments);
  const [createComment, createCommentStatus] =
    zeapApiSlice.useCreateCommentMutation();

  const addComment = () => {
    const payload = {
      shopId,
      comment: newComment,
      type: 'shop',
    };
    createComment({ payload })
      .unwrap()
      .then(() => {
        setNewComment('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <Drawer
      open={open}
      onClose={close}
      position="bottom"
      edge
      theme={drawerTheme}
    >
      <Drawer.Header title="Comments" titleIcon={() => <></>} />
      <Drawer.Items>
        <div className="w-full  p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col  justify-between mb-4">
            <h5 className="text-xl font-bold text-darkGold">Shop Comments</h5>
            <p className="text-sm text-gray-500">(Internal use only)</p>

            <div className="flex flex-col md:items-center md:flex-row w-full justify-between  gap-2 mt-2 mb-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full flex-1 h-full p-2 text-sm border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Add Comment"
              />

              <button
                onClick={() => {
                  if (newComment) {
                    addComment();
                  }
                }}
                className="flex w-fit h-fit items-center flex-end gap-1 px-3 py-1.5 text-sm font-medium text-white bg-darkGold rounded-md hover:bg-opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Add
              </button>
            </div>
            {createCommentStatus?.isLoading && <Loading />}

            {comments &&
              comments.map((comment: CommentInterface) => (
                <div key={comment?._id} className="flex flex-col gap-2.5 mt-2">
                  <Comment comment={comment} />
                </div>
              ))}
          </div>
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default ShopComment;
