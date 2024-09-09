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
    }),
    })

