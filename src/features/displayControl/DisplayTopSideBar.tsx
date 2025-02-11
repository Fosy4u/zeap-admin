import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

const noNavLinks = [
  '/signIn',
  '/SignIn',
  '/404',
  '/404/',
  '/receiptDownload',
  'signIn',
  'SignIn',
  '404',
  'receiptDownload',
];
const DisplayTopSideBar = ({ children }: { children: ReactNode }) => {
  const location = useLocation().pathname;

  return noNavLinks.includes(location) ||
    noNavLinks.includes(location.slice(1)?.split('/')[0]) ? (
    <div className="bg-lightGold"> {children}</div>
  ) : (
    <div>
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
};

export default DisplayTopSideBar;
