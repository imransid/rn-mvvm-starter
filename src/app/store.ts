import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { childApi } from '../api/childrenApi';
import { journalApi } from '../api/journalApi'; 
import {quizApi} from "../api/quizApi"
import {storiesApi} from "../api/storiesApi"
import {deviceApi} from "../api/deviceApi"
import {subscriptionApi} from "../api/subscriptionApi"
import {magicApi} from "../api/magicApi"

const sagaMiddleware = createSagaMiddleware();

// Persist config for Redux Persist
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'quiz'], // only persist auth slice
};

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: {
    root: persistedReducer,
    [childApi.reducerPath]: childApi.reducer,
    [journalApi.reducerPath]: journalApi.reducer, // <-- add journalApi reducer
    [quizApi.reducerPath]: quizApi.reducer,
    [storiesApi.reducerPath]: storiesApi.reducer,
    [deviceApi.reducerPath]: deviceApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [magicApi.reducerPath]: magicApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    })
      .prepend(sagaMiddleware)
      .concat(childApi.middleware)
      .concat(journalApi.middleware) 
      .concat(quizApi.middleware)
       .concat(storiesApi.middleware)
       .concat(deviceApi.middleware)
       .concat(subscriptionApi.middleware)
       .concat(magicApi.middleware)
      .concat(__DEV__ ? [logger] : []),
  devTools: __DEV__,
});

// Run saga middleware
sagaMiddleware.run(rootSaga);

// Persistor for Redux Persist
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
