import { UserInterface } from "../interface/interface";
import firebase from "../features/Authentication/firebase";
import { getAuth, onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { globalActions, globalSelectors } from "../redux/services/global.slice";
import zeapApiSlice from "../redux/services/zeapApi.slice";




export const AuthContext = createContext<{
    isAuthenticated: boolean;
    login: (email:string, password:string) => void;
    logout: () => void;
    user: UserInterface | null | undefined;
    loginError: string | null;
    loading: boolean;
  
}>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    user: null,
    loginError: null,
    loading: false

});




export const AuthProvider = ({children} : {children : React.ReactNode}) => {
    const auth = getAuth(firebase);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(globalSelectors.selectAuthToken);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isTokenRefreshed, setIsTokenRefreshed] = useState<boolean>(false);
    const [user, setUser] = useState<UserInterface | null>();
    const [userUid, setUserUid] = useState<string>();
    const [loginError, setLoginError] = useState<string | null >(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getAuthUserQuery = zeapApiSlice.useGetAuthUserQuery(
      {
        uid : userUid as string
      },
      { skip: !userUid  || !token }
    );
    const userData = getAuthUserQuery?.data?.data

  


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
            if(currentUser) {
                setIsAuthenticated(true);
                setUserUid(currentUser?.uid);
                getToken();
            } else {
                setIsAuthenticated(false);
                setUser(null);
                dispatch(globalActions.setAuthToken(null));
                navigate("/SignIn");
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userData && userUid) {
          setUser(userData as UserInterface);
          setLoading(false);
          return
        }
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userData, userUid]);

      useEffect(() => {
        const currentUrl = localStorage.getItem("currentUrl");
        if (isAuthenticated) {
          
          getToken();
          if (currentUrl) {
            localStorage.removeItem("currentUrl");
            return navigate(currentUrl);
          }
          return navigate(
            `/`
          );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isAuthenticated]);

    const login = (email:string, password:string) => {

      try {
        setLoginError(null);
        setLoading(true);
        console.log(email + password);
  
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
            if (
              e.code === "auth/user-not-found" ||
              e.code === "auth/invalid-email" ||
              e.code === "auth/wrong-password"
            ) {
              setLoginError(" Invalid email or password");
            }
            if (e.code === "auth/network-request-failed") {
              setLoginError("loginloginError in Network connection");
            }
            setLoading(false);
            // ..
          });
  
        //  setShowSpinner(false);
      } catch (err) {
        console.log(err);
        setLoginError("loginloginError in Network connection");
        setLoading(false);
      }
    }

    const logout = () => {
        const auth = getAuth(firebase);
        auth.signOut();
        setIsAuthenticated(false);
        setUser(null);
        dispatch(globalActions.setAuthToken(null));
        navigate("/SignIn");

    }

   

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, loginError, loading}}>
            {children}
        </AuthContext.Provider>
    );
}


