import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchedProductByFilters } from "./Apis";
import { act } from "react";

export const initialState = {
  allProducts: [],
  filteredProducts: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const get_All_Products = createAsyncThunk(
  "Filters/Products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProducts();
      console.log("All Products At Slice", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Not Fetched");
    }
  }
);

export const fetchProductByCategory = createAsyncThunk(
  "Filters/Category&Brands",
  async (newFilter, { rejectWithValue }) => {
    try {
        console.log('Filter checked from frontend', newFilter);
      const filterResponse = await fetchedProductByFilters(newFilter);
      console.log("Filters Category and Brand output", filterResponse.data);
      return filterResponse.data;
    } catch (error) {
      return rejectWithValue(error.message || "Error in filter");
    }
  }
);

const ProductSlice = createSlice({
  name: "Products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(get_All_Products.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_All_Products.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we always store an array
        state.allProducts = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.products || [];
      })
      .addCase(get_All_Products.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {} = ProductSlice.actions;
export default ProductSlice.reducer;
