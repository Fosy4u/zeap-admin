import { UserInterface } from '../interface/interface';
import { firebase } from '../features/Authentication/firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { createContext } from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions, globalSelectors } from '../redux/services/global.slice';
import zeapApiSlice from '../redux/services/zeapApi.slice';
import Loading from '../lib/Loading';

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  user: UserInterface | null | undefined;
  loginError: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<
    React.SetStateAction<UserInterface | null | undefined>
  >;
  resetPassword: (email: string) => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
  loginError: null,
  loading: false,
  setLoading: () => {},
  setUser: () => {},
  resetPassword: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation().pathname;
  const auth = getAuth(firebase);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(globalSelectors.selectAuthToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface | null>();
  const [userUid, setUserUid] = useState<string>();

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAuthUserQuery = zeapApiSlice.useGetAuthUserQuery(
    {
      uid: userUid as string,
    },
    { skip: !userUid || !token },
  );
  const userData = isAuthenticated ? getAuthUserQuery?.data?.data : null;

  const getToken = async () => {
    const token = await auth?.currentUser?.getIdToken(true);
    //4 - check if have token in the current user
    if (token) {
      dispatch(globalActions.setAuthToken(token));
    }
  };

  useEffect(() => {
    if (!isTokenRefreshed) {
      const refresh = setInterval(() => {
        setIsTokenRefreshed(!isTokenRefreshed);
        getToken();
      }, 300000);
      return () => {
        clearInterval(refresh);
      };
    }
    const refresh = setInterval(() => {
      setIsTokenRefreshed(!isTokenRefreshed);
    }, 3000);
    return () => {
      clearInterval(refresh);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTokenRefreshed]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUserUid(currentUser?.uid);
        getToken();
      } else {
        setIsAuthenticated(false);
        setUser(null);
        dispatch(globalActions.setAuthToken(null));
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
        if (!noNavLinks.includes(location.slice(1)?.split('/')[0])) {
          navigate('/SignIn');
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData && userUid) {
      if (!userData?.isAdmin && !userData?.superAdmin) {
        setLoginError('You are not authorized to access this page');
        setLoading(false);
        return navigate('/SignIn');
      }
      setUser(userData as UserInterface);
      setLoading(false);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, userUid]);

  useEffect(() => {
    const currentUrl = localStorage.getItem('currentUrl');
    const admin = user?.isAdmin || user?.superAdmin;
    if (isAuthenticated && admin) {
      getToken();
      if (currentUrl) {
        localStorage.removeItem('currentUrl');
        return navigate(currentUrl);
      }
      // return navigate(
      //   `/`
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const login = (email: string, password: string) => {
    try {
      setLoginError(null);
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const curtrentUser = userCredential.user;
          if (curtrentUser) {
            getToken();
            setIsAuthenticated(true);
            setUserUid(curtrentUser.uid);
          }
          // ...
        })
        .catch((e) => {
          console.log('error', e.code);
          if (
            e.code === 'auth/user-not-found' ||
            e.code === 'auth/invalid-email' ||
            e.code === 'auth/wrong-password' ||
            e.code === 'auth/invalid-credential'
          ) {
            setLoginError(' Invalid email or password');
          }
          if (e.code === 'auth/too-many-requests') {
            setLoginError('Too many requests, please try again later');
          }

          if (e.code === 'auth/user-disabled') {
            setLoginError('User account is disabled');
          }
          if (e.code === 'auth/network-request-failed') {
            setLoginError('loginloginError in Network connection');
          }
          setLoading(false);
          // ..
        });

      //  setShowSpinner(false);
    } catch (err) {
      console.log(err);
      setLoginError('loginloginError in Network connection');
      setLoading(false);
    }
  };

  const logout = () => {
    const auth = getAuth(firebase);
    auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
    dispatch(globalActions.setAuthToken(null));
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoginError('Password reset email sent successfully');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
        if (error.code === 'auth/user-not-found') {
          setLoginError('No user found with this email address');
        } else if (error.code === 'auth/invalid-email') {
          setLoginError('Invalid email address');
        } else {
          setLoginError('Error sending password reset email');
        }
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loginError,
        loading,
        setUser,
        setLoading,
        resetPassword,
      }}
    >
      {loading && <Loading />}

      {children}
    </AuthContext.Provider>
  );
};
