import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"; // redux persistor to persist redux states
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/authSlice.js";

const rootReducer = combineReducers({
    auth: authReducer,
    // other reducers can be added here
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
