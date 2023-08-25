import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total_count : '',
    page  : 1
};

export const wishlist = createSlice({
  name: "wishlist-items",
  initialState,
  reducers: {
    wishlist_items: (state, { payload }) => {
        state.total_count = payload.total_count;
    },
    wishlist_page: (state, { payload }) => {
        state.page = payload.page;
    }
  },
});

export const { wishlist_items, wishlist_page } = wishlist.actions;
export default wishlist.reducer;