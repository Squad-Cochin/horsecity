import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customer_id : '',
    vehicle_id : '',
    serviceprovider_id : '',
};

export const bookingData = createSlice({
  name: "bookingData",
  initialState,
  reducers: {
    booking_data : (state, { payload }) => {
      state.customer_id = payload.customer_id;
      state.vehicle_id = payload.vehicle_id;
      state.serviceprovider_id = payload.serviceprovider_id;
    },

  },
});

export const { booking_data  } = bookingData.actions;
export default bookingData.reducer;
