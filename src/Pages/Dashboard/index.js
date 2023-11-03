////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Dashboard page functionality done over here.                         //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Row, Container } from "reactstrap";
import { useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
/**Api */
import { getSettingsPageData } from "../../helpers/ApiRoutes/getApiRoutes";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import UsePanel from "./UserPanel";
import OrderStatus from "./OrderStatus";
import OverView from "./OverView";
import LatestTransation from "./LatestTransation";
import withRouter from "../../components/Common/withRouter";

const Dashboard = (props) => {
  const [pageTitle, setPageTitle] = useState("KailPlus");

  useEffect(() => {
    getAllData();
    document.body.style.backgroundImage = "none";
    document.body.className = "";
  }, [pageTitle]);

  async function getAllData() {
    let settingsData = await getSettingsPageData();
    let obj = {
      application_title: settingsData?.settingsPageData[0]?.application_title,
    };
    localStorage.setItem("settingsData", JSON.stringify(obj));
    setPageTitle(settingsData?.settingsPageData[0]?.application_title);
  }
  const {
    dir
  } = useSelector(state => ({
    dir: state.Layout.dir,
  }));
  document.title = `${props.t("Dashboard")} | ${pageTitle} `;
  return (
    <React.Fragment>
      <div className={`page-content ${dir === 'rtl' ? 'page-content-rtl' : ''}`}>
        <Container fluid={true}>
          <Breadcrumbs title={pageTitle} breadcrumbItem={props.t("Dashboard")} />
          {/* User Panel Charts */}
          <UsePanel />
          <Row>
            <OverView />
            <OrderStatus />
          </Row>
          <Row></Row>
          {/* Latest Transaction Table */}
          <LatestTransation />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(Dashboard));
