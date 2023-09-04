import Seo from "../../../components/common/Seo";
import DashboardCard from "./components/DashboardCard";
import Sidebar from "../common/Sidebar";
import Header from "../../../components/header/dashboard-header";
import ChartSelect from "./components/ChartSelect";
import ChartMain from "./components/ChartMain";
import Link from "next/link";
import RercentBooking from "./components/RercentBooking";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import dashboardDataApi from "../../api/dashboardDataApi";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
const Index = () => {
  const [ login, setLogin ] = useState({});
  const [ data, setData ] = useState([]);
  const [url,setUrl] =useState(false);
  const router = useRouter();
  useEffect(()=>{
    initialFunction()
  },[])
  async function initialFunction(){
    let loginData = await JSON.parse(localStorage.getItem("loginData"))
    const searchData = await JSON.parse(localStorage.getItem('searchObject'));
  
    if (searchData.number_of_horses !='' && searchData.trip_type.length != 0) {
      setUrl(true);
    }else{
      setUrl(false);
    }
    if(loginData){
      setLogin(loginData);
    }
    let dashboardData = await dashboardDataApi(loginData.id)
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
              <a onClick={() =>{url ? router.push("/car/car-list-v1") : router.push("/")}}  style={{ cursor: 'pointer' }}><IoIosArrowBack/><b>Back to page</b></a>
                <h1 className="text-30 lh-14 fw-600">Dashboard</h1>
                {/* <div className="text-15 text-light-1">
                  Lorem ipsum dolor sit amet, consectetur.
                </div> */}
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <DashboardCard data={data?.count}/>

            <div className="row y-gap-30 pt-20 chart_responsive">
              {/* <div className="col-xl-7 col-md-6">
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                  <div className="d-flex justify-between items-center">
                    <h2 className="text-18 lh-1 fw-500">Earning Statistics</h2>
                    <ChartSelect />
                  </div>

                  <div className="pt-30">
                    <ChartMain />
                  </div>
                </div>
              </div> */}
              {/* End .col */}

              <div className="col-xl-5 col-md-6">
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                  <div className="d-flex justify-between items-center">
                    <h2 className="text-18 lh-1 fw-500">Recent Enquiries</h2>
                    {/* <div>
                      <Link
                        href="#"
                        className="text-14 text-blue-1 fw-500 underline"
                      >
                        View All
                      </Link>
                    </div> */}
                  </div>
                  {/* End d-flex */}

                  <RercentBooking data={data?.enquiries}/>
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
