import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slides/categorySlice.js";
import userReducer from "./slides/userSlice.js";
import orderReducer from "./slides/orderSlice.js";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  user: userReducer,
  order: orderReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["user", "categories"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
