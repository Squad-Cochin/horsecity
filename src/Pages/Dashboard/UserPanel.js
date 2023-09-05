import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from "reactstrap";
import { getDashboardData } from '../../helpers/ApiRoutes/getApiRoutes';
import config from '../../config';
var role_id = config.Role.service_provider

const DashboardPanel = () =>
{
  const [dashboarddata, setDashboardData] = useState([]);
  const [userId, setUserId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");

  var data = JSON.parse(localStorage.getItem("authUser"));
  console.log(`Data from of the userPanel: `, data);
  
  useEffect(() =>
  {

    let user_Id = data[0]?.user[0]?.id
    let role_Name = data[0]?.user[0]?.role_name
    let rId = data[0]?.user[0]?.role_Id
    setUserId(user_Id);
    setRoleId(rId);
    setRoleName(role_Name);
    dashboardData();
  }, [userId, roleName, roleId]);


  async function dashboardData()
  {

    let dData = await getDashboardData(data[0]?.user[0]?.id);
    setDashboardData(dData.counts);
  }
  
  console.log(`Login user Role id from the userpanel.js: `, data[0]?.user[0]?.role_Id);
  console.log(`Role id from the config file: `, role_id);
  
  return (
    <React.Fragment>
    {dashboarddata.map((item, index) =>
      <div key = {index}>    
      <Row>

      {role_id !== data[0]?.user[0]?.role_Id && ( 
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
            
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-admin-line"></i>
                    </div>
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Service Provider</p>
                  <h5 className="mb-3">{item.total_providers}</h5>
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
              <div className="d-flex">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-group-line"></i>
                    </div>
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Customers</p>
                  <h5 className="mb-3">{item.total_customers}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        )}

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-truck-line"></i>
                    </div>
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Vehicles</p>
                  <h5 className="mb-3">{item.total_vehicles}</h5>
    
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-team-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Drivers</p>
                  <h5 className="mb-3">{item.total_drivers}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-chat-new-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Enquiries</p>
                  <h5 className="mb-3">{item.total_enquiries}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-chat-quote-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Quotations</p>
                  <h5 className="mb-3">{item.total_quotations}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-hand-coin-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1"> Total Revenue</p>
                  <h5 className="mb-3">{item.total_revenue}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>)}
    </React.Fragment>
  );
};
export default DashboardPanel;

