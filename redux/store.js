import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

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

import featuredReducer from "./features/featuredSlice";
import productsReducer from "./features/productsSlice";
import categoryReducer from "./features/categorySlice";
import cartReducer from "./features/cartSlice";
import tokenReducer from "./features/tokenSlice";
import userReducer from "./features/userSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({ 
    featured: featuredReducer,
    products: productsReducer,
    category: categoryReducer,
    cart: cartReducer,
    token: tokenReducer,
    user: userReducer,
});

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