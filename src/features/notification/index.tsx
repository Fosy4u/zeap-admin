import React, { ReactNode, useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../Authentication/firebase';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import 'react-toastify/dist/ReactToastify.css';
import Message from './components/Message';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import { useDispatch, useSelector } from 'react-redux';
import { globalSelectors } from '../../redux/services/global.slice';
const vapidKey = process.env.REACT_APP_FIREBASE_CLOUD_MESSAGING_PUBLIC_KEY;
const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(globalSelectors.selectAuthToken);
  const [registerPushToken] = zeapApiSlice.useRegisterPushTokenMutation();

  onMessage(messaging, (payload) => {
    // invalidate redux cache with flag notification
    dispatch(zeapApiSlice.util.invalidateTags(['Notification']));

    if (payload.notification || payload?.data) {
      console.log('Notification received. ', payload);
      toast(
        <Message
          notification={{
            image: payload?.notification?.image || payload?.data?.image || '',
            title:
              payload?.notification?.title ||
              payload?.data?.title ||
              'No Title',
            body:
              payload?.notification?.body || payload?.data?.body || 'No Body',
          }}
        />,
      );
    }
  });
  useEffect(() => {
    if (!token) return;
    async function requestPermission() {
      //requesting permission using Notification API
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const pushToken = await getToken(messaging, {
          vapidKey,
        });

        const payload = {
          pushToken,
          isAdminPanel: true,
        };
        registerPushToken({ payload })
          .unwrap()
          .then(() => {
            console.log('Push token registered and saved to server');
          })
          .catch((err) => {
            console.error('Error while registering push token', err);
          });
      } else if (permission === 'denied') {
        //notifications are blocked
        console.log('Notifications are blocked');
      }
    }
    requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default NotificationProvider;
