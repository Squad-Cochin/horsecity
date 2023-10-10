///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//         File using for createSlice function of redux for storing BOOKING DATA(imp data)           //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customer_id : '',
    vehicle_id : '',
    serviceprovider_id : '',
    no_of_horse : ''
};

// Create slice function
export const bookingData = createSlice({
  name: "bookingData",
  initialState,
  reducers: {
    booking_data : (state, { payload }) => {
      state.customer_id = payload.customer_id;
      state.vehicle_id = payload.vehicle_id;
      state.serviceprovider_id = payload.serviceprovider_id;
      state.no_of_horse = payload.no_of_horse;
    },

  },
});

export const { booking_data  } = bookingData.actions;
export default bookingData.reducer;
