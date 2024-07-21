import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getdefaulMidleware) => {
    return getdefaulMidleware({
      serializableCheck: false,
    });
  },
});
export const persistor = persistStore(store);
