import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  categoryFilter: null,
};

const filterSlice = createSlice({
  name: "filter",
  serial: "filter",
  asset:"filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          product.serial.toLowerCase().includes(search.toLowerCase()) || // Add this line
          product.asset.toLowerCase().includes(search.toLowerCase())    // Add this line
      );

      state.filteredProducts = tempProducts;
      if (action.payload.category) {
        state.categoryFilter = action.payload.category;
      } else {
        state.categoryFilter = null;
      }
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;