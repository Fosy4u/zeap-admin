import { useState } from 'react';
import { EmailListInterface } from '../../../interface/interface';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import { Modal } from 'flowbite-react';

const EmailTable = ({ emailList }: { emailList: EmailListInterface[] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailListInterface | null>(
    null,
  );
  const [removeEmailFromList, removeEmailFromListStatus] =
    zeapApiSlice.useRemoveEmailFromListMutation();

  const handleRemoveEmail = (email: string, subscribedTo: string) => {
    const payload = {
      email,
      subscribedTo,
    };
    removeEmailFromList({ payload })
      .unwrap()
      .then(() => {
        console.log('Email removed from list');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  return (
    <div>
      <h2>Email List</h2>
      <div className="mt-5 bg-white dark:bg-boxdark dark:text-white w-full overflow-x-auto">
        <table
          className="w-full text-left border border-separate rounded border-slate-200"
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Joined
              </th>
              <th
                scope="col"
                className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Email
              </th>
              <th
                scope="col"
                className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Source
              </th>
              <th
                scope="col"
                className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Subscribed To
              </th>
            </tr>
            {emailList?.map((email: EmailListInterface) => (
              <tr
                key={email?._id}
                className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 cursor-pointer hover:bg-slate-100"
              >
                <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                  {new Date(email.createdAt).toLocaleDateString()}{' '}
                </td>
                <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                  {email.email}
                </td>
                <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                  {capitalizeFirstLetter(email.source)}
                </td>
                <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                  {capitalizeFirstLetter(email.subscribedTo)}
                </td>
                <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedEmail(email);
                    }}
                    className="flex w-fit h-fit items-center flex-end gap-1 px-3 py-1.5 text-sm font-medium text-white bg-danger rounded-md hover:bg-opacity-90"
                  >
                    {removeEmailFromListStatus?.isLoading
                      ? 'Removing...'
                      : 'Remove'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove{' '}
              <span className="font-bold">{selectedEmail?.email}</span> from{' '}
              <span className="font-bold">{selectedEmail?.subscribedTo}</span>{' '}
              list?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
              >
                No, cancel
              </button>
              <button
                onClick={() => {
                  if (selectedEmail) {
                    handleRemoveEmail(
                      selectedEmail.email,
                      selectedEmail.subscribedTo,
                    );
                    setOpenModal(false);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-danger rounded-lg border border-gray-200 hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-gray-200"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmailTable;
