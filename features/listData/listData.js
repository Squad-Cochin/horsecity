import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list_data : {
        listing_data :[],
        totalCount : 0
    } 
};

export const listData = createSlice({
  name: "listData-filter",
  initialState,
  reducers: {
    add_list_data: (state, { payload }) => {
        state.list_data = payload;
    }
  },
});

export const { add_list_data } = listData.actions;
export default listData.reducer;
