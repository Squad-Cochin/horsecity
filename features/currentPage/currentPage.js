///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//               File using for createSlice function of redux for storing CURRENT PAGE               //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage : 1
};

// Create slice function
export const currentPage = createSlice({
  name: "Current-Page",
  initialState,
  reducers: {
    add_current_page: (state, { payload }) => {
        state.currentPage = payload;
    }
  },
});

export const { add_current_page } = currentPage.actions;
export default currentPage.reducer;
