import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const PasswordResetApi = createApi({
  reducerPath: "PasswordResetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://mighty-thicket-88919.herokuapp.com/api/`,
  }),
  tagTypes: ["GetResetPassword"],
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/authentication/request-reset-password/v1/",
        method: "post",
        body: {
          email: `${data.email}`,
        },
      }),
      invalidatesTags: ["GetResetPassword"],
    }),
    resetPin: builder.mutation({
      query: (data) => ({
        url: "/authentication/request-wallet-reset-password/v1/",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["GetResetPassword"],
    }),
    
    validateWalletPinReset: builder.query({
      query: (data) => ({
        url:
        `/authentication/wallet-forgot-password/${data.uidb64}/${data.token}/`,
        
        // `/authentication/password-reset/${data.uidb64}/${data.token}/v1/`,
        method: "get",
      }),
    }),

    validateResetPassword: builder.query({
      query: (data) => ({
        url:
        `/authentication/forgot-password/${data.uidb64}/${data.token}/`,
        
        // `/authentication/password-reset/${data.uidb64}/${data.token}/v1/`,
        method: "get",
      }),
    }),

    walletPinResetComplete: builder.mutation({
      query: (data) => ({
        url: "/authentication/wallet-password-reset-complete/v1/",
        method: "put",
        body: data,
      }),
    }),
    
    passwordResetComplete: builder.mutation({
      query: (data) => ({
        url: "/authentication/password-reset-complete/v1/",
        method: "put",
        body: data,
      }),
    }),
  }),
});

export const {
  useResetPasswordMutation,
  useResetPinMutation,
  useValidateResetPasswordQuery,  
  useValidateWalletPinResetQuery,
  usePasswordResetCompleteMutation,
  useWalletPinResetCompleteMutation,
} =   PasswordResetApi;

