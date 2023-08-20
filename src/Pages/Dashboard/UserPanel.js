// // import React from "react";
// import React, { useState, useEffect } from 'react';

// import { Card, CardBody, Col, Row } from "reactstrap";
// import { useFormik } from "formik";
// import { useParams } from 'react-router-dom'


// import RadialChart1 from "./userpanelChart1";
// import RadialChart2 from "./userpanelChart2";
// import RadialChart3 from "./userpanelChart3";

// import { getDashboardData } from '../../helpers/ApiRoutes/getApiRoutes';



// const DashboardPanel = () =>
// {
//   const { id } = useParams(); // Retrieve the 'id' parameter from the URL using the 'useParams' hook
//   // let title = `${vehicle?.make} ${vehicle?.models}`; // Generate a title using the 'make' and 'models' properties of the 'vehicle' object

//   const[dashboarddata, setDashboardData] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [roleName, setRoleName] = useState("");
//   const [roleId, setRoleId] = useState("");
  
//   useEffect(() =>
//   {
//     const data = JSON.parse(localStorage.getItem("authUser"));
//     // console.log('Data from the dashboard page', data);
//     let user_Id = data[0]?.user[0]?.id
//     // console.log('User id from the dashboard page: ', user_Id);
//     let role_Name = data[0]?.user[0]?.role_name
//     // console.log('Role name from the dashboard page: ', role_Name);
//     let rId = data[0]?.user[0]?.role_Id
//     // console.log('Role Id from the dashboard page: ', rId);
//     setUserId(user_Id);
//     setRoleId(rId);
//     setRoleName(role_Name);
//     dashboardData();
//   }, [userId, roleName, roleId]);

//   // console.log(`Dashboard Data: `, userId);

//   async function dashboardData()
//   {
//     // console.log(`Came inside the dashboard data`);
//     // console.log(`USER ID: `, userId);
//     let dData = await getDashboardData(userId);
//     console.log(`Result from the dashboard data function: `, dData);
//     setDashboardData(dData.counts);
//   }
  
  
  
//   return (
//     <React.Fragment>
//     {dashboarddata.map((item, index) =>
//       <div key = {index}>    
//       <Row>  
//         <Col xl={3} sm={6}>
//           <Card>
//             <CardBody>
            
//               <div className="d-flex text-muted">
//                 <div className="flex-shrink-0 me-3 align-self-center">
//                   <div className="avatar-sm">
//                     <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
//                       <i className="ri-group-line"></i>
//                     </div>
//                   </div>
//                   {/* <div id="radialchart-1" className="apex-charts" dir="ltr">
//                     <RadialChart1 />
//                   </div> */}
//                 </div>

//                 <div className="flex-grow-1 overflow-hidden">
//                   <p className="mb-1">Total Service Provider</p>
//                   <h5 className="mb-3">{item.total_providers}</h5>
//                   {/* <p className="text-truncate mb-0">
//                     <span className="text-success me-2"> {" "} 0.02% {" "}
//                       <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
//                     </span>{" "}
//                     From previous
//                   </p> */}
//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>

//         <Col xl={3} sm={6}>
//           <Card>
//             <CardBody>
//               <div className="d-flex">
//                 <div className="flex-shrink-0 me-3 align-self-center">
//                   <div className="avatar-sm">
//                     <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
//                       <i className="ri-group-line"></i>
//                     </div>
//                   </div>
//                   {/* <RadialChart2
//                     id="radialchart-2"x
//                     className="apex-charts"
//                     dir="ltr"
//                   /> */}
//                 </div>

//                 <div className="flex-grow-1 overflow-hidden">
//                   <p className="mb-1">Total Customers</p>
//                   <h5 className="mb-3">{item.total_customers}</h5>
//                   {/* <p className="text-truncate mb-0">
//                     <span className="text-success me-2">
//                       {" "}
//                       1.7%{" "}
//                       <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
//                     </span>{" "}
//                     From previous
//                   </p> */}
//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>

//         <Col xl={3} sm={6}>
//           <Card>
//             <CardBody>
//               <div className="d-flex text-muted">
//                 <div className="flex-shrink-0 me-3 align-self-center">
//                   <div className="avatar-sm">
//                     <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
//                       <i className="ri-group-line"></i>
//                     </div>
//                   </div>
//                   {/* <RadialChart3
//                     id="radialchart-3"
//                     className="apex-charts"
//                     dir="ltr"
//                   /> */}
//                 </div>

