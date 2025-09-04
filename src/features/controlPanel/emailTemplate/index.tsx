import { NavLink } from 'react-router-dom';
import { emailTemplatesOptions } from '../../../utils/data';

type templateType = {
  name: string;
  title: string;
  description: string;
  defaultSubject: string;
};

const EmailTemplates = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          {' '}
          <h1 className="text-xl md:text-2xltext-dark">Email Templates</h1>
        </div>
      </div>
      <div className="flex  gap-4   flex-wrap">
        {emailTemplatesOptions.map((template: templateType) => (
          <NavLink
            key={template.name}
            to={`/control-panel/email-template/${template.name}`}
            className="shadow-md hover:shadow-success p-4 items-center text-center  flex rounded-full  flex-col w-full gap-4 items-center cursor-pointer dark:bg-slate-800"
          >
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="font-semibold ">{template.title}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplates;
