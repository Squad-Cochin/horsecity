///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                  File using for sidebar for apply filter in LISTING page                          //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


import PirceSlider from "../sidebar/PirceSlider";
import CategorieFilters from "../sidebar/CategorieFilters";
import SupplierFilters from "../sidebar/SupplierFilters";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Trip Type</h5>
        <div className="sidebar-checkbox">
          <CategorieFilters />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Category filter */}

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Price</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider />
          </div>
        </div>
      </div>
      {/* End Price filter */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Supplier</h5>
        <div className="sidebar-checkbox">
          <SupplierFilters />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Supplier filter */}
    </>
  );
};

export default Sidebar;
