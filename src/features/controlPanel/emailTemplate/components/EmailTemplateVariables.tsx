import { Alert, Button, Modal } from 'flowbite-react';
import { useState } from 'react';

const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-auto ',
  },
};
// const variables = [
//   'firstName',
//   'lastName',
//   'email',
//   'phoneNumber',
//   'shopName',
//   'orderId',
//   'orderPoints',
// ];
const emailVariables = [
  {
    name: 'firstName',
    description: 'First Name of the User',
  },
  {
    name: 'lastName',
    description: 'Last Name of the User',
  },
  {
    name: 'email',
    description: 'Email of the User',
  },
  {
    name: 'phoneNumber',
    description: 'Phone Number of the User',
  },
  {
    name: 'shopName',
    description: 'Name of the Shop',
  },
  {
    name: 'orderId',
    description: 'Order ID',
  },
  {
    name: 'orderPoints',
    description: 'Points awarded for the Order',
  },
];

const EmailTemplateVariables = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setOpen(true);
        }}
        size="xs"
        color="info"
      >
        View Email Template Variables
      </Button>
      {open && (
        <Modal
          className="bg-black bg-opacity-50"
          theme={modalTheme}
          title="Delete Image"
          onClose={() => setOpen(false)}
          show={open}
        >
          <Modal.Header>
            <div className="text-sm md:text-lg font-bold">
              Email Template Variables
            </div>
          </Modal.Header>
          <Modal.Body className="w-full overflow-auto">
            <div className="my-4">
              <Alert color="info">
                <div className="flex flex-col gap-2">
                  <span>
                    Use these variables in the email template to customise the
                    email.You can use these variables in the subject and body of
                    the email.To use a variable, simply copy the variable name
                    and paste it in the email template, between square brackets.
                  </span>

                  <span className="text-warning">
                    For example, you can use the variable [firstName] to greet
                    the user by their first name.
                  </span>
                </div>
              </Alert>
            </div>
            <table className="w-full ">
              <thead>
                <tr>
                  <th className="border border-gray-200">Variable</th>
                  <th className="border border-gray-200">Description</th>
                </tr>
              </thead>
              <tbody>
                {emailVariables.map((variable) => (
                  <tr key={variable.name}>
                    <td className="border border-gray-200 p-1">
                      {variable.name}
                    </td>
                    <td className="border border-gray-200 p-1 text-info">
                      {variable.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default EmailTemplateVariables;
