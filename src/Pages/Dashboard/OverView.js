import React, { useState, useEffect } from 'react';
import LineColumnArea from './LineColumnArea';

import { Card, CardBody, Col, Row } from "reactstrap";
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
                        </div>
                        <div>
                            <LineColumnArea />
                        </div>
                    </CardBody>
                    <CardBody className="border-top">
                        <div className="text-muted text-center">
                            <Row>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default MonthlySalesReport;
