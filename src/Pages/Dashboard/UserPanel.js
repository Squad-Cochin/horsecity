import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
//i18n
import { withTranslation } from "react-i18next";
import { getDashboardData } from "../../helpers/ApiRoutes/getApiRoutes";
import { useSelector } from "react-redux";
import config from "../../config";
import withRouter from "../../components/Common/withRouter";
var role_id = config.Role.service_provider;

const DashboardPanel = (props) => {
  const [dashboarddata, setDashboardData] = useState([]);
  const [userId, setUserId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");
  var data = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    let user_Id = data[0]?.user[0]?.id;
    let role_Name = data[0]?.user[0]?.role_name;
    let rId = data[0]?.user[0]?.role_Id;
    setUserId(user_Id);
    setRoleId(rId);
    setRoleName(role_Name);
    dashboardData();
  }, [userId, roleName, roleId]);
  const {
    dir
  } = useSelector(state => ({
    dir: state.Layout.dir,
  }));


  async function dashboardData() {
    let dData = await getDashboardData(data[0]?.user[0]?.id);
    setDashboardData(dData?.counts);
  }

  return (
    <React.Fragment>
      {dashboarddata?.map((item, index) => (
        <div key={index}>
          <Row>
            {role_id !== data[0]?.user[0]?.role_Id && (
              <Col xl={3} sm={6}>
                <Card>
                  <CardBody>
                    <div className={`d-flex text-muted ${dir === 'rtl' ? 'text-muted-rtl' :''}`} >
                      <div className="flex-shrink-0 me-3 align-self-center">
                        <div className="avatar-sm">
                          <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                            <i className="ri-admin-line"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="mb-1">{props.t("Total Service Provider")}</p>
                        <h5 className="mb-3">{item?.total_providers}</h5>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )}
            {role_id !== data[0]?.user[0]?.role_Id && (
              <Col xl={3} sm={6}>
                <Card>
                  <CardBody>
                  <div className={`d-flex text-muted ${dir === 'rtl' ? 'text-muted-rtl' :''}`} >
                      <div className="flex-shrink-0 me-3 align-self-center">
                        <div className="avatar-sm">
                          <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                            <i className="ri-group-line"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="mb-1">{props.t("Total Customers")}</p>
                        <h5 className="mb-3">{item?.total_customers}</h5>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )}

            <Col xl={3} sm={6}>
              <Card>
                <CardBody>
                <div className={`d-flex text-muted ${dir === 'rtl' ? 'text-muted-rtl' :''}`} >
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                          <i className="ri-truck-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">{props.t("Total Vehicles")}</p>
                      <h5 className="mb-3">{item?.total_vehicles}</h5>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3} sm={6}>
              <Card>
                <CardBody>
                <div className={`d-flex text-muted ${dir === 'rtl' ? 'text-muted-rtl' :''}`} >
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                          <i className="ri-team-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">{props.t("Total Drivers")}</p>
                      <h5 className="mb-3">{item?.total_drivers}</h5>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3} sm={6}>
              <Card>
                <CardBody>
                <div className={`d-flex text-muted ${dir === 'rtl' ? 'text-muted-rtl' :''}`} >
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                          <i className="ri-chat-new-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">{props.t("Total Enquiries")}</p>
                      <h5 className="mb-3">{item?.total_enquiries}</h5>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3} sm={6}>
              <Card>
                <CardBody>
                <div className={`d-flex text-muted ${dir === 'rtl' ? 'text-muted-rtl' :''}`} >
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                          <i className="ri-chat-quote-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">{props.t("Total Quotations")}</p>
                      <h5 className="mb-3">{item?.total_quotations}</h5>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3} sm={6}>
              <Card>
                <CardBody>
                <div className={`d-flex text-muted ${dir === 'rtl' ? 'text-muted-rtl' :''}`} >
                    <div className="flex-shrink-0 me-3 align-self-center">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                          <i className="ri-hand-coin-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">{props.t("Total Revenue")}</p>
                      <h5 className="mb-3">{item?.total_revenue}</h5>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      ))}
    </React.Fragment>
  );
};
export default withRouter(withTranslation()(DashboardPanel));
