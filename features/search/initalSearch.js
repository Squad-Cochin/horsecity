///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//               File using for createSlice function of redux for storing INITIAL SEARCH DATA        //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  from_location : "",
  to_location : "",
  departDate : "",
  returnDate : "",
  trip : "",
  trip_type : [],
  number_of_horses : 0
};

// Create slice function
export const initialSearch = createSlice({
  name: "initial-search",
  initialState,
  reducers: {
    addFromLocation: (state, { payload }) => {
        state.from_location = payload;
    },
    addToLocation: (state, { payload }) => {
        state.to_location = payload;
    },
    addDepart: (state, { payload }) => {
        state.departDate = payload;
    },
    addReturn: (state, { payload }) => {
        state.returnDate = payload;
    },
    addTrip: (state, { payload }) => {
      state.trip = payload;
    },
    addTripType: (state, { payload }) => {
        state.trip_type = [...payload];
    },
    addNumberOfHorses: (state, { payload }) => {
        state.number_of_horses = payload;
    },
    clearHomePageFilter: (state)=>{
      Object.assign(state, initialState);
    }
  },
});

export const { addFromLocation, addToLocation, addDepart, addReturn, addTrip, addTripType, addNumberOfHorses ,clearHomePageFilter} = initialSearch.actions;
export default initialSearch.reducer;
