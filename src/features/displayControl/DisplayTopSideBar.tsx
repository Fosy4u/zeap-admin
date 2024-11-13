import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

const noNavLinks = ['/signIn', '/SignIn', '/404', '/404/'];
const DisplayTopSideBar = ({ children }: { children: ReactNode }) => {
  const location = useLocation().pathname;

  return noNavLinks.includes(location) ? (
    <div className="bg-lightGold"> {children}</div>
  ) : (
    <div>
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
};

export default DisplayTopSideBar;
