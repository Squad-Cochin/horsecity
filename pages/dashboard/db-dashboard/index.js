///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                        File for showing the Dashboard data in DASHBORD pages                      //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import Seo from "../../../components/common/Seo";
import DashboardCard from "./components/DashboardCard";
import Sidebar from "../common/Sidebar";
import Header from "../../../components/header/dashboard-header";
import RecentBooking from "./components/RecentBooking";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import dashboardDataApi from "../../api/dashboardDataApi";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";

// Function for showing the dashboad data
const Index = () => {
  const [ data, setData ] = useState([]);
  const [url,setUrl] =useState(false);
  const router = useRouter();

  useEffect(()=>{
    initialFunction()
  },[])
  
  // Function for getting search object in the initial load of a page for setting back to the page route
  async function initialFunction(){
    let loginData = await JSON.parse(localStorage.getItem("loginData"))
    const searchData = await JSON.parse((localStorage.getItem('searchObject')) ?? "{}");
    if (searchData?.number_of_horses !='' && searchData?.trip_type?.length != 0) {
      setUrl(true);
    }else{
      setUrl(false);
    }
    let dashboardData = await dashboardDataApi(loginData?.id)
    setData(dashboardData);
  } 
  return (
    <>
      <Seo pageTitle="Dashboard" />
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
                <h1 className="text-30 lh-14 fw-600">Dashboard</h1>
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <DashboardCard data={data?.count}/>

            <div className="row y-gap-30 pt-20 chart_responsive">
              <div className="col-xl-5 col-md-6">
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                  <div className="d-flex justify-between items-center">
                    <h2 className="text-18 lh-1 fw-500">Recent Enquiries</h2>
                  </div>
                  {/* End d-flex */}

                  <RecentBooking data={data?.enquiries}/>
                </div>
                {/* End py-30 */}
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}

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
