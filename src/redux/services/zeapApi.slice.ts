import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBaseQuery from './baseQuery';
import responseHandler from './responseHandler';

export default createApi({
  reducerPath: 'zeapApi',
  baseQuery: fetchBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: [
    'Users',
    'User',
    'Comment',
    'Shops',
    'Shop',
    'Products',
    'Product',
  ],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (arg) => {
        const { userId } = arg;
        return {
          url: `user/`,
          params: { userId },
        };
      },
      providesTags: ['User'],
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
      providesTags: ['User'],
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
      providesTags: ['Users'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    createUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/create`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['Users'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'User Successfully Created',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    updateUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/update`,
          method: 'PUT',
          body: payload,
          params: { _id: payload._id },
        };
      },
      invalidatesTags: ['User'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'User Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    updateUserProfilePic: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/update/profilePic`,
          method: 'PUT',
          body: payload,
          params: { _id: payload._id },
        };
      },
      invalidatesTags: ['User'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'User Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    verifyOtp: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/verifyUserOTP`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['User'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'User Phone Number Verified',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    disableUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/delete`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['User'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'User Successfully Disabled',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    enableUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/restore`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['User'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'User Successfully Enabled',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    sendOTPToUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/sendOTPToUser`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['User'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'OTP Sent to your phone number',
            successHandler,
            errorHandler,
          },
          queryArgs,
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
      providesTags: ['User', 'Comment'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getShopComments: builder.query({
      query: (arg) => {
        const { shopId } = arg;
        return {
          url: `comment/shop/`,
          params: { shopId },
        };
      },
      providesTags: ['Shops', 'Shop', 'Comment'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    UpdateComment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `comment/update`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Comment'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Comment Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    deleteComment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `comment/delete`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Comment'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Comment Successfully Deleted',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    createComment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `comment/create`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['Comment'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Comment Successfully Created',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    createShop: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `shop/create`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['Shops'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Shop Successfully Created',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    getShops: builder.query({
      query: (arg) => {
        return {
          url: `shops/`,
          params: { ...arg },
        };
      },
      providesTags: ['Shops'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getShop: builder.query({
      query: (arg) => {
        return {
          url: `shop/`,
          params: { ...arg },
        };
      },
      providesTags: ['Shops', 'Shop'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    updateShop: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `shop/update`,
          method: 'PUT',
          body: payload,
          params: { _id: payload._id },
        };
      },
      invalidatesTags: ['Shops', 'Shop'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Shop Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    disableShop: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `shop/delete`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Shops', 'Shop'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Shop Successfully Deleted',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    enableShop: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `shop/restore`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Shops', 'Shop'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Shop Successfully Enabled',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    getProductsOptions: builder.query({
      query: (arg) => {
        return {
          url: `products/options`,
          params: { ...arg },
        };
      },
      providesTags: ['Products'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/`,
          params: { ...arg },
        };
      },
      providesTags: ['Products'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getShopDraftProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/shop/draft`,
          params: { ...arg },
        };
      },
      providesTags: ['Products'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getProduct: builder.query({
      query: (arg) => {
        return {
          url: `product/`,
          params: { ...arg },
        };
      },
      providesTags: ['Products', 'Product'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getProductById: builder.query({
      query: (arg) => {
        return {
          url: `product/id`,
          params: { ...arg },
        };
      },
      providesTags: ['Products', 'Product'],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    createProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/create`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['Products'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Created',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    updateProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    updateProductColorAndImages: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/addColorAndImages`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    addProductVariation: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/addProductVariation`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    editProductVariation: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/editProductVariation`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    submitProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/submitProduct`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Submitted',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    deleteProductVariation: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/deleteProductVariation`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    deleteProductColor: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/deleteProductColor`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    deleteProductImage: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/deleteProductImage`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    setProductImageAsDefault: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/setProductImageAsDefault`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    addImagesToProductColor: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/addImagesToProductColor`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Updated',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    disableProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/delete`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Deleted',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
    enableProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/restore`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Products', 'Product'],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: 'Product Successfully Enabled',
            successHandler,
            errorHandler,
          },
          queryArgs,
        );
      },
    }),
  }),
});
