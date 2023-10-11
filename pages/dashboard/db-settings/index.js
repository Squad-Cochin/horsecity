///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                               File for SETTINGS in DASHBORD pages                                 //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import Seo from "../../../components/common/Seo";
import Sidebar from "../common/Sidebar";
import Header from "../../../components/header/dashboard-header";
import SettingsTabs from "./components/index";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";

// Function for showing the settings page also it can update
const Index = () => {
  const [url,setUrl] =useState(false);
  const router = useRouter();

  useEffect(()=>{
    initialLoad();
  },[]);

  // Function for getting search object in the initial load of a page for setting back to the page route
  async function initialLoad(){
    const searchData = await JSON.parse((localStorage.getItem('searchObject')) ?? "{}");
    if (searchData?.number_of_horses !='' && searchData?.trip_type?.length != 0) {
      setUrl(true);
    }else{
      setUrl(false);
    }
  }

  return (
    <>
      <Seo pageTitle="Settings" />
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header />
      {/* End dashboard-header */}

      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
          {/* End sidebar */}
        </div>
        {/* End dashboard__sidebar */}

        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
              <a onClick={() =>{url ? router.push("/package/listing") : router.push("/")}}  style={{ cursor: 'pointer' }}><IoIosArrowBack/><b>Back to page</b></a>
                <h1 className="text-30 lh-14 fw-600">Settings</h1>
                <div className="text-15 text-light-1">
                  Lorem ipsum dolor sit amet, consectetur.
                </div>
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <SettingsTabs />
            </div>

            <Footer />
          </div>
          {/* End .dashboard__content */}
        </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </>
  );
};

export default Index;
