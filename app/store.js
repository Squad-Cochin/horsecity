import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import initialSearch from "../features/search/initalSearch";
import listingFilter from "../features/listingFilter/listingFilter";
import listData from "../features/listData/listData";

export const store = configureStore({
    reducer: {
        hero: findPlaceSlice,
        initialSearch: initialSearch,
        listingFilter: listingFilter,
        listData: listData,
    },
});
