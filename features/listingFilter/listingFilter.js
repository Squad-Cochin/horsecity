import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trip_type : [],
  number_of_horses : "",
  price_from : 0,
  price_to : 2000,
  suppliers : [],
  sort : "",
  page : 1,
  limit : 5 
};

export const listingFilter = createSlice({
  name: "listing-filter",
  initialState,
  reducers: {
    filter_tripType: (state, { payload }) => {
        state.trip_type = [...payload];
    },
    filter_number_of_horses: (state, { payload }) => {
        state.number_of_horses = payload;
    },
    filter_price_from: (state, { payload }) => {
      state.price_from = payload;
    },
    filter_price_to: (state, { payload }) => {
      state.price_to = payload;
    },
    filter_suppliers: (state, { payload }) => {
      state.suppliers = payload;
    },
    filter_sort: (state, { payload }) => {
      state.sort = payload;
    },
    filter_page: (state, { payload }) => {
      state.page = payload;
    },
    filter_limit: (state, { payload }) => {
      state.limit = payload;
    },

  },
});

export const { filter_tripType, filter_number_of_horses, filter_price_from, filter_price_to, filter_suppliers, filter_sort, filter_page, filter_limit } = listingFilter.actions;
export default listingFilter.reducer;
