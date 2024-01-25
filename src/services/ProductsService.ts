import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductModel } from "../models/product.model";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),

  tagTypes: ["Products", 'Product'],

  endpoints: (build) => ({
    fetchAllProducts: build.query<ProductModel[], string>({
      query: () => ({
        url: "/products",
      }),
      providesTags: () => ["Products"],
    }),

    fetchProduct: build.query<ProductModel, string>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: () => ['Product']
    }),

    createProduct: build.mutation<ProductModel, ProductModel>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: build.mutation<ProductModel, ProductModel>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: build.mutation<ProductModel, ProductModel>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products", 'Product'],
    }),
  }),
});
