import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import initialSearch from "../features/search/initalSearch";
import listingFilter from "../features/listingFilter/listingFilter";

export const store = configureStore({
    reducer: {
        hero: findPlaceSlice,
        initialSearch: initialSearch,
        listingFilter: listingFilter,
    },
});
