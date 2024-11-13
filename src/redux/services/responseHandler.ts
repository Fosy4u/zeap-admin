// success and error messages get passed through from the slice, via onQueryStarted for each call
// you want it on.

import { AppDispatch } from '../store/store';
import { globalActions } from './global.slice';

// responseHandler options:
// 1. to pass through a specific success message, pass through an object of {success: 'message'}
// 2. to pass through a specific error message, pass through an object of {error: 'message'}
// 3. to override the success behaviour, ie. show toast with success message, pass through a function of {successHandler}
// 4. to override the error behaviour, ie. show toast with error message, pass through a function of {errorHandler}
// successHandler and errorHandler are callback functions that then gets defined where you're making the api call
// this is commonly done when we want to show the error message as a banner in the modal, and not a toast
const expiredTokenMessage = 'auth/id-token-expired';
const responseHandler = async (
  {
    success,
    successHandler,
    error,
    errorHandler,
  }: {
    success?: string;
    successHandler?: Function;
    error?: any;
    errorHandler?: Function;
  },
  {
    dispatch,
    queryFulfilled,
  }: {
    dispatch: AppDispatch;
    queryFulfilled: Promise<any>;
  },
) => {
  let response;

  try {
    // attempts queryFulfilled to trigger the catch
    const done = await queryFulfilled;
    const { data } = done;
    const version = done.meta.response.headers.get('f-version');
    // save the version number to the local storage if different from the one in the local storage
    if (version) {
      const localVersion = localStorage.getItem('version');
      if (localVersion !== version) {
        localStorage.setItem('version', version);
      }
    }

    response = data;
    const responseError = response?.error?.code;

    if (responseError === expiredTokenMessage) {
      return dispatch(
        globalActions.addToast({
          title: 'Login session expired. Please login again.',
          message: responseError,
          variant: 'error',
        }),
      );
    }
    if (successHandler) {
      successHandler(success, data);
    } else if (success) {
      dispatch(
        globalActions.addToast({
          title: data?.message || success,
          message: 'Request Successful',
        }),
      );
    }
  } catch (e: any) {
    if (errorHandler) {
      const errorToDisplay =
        error ||
        error?.data?.error ||
        e?.error?.data?.header ||
        'Something went wrong...';

      errorHandler(errorToDisplay);
    } else if (error) {
      dispatch(
        globalActions.addToast({
          title: error,
          message: 'Request Failed',
          variant: 'error',
        }),
      );
    } else {
      const errorTitle = e?.error?.status;

      dispatch(
        globalActions.addToast({
          title:
            typeof errorTitle === 'string'
              ? error?.data?.error || errorTitle
              : 'Something went wrong...',
          message:
            errorTitle !== 500
              ? error?.data?.error || e?.error?.data?.error
              : 'Something went wrong...',
          variant: 'error',
        }),
      );
    }
  }

  return response;
};

export default responseHandler;
