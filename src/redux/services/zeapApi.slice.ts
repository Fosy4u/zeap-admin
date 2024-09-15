import { createApi } from "@reduxjs/toolkit/query/react";
import fetchBaseQuery from "./baseQuery";
import responseHandler from "./responseHandler";



export default createApi({
  reducerPath: "zeapApi",
  baseQuery: fetchBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Users", "User"],
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
        onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
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
        onQueryStarted: async (_, queryArgs) => {
          responseHandler({}, queryArgs);
        },
      }),
    }),
    })

