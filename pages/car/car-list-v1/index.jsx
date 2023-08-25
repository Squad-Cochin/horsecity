import CallToActions from "../../../components/common/CallToActions";
import Seo from "../../../components/common/Seo";
import Header11 from "../../../components/header/header-11";
import DefaultFooter from "../../../components/footer/default";
import MainFilterSearchBox from "../../../components/car-list/car-list-v1/MainFilterSearchBox";
import TopHeaderFilter from "../../../components/car-list/car-list-v1/TopHeaderFilter";
import Pagination from "../../../components/car-list/common/Pagination";
import Sidebar from "../../../components/car-list/car-list-v1/Sidebar";
import CarPropertes from "../../../components/car-list/car-list-v1/CarPropertes";
import React, { useEffect, useState } from "react";
// import axios from "axios";
// import initialSearch from "../../api/initialSearch";
// import { useSelector, useDispatch } from "react-redux";
// import { addTripType, addNumberOfHorses } from "../../../features/search/initalSearch";
// import { add_list_data } from "../../../features/listData/listData";

const Index = () => {
  // const dispatch = useDispatch();
  useEffect(() => {
    getPackageList();
  },[])

  async function getPackageList(){
    // const { price_from, price_to, suppliers, limit } = useSelector((state) => state.listingFilter) || {};
    
    // const searchObject = JSON.parse(localStorage.getItem('searchObject'));
    // console.log("local",searchObject)
    // let packageList = await initialSearch(searchObject)
    // let packageList = await axios.post(`/api/initialSearch`,{})
    // console.log("first")
  }
  return (
    <>
      <Seo pageTitle="Listing" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}

      <section className="pt-60">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="text-30 fw-600">Equine Transportations Services</h1>
              </div>
              {/* End text-center */}
              <div className="d-none d-sm-block">  
                <MainFilterSearchBox />
              </div>
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      {/* Top SearchBanner */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <Sidebar />
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Hotels
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}

            <div className="col-xl-9 ">
              <TopHeaderFilter />
              <div className="mt-30"></div>
              {/* End mt--30 */}
              <div className="row y-gap-30">
                <CarPropertes />
              </div>
              {/* End .row */}
              <Pagination />
            </div>
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End layout for listing sidebar and content */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default Index;
