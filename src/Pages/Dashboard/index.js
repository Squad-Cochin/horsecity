import React,{useState,useEffect} from "react";
import UsePanel from "./UserPanel";
import OrderStatus from "./OrderStatus";
// import Notifications from "./Notifications";
// import SocialSource from "./SocialSource";
import OverView from "./OverView";
// import RevenueByLocation from "./RevenueByLocation";
import LatestTransation from "./LatestTransation";

import { Row, Container } from "reactstrap";
/**Api */
import { getSettingsPageData } from '../../helpers/ApiRoutes/getApiRoutes'; 
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Dashboard = () => {

  const [pageTitle, setPageTitle] = useState('HORSCITY');

  useEffect(() => {
    getAllData()
    document.body.style.backgroundImage = "none";
    document.body.className = "";
  }, [pageTitle]);
  
  async function getAllData() {
    let settingsData = await getSettingsPageData();
    setPageTitle(settingsData?.settingsPageData[0]?.application_title);
   }
  document.title = `Dashboard | ${pageTitle} - React Admin & Dashboard Template`;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title={pageTitle} breadcrumbItem="Dashboard" />
          {/* User Panel Charts */}
          <UsePanel />

          <Row>
            {/* Overview Chart */}
            <OverView />
            <OrderStatus />
            {/* Social Source Chart */}
            {/* <SocialSource /> */}
          </Row>

          <Row>
            {/* Order Stats */}
            
            {/* Notifications */}
            {/* <Notifications /> */}
            {/* Revenue by Location Vector Map */}
            {/* <RevenueByLocation /> */}
          </Row>

          {/* Latest Transaction Table */}
          <LatestTransation />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
