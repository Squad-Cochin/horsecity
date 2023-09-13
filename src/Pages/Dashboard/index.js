////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Dashboard page functionality done over here.                         //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////


import React,{useState,useEffect} from "react";
import { Row, Container } from "reactstrap";

/**Api */
import { getSettingsPageData } from '../../helpers/ApiRoutes/getApiRoutes'; 
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import UsePanel from "./UserPanel";
import OrderStatus from "./OrderStatus";
import OverView from "./OverView";
import LatestTransation from "./LatestTransation";

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
  document.title = `Dashboard | ${pageTitle} `;


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title={pageTitle} breadcrumbItem="Dashboard" />
          {/* User Panel Charts */}
          <UsePanel />
          <Row>
            <OverView />
            <OrderStatus />
          </Row>
          <Row>
          </Row>
          {/* Latest Transaction Table */}
          <LatestTransation />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
