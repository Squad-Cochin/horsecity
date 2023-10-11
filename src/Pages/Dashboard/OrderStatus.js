import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Row,
} from "reactstrap";


import { getQuotationReportForDashboard } from '../../helpers/ApiRoutes/getApiRoutes';


const OrderStatus = () => {

    const[dashboardQuotationData, setdashboardQuotationData] = useState([]);
    const [userId, setUserId] = useState("");
    const [roleName, setRoleName] = useState("");
    const [roleId, setRoleId] = useState("");


    var data = JSON.parse(localStorage.getItem("authUser"));
    useEffect(() =>
    {
        let user_Id = data[0]?.user[0]?.id
        let role_Name = data[0]?.user[0]?.role_name
        let rId = data[0]?.user[0]?.role_Id
        setUserId(user_Id);
        setRoleId(rId);
        setRoleName(role_Name);
        enquiriesDataLatest();
    }, [userId, roleName, roleId]);

    async function enquiriesDataLatest()
    {
        let sgData = await getQuotationReportForDashboard(data[0]?.user[0]?.id);
        setdashboardQuotationData(sgData);
    }
    return (
        <React.Fragment>
            <Col xl={4}>
                <Card>
                    <CardBody>
                        <CardTitle>Quotation Status</CardTitle>
                        <div>
                            <ul className="list-unstyled">
                                {dashboardQuotationData?.map((item, key) => (<li key={key} className="py-3">
                                    <div className="d-flex">
                                        <div className="avatar-xs align-self-center me-3">
                                            <div className="avatar-title rounded-circle bg-light text-primary font-size-18">
                                                <i className={item?.icon}></i>
                                            </div>
                                        </div>

                                        <div className="flex-grow-1">
                                            <p className="text-muted mb-2">{item?.title}</p>
                                            <div className="progress progress-sm animated-progess">
                                                <div className={"progress-bar bg-" + item?.color} role="progressbar" style={{ width: item.width + "%" }} aria-valuenow={item.width} aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>))}
                            </ul>
                        </div>
                        
                        <hr />

                        <div className="text-center">
                            <Row>
                                {dashboardQuotationData?.map((item, key) => (<div key={key} className="col-4">
                                    <div className="mt-2">
                                        <p className="text-muted mb-6">{item?.title}</p>
                                        <h5 className="font-size-16 mb-0">{item?.width}</h5>
                                    </div>
                                </div>))}
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    )
}

export default OrderStatus;