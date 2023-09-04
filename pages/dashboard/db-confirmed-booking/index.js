import Seo from "../../../components/common/Seo";
import Sidebar from "../common/Sidebar";
import Header from "../../../components/header/dashboard-header";
import Footer from "../common/Footer";
import BookingTable from "./components/BookingTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
const index = () => {
  const [url,setUrl] =useState(false);
  const router = useRouter();
  useEffect(()=>{
    initialLoad();
  },[])
async function initialLoad(){
  const searchData = await JSON.parse(localStorage.getItem('searchObject'));
  
  if (searchData.number_of_horses !='' && searchData.trip_type.length != 0) {
    setUrl(true);
  }else{
    setUrl(false);
  }
}
  return (
    <>
      <Seo pageTitle="Booking History" />
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
              <a onClick={() =>{url ? router.push("/car/car-list-v1") : router.push("/")}}  style={{ cursor: 'pointer' }}><IoIosArrowBack/><b>Back to page</b></a>
                <h1 className="text-30 lh-14 fw-600">Booking History</h1>
                {/* <div className="text-15 text-light-1">
                  Lorem ipsum dolor sit amet, consectetur.
                </div> */}
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <BookingTable />
              {/* End tabs */}
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

export default index;
