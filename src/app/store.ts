import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../components/auth/auth/authSlice';
import themeReducer from './features/theme/themeSlice';
import { registerUserApi } from '../components/auth/auth/apiRegisterUserSlice';
import { usersApi } from './api/apiAuthorizationSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { apiSlice } from './api/apiSlice';
import { PasswordResetApi } from './api/apiPasswordResetSlice';
import controllerReducer from './features/controller'
const persistAuthConfig = {
  key: 'root',
  storage,
}
const persistThemeConfig = {
  key: 'theme',
  storage,
}
const persistControllerConfig = {
  key: 'controller',
  storage,
}
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedThemeReducer = persistReducer(persistThemeConfig, themeReducer);
const persistedControllerReducer = persistReducer(persistControllerConfig, controllerReducer);
export const store = configureStore({

  reducer: {
    [registerUserApi.reducerPath]: registerUserApi.reducer,
    [PasswordResetApi.reducerPath]: PasswordResetApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    persistAuth: persistedAuthReducer,
    persistTheme: persistedThemeReducer,
    persistController: persistedControllerReducer,
   
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}).concat([ 
    registerUserApi.middleware, 
    usersApi.middleware, 
    apiSlice.middleware, 
  ]),
  devTools:process.env.NODE_ENV !=='PRODUCTION' ? true : false,
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
