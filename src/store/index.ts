import {configureStore} from '@reduxjs/toolkit';import stays from './staysSlice';import search from './searchSlice';
const store=configureStore({reducer:{stays,search}});
export type RootState=ReturnType<typeof store.getState>;export type AppDispatch=typeof store.dispatch;
export default store;
