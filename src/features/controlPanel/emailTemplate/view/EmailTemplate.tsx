import { useEffect, useState } from 'react';
import Editor from '../components/EditorWithUseQuill';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../../redux/services/global.slice';
import Loading from '../../../../lib/Loading';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import EmailTemplateVariables from '../components/EmailTemplateVariables';
import { useParams } from 'react-router-dom';
import { emailTemplatesOptions } from '../../../../utils/data';

const EmailTemplate = () => {
  const { name } = useParams<{ name: string }>();
  const selectedTemplate = emailTemplatesOptions.find(
    (template) => template.name === name,
  );
  const token = useSelector(globalSelectors.selectAuthToken);
  const [error, setError] = useState<string>('');
  const [subject, setSubject] = useState(selectedTemplate?.defaultSubject);
  const [refresh, setRefresh] = useState(false);

  const [body, setBody] = useState('');

  const getEmailTemplateQuery = zeapApiSlice.useGetEmailTemplateQuery(
    {
      name,
    },
    { skip: !token },
  );

  const welcomeEmail = getEmailTemplateQuery.data?.data;
  const [updateWelcomeEmail, updateWelcomeEmailStatus] =
    zeapApiSlice.useAddEmailTemplateMutation();

  const isLoading =
    getEmailTemplateQuery.isLoading || updateWelcomeEmailStatus.isLoading;
  useEffect(() => {
    if (welcomeEmail) {
      if (welcomeEmail?.body) {
        setBody(welcomeEmail?.body);
      }
      if (welcomeEmail.subject) {
        setSubject(welcomeEmail?.subject);
      }
      setRefresh(true);
    }
  }, [welcomeEmail]);

  const handleChange = (val: string) => {
    setBody(val);
  };

  const save = () => {
    const payload = {
      name,
      body,
      subject,
    };
    updateWelcomeEmail({ payload })
      .unwrap()
      .catch((err) => {
        setError(err.data.error);
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          {' '}
          <h1 className="text-xl md:text-2xltext-dark">
            {selectedTemplate?.title}
          </h1>
        </div>
        <EmailTemplateVariables />
      </div>

      <Alert color="info">
        <div className="flex flex-col gap-2">
          <span>{selectedTemplate?.description}</span>
        </div>
      </Alert>
      {isLoading && <Loading />}
      {error && <Alert color="failure">Error - {error}</Alert>}
      <div className="w-full  ">
        <Label>Subject</Label>
        <TextInput
          className="dark:text-slate-900"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
        />
      </div>
      <div className="w-full  p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8  dark:border-gray-700 ">
        <Editor
          placeholder={'Write something...'}
          value={body}
          onChange={handleChange}
          refresh={refresh}
        />
      </div>
      <Button
        disabled={isLoading || !token}
        color="success"
        className="mt-6"
        onClick={save}
      >
        Save
      </Button>
    </div>
  );
};

export default EmailTemplate;
