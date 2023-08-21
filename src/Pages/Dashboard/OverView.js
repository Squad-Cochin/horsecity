import React, { useState, useEffect } from 'react';
import LineColumnArea from './LineColumnArea';

import { Card, CardBody, Col, Row } from "reactstrap";
import { OverViewData } from '../../CommonData/Data/index';
import { getMonthlySalesData } from '../../helpers/ApiRoutes/getApiRoutes';

const MonthlySalesReport = () =>
{    
    const[salesGraphData, setSalesGraphData] = useState([]);
    const [userId, setUserId] = useState("");
    const [roleName, setRoleName] = useState("");
    const [roleId, setRoleId] = useState("");


    var data = JSON.parse(localStorage.getItem("authUser"));
    useEffect(() =>
    {
        // const data = JSON.parse(localStorage.getItem("authUser"));
        // console.log('Data from the dashboard page', data);
        let user_Id = data[0]?.user[0]?.id
        // console.log('User id from the dashboard page: ', user_Id);
        let role_Name = data[0]?.user[0]?.role_name
        // console.log('Role name from the dashboard page: ', role_Name);
        let rId = data[0]?.user[0]?.role_Id
        // console.log('Role Id from the dashboard page: ', rId);
        setUserId(user_Id);
        setRoleId(rId);
        setRoleName(role_Name);
        monthlySalesGraphdata();
    }, [userId, roleName, roleId]);

    async function monthlySalesGraphdata()
    {
        // console.log(`Came inside the monthly sales graph data`);
        let sgData = await getMonthlySalesData(data[0]?.user[0]?.id);
        // console.log(`Result from the monthly sales graph data: `, sgData);
        setSalesGraphData(sgData.revenue.options);
    }

    
    return (
        <React.Fragment>
            <Col xl={8}>
                <Card>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                                <h5 className="card-title">Monthly Sales Report</h5>
                            </div>
                            {/* <div className="flex-shrink-0">
                                <div>
                                    <button type="button" className="btn btn-soft-secondary btn-sm me-1">
                                        ALL
                                    </button>
                                    <button type="button" className="btn btn-soft-primary btn-sm me-1">
                                        1M
                                    </button>
                                    <button type="button" className="btn btn-soft-secondary btn-sm me-1">
                                        6M
                                    </button>
                                    <button type="button" className="btn btn-soft-secondary btn-sm me-1 active">
                                        1Y
                                    </button>
                                </div>
                            </div> */}
                        </div>
                        <div>
                            <LineColumnArea />
                        </div>
                    </CardBody>
                    <CardBody className="border-top">
                        <div className="text-muted text-center">
                            <Row>
                                    {OverViewData.map((item, key) => (<Col md={4} key={key} className="border-end">
                                        <div>
                                            {/* <p className="mb-2"><i className={"mdi mdi-circle font-size-12 me-1 text-" + item.color}></i> {item.title}</p> */}
                                            {/* <h5 className="font-size-16 mb-0">$ {item.count} <span className="text-success font-size-12"><i className="mdi mdi-menu-up font-size-14 me-1"></i>{item.percentage} %</span></h5> */}
                                        </div>
                                    </Col>))}
                                {/* {salesGraphData.map((item, key) => (<Col md={4} key={key} className="border-end"> */}
                                    {/* <div>
                                        <p className="mb-2"><i className={"mdi mdi-circle font-size-12 me-1 text-" + item.color}></i> {item.title}</p>
                                        <h5 className="font-size-16 mb-0">$ {salesGraphData.count} <span className="text-success font-size-12"><i className="mdi mdi-menu-up font-size-14 me-1"></i>{item.percentage} %</span></h5>
                                        <p className="mb-2"><i className={"mdi mdi-circle font-size-12 me-1 text-" + item.color}></i> {item.title}</p>
                                        <h5 className="font-size-16 mb-0">$ {salesGraphData.count} <span className="text-success font-size-12"><i className="mdi mdi-menu-up font-size-14 me-1"></i>{item.percentage} %</span></h5>
                                    </div> */}
                                {/* </Col> */}
                                {/* ))} */} 
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default MonthlySalesReport;
