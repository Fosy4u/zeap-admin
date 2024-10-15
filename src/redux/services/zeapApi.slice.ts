import { createApi } from "@reduxjs/toolkit/query/react";
import fetchBaseQuery from "./baseQuery";
import responseHandler from "./responseHandler";



export default createApi({
  reducerPath: "zeapApi",
  baseQuery: fetchBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Users", "User","Comment", "Shops"],
  endpoints: (builder) => ({
    getUser: builder.query({
        query: (arg) => {
          const { userId } = arg;
          return {
            url: `user/`,
            params: { userId },
          };
        },
        providesTags: [ "User"],
        onQueryStarted: async (_, queryArgs) => {
          responseHandler({}, queryArgs);
        },
      }),
      getAuthUser: builder.query({
        query: (arg) => {
          const { uid } = arg;
          return {
            url: `userByUid/`,
            params: { uid },
          };
        },
        providesTags: ["User"],
        onQueryStarted: async (_, queryArgs) => {
          responseHandler({}, queryArgs);
        },
      }),
      getUsers: builder.query({
        query: () => {
          return {
            url: `users/`,
          };
        },
        providesTags: ["Users"],
        onQueryStarted: async (_, queryArgs) => {
          responseHandler({}, queryArgs);
        },
      }),
      createUser: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `user/create`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Users"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "User Successfully Created",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      updateUser: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `user/update`,
            method: "PUT",
            body: payload,
            params:{_id : payload._id}
          };
        },
        invalidatesTags: ["User"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
          responseHandler({
            success: "User Successfully Updated",
            successHandler,
            errorHandler,
          }, queryArgs);
        },
      }),
      verifyOtp: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `user/verifyUserOTP`,
            method: "PUT",
            body: payload,
         
          };
        },
        invalidatesTags: ["User"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "User Phone Number Verified",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      disableUser: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `user/delete`,
            method: "PUT",
            body: payload,
         
          };
        },
        invalidatesTags: ["User"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "User Successfully Disabled",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      enableUser: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `user/restore`,
            method: "PUT",
            body: payload,
         
          };
        },
        invalidatesTags: ["User"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "User Successfully Enabled",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      sendOTPToUser: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `user/sendOTPToUser`,
            method: "PUT",
            body: payload,
         
          };
        },
        invalidatesTags: ["User"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "OTP Sent to your phone number",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      getUserComments: builder.query({
        query: (arg) => {
          const { userId } = arg;
          return {
            url: `comment/user/`,
            params: { userId },
          };
        },
        providesTags: [ "User", "Comment"],
        onQueryStarted: async (_, queryArgs) => {
          responseHandler({}, queryArgs);
        },
      }),
      UpdateComment: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `comment/update`,
            method: "PUT",
            body: payload,
         
          };
        },
        invalidatesTags: ["Comment"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "Comment Successfully Updated",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      deleteComment: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `comment/delete`,
            method: "PUT",
            body: payload,
         
          };
        },
        invalidatesTags: ["Comment"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "Comment Successfully Deleted",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      createComment: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `comment/create`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Comment"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "Comment Successfully Created",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      createShop: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `shop/create`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Shops"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "Shop Successfully Created",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      getShops: builder.query({
        query: () => {
          return {
            url: `shops/`,
          };
        },
        providesTags: ["Shops"],
        onQueryStarted: async (_, queryArgs) => {
          responseHandler({}, queryArgs);
        },
      }),
      getShop: builder.query({
        query: (arg) => {
          const { shopId } = arg;
          return {
            url: `shop/`,
            params: { shopId },
          };
        },
        providesTags: ["Shops"],
        onQueryStarted: async (_, queryArgs) => {
          responseHandler({}, queryArgs);
        },
      }),
      updateShop: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `shop/update`,
            method: "PUT",
            body: payload,
            params:{_id : payload._id}
          };
        },
        invalidatesTags: ["Shops"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
          responseHandler({
            success: "Shop Successfully Updated",
            successHandler,
            errorHandler,
          }, queryArgs);
        },
      }),
      deleteShop: builder.mutation({
        query: (arg) => {
          const { payload } = arg;
          return {
            url: `shop/delete`,
            method: "PUT",
            body: payload,
         
          };
        },
        invalidatesTags: ["Shops"],
        onQueryStarted: async ({ successHandler, errorHandler}, queryArgs) => {
         
          responseHandler(
            {
              success: "Shop Successfully Deleted",
              successHandler,
              errorHandler,
            },
            queryArgs
          );
        },
      }),
      
    }),
    })