//                 <div className="flex-grow-1 overflow-hidden">
//                   <p className="mb-1">Total Vehicles</p>
//                   <h5 className="mb-3">{item.total_vehicles}</h5>
//                   {/* <p className="text-truncate mb-0">
//                     <span className="text-danger me-2">
//                       {" "}
//                       0.01%{" "}
//                       <i className="ri-arrow-right-down-line align-bottom ms-1"></i>
//                     </span>{" "}
//                     From previous
//                   </p> */}
//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>

//         <Col xl={3} sm={6}>
//           <Card>
//             <CardBody>
//               <div className="d-flex text-muted">
//                 <div className="flex-shrink-0 me-3 align-self-center">
//                   <div className="avatar-sm">
//                     <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
//                       <i className="ri-group-line"></i>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-grow-1 overflow-hidden">
//                   <p className="mb-1">Total Drivers</p>
//                   <h5 className="mb-3">{item.total_drivers}</h5>
//                   {/* <p className="text-truncate mb-0">
//                     <span className="text-success me-2">
//                       {" "}
//                       0.01%{" "}
//                       <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
//                     </span>{" "}
//                     From previous
//                   </p> */}
//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>
//         <Col xl={3} sm={6}>
//           <Card>
//             <CardBody>
//               <div className="d-flex text-muted">
//                 <div className="flex-shrink-0 me-3 align-self-center">
//                   <div className="avatar-sm">
//                     <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
//                       <i className="ri-group-line"></i>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-grow-1 overflow-hidden">
//                   <p className="mb-1">Total Enquiries</p>
//                   <h5 className="mb-3">{item.total_enquiries}</h5>
//                   {/* <p className="text-truncate mb-0">
//                     <span className="text-success me-2">
//                       {" "}
//                       0.01%{" "}
//                       <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
//                     </span>{" "}
//                     From previous
//                   </p> */}
//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>

//         <Col xl={3} sm={6}>
//           <Card>
//             <CardBody>
//               <div className="d-flex text-muted">
//                 <div className="flex-shrink-0 me-3 align-self-center">
//                   <div className="avatar-sm">
//                     <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
//                       <i className="ri-group-line"></i>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-grow-1 overflow-hidden">
//                   <p className="mb-1">Total Quotations</p>
//                   <h5 className="mb-3">{item.total_quotations}</h5>
//                   {/* <p className="text-truncate mb-0">
//                     <span className="text-success me-2">
//                       {" "}
//                       0.01%{" "}
//                       <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
//                     </span>{" "}
//                     From previous
//                   </p> */}
//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>

//         <Col xl={3} sm={6}>
//           <Card>
//             <CardBody>
//               <div className="d-flex text-muted">
//                 <div className="flex-shrink-0 me-3 align-self-center">
//                   <div className="avatar-sm">
//                     <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
//                       <i className="ri-group-line"></i>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-grow-1 overflow-hidden">
//                   <p className="mb-1"> Total Revenue</p>
//                   <h5 className="mb-3">{item.total_revenue}</h5>
//                   {/* <p className="text-truncate mb-0">
//                     <span className="text-success me-2">
//                       {" "}
//                       0.01%{" "}
//                       <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
//                     </span>{" "}
//                     From previous
//                   </p> */}

//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//       </div>)}
//     </React.Fragment>
//   );
// };
// export default DashboardPanel;


import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";
import RadialChart3 from "./userpanelChart3";

const UserPanel = () => {
  return (
    <React.Fragment>
      <Row>
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Customers</p>
                  <h5 className="mb-3">2.2k</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      0.02%{" "}
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart2
                    id="radialchart-2"
                    className="apex-charts"
                    dir="ltr"
                  />
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total vehicles</p>
                  <h5 className="mb-3">50</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      1.7%{" "}
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
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
                  <RadialChart3
                    id="radialchart-3"
                    className="apex-charts"
                    dir="ltr"
                  />
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Suppliers</p>
                  <h5 className="mb-3">24.03 %</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-danger me-2">
                      {" "}
                      0.01%{" "}
                      <i className="ri-arrow-right-down-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
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
                      <i className="ri-group-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1"> Total Quotations</p>
                  <h5 className="mb-3">435</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      0.01%{" "}
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
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
                      <i className="ri-group-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1"> Total Revenue</p>
                  <h5 className="mb-3">435</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      0.01%{" "}
                      <i className="ri-arrow-right-up-line align-bottom ms-1"></i>
                    </span>{" "}
                    From previous
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;

