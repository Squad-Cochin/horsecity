///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                          File using for store redux configure store                               //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Imorting redux toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing redux value storing files
import initialSearch from "../features/search/initalSearch";
import listingFilter from "../features/listingFilter/listingFilter";
import listData from "../features/listData/listData";
import currentPage from "../features/currentPage/currentPage";
import bookingData  from "../features/bookingData/bookingData";
import wishlist  from "../features/wishlist/wishlist";
export const store = configureStore({
    reducer: {
        initialSearch: initialSearch,
        listingFilter: listingFilter,
        listData: listData,
        currentPage: currentPage,
        bookingData : bookingData,
        wishlist : wishlist
    },
});
