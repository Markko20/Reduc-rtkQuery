import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsAPI } from "../services/ProductsService";

const rootReducer = combineReducers({
  [productsAPI.reducerPath]: productsAPI.reducer,
});

export const setupstore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupstore>;
export type AppDispatch = AppStore["dispatch"];
