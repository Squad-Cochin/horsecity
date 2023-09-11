///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                               File for WISH LIST in DASHBORD pages                                //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


import Pagination from "../../common/Pagination";
import Properties from "./Properties";

// Function for wishlist page
const WishlistTable = () => {
  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <Properties />
      </div>
      <Pagination />
    </>
  );
};

export default WishlistTable;
