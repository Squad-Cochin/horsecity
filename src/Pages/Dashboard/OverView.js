import React, { useState, useEffect } from 'react';
//i18n
import { withTranslation } from "react-i18next";
import { Card, CardBody, Col, Row } from "reactstrap";

import LineColumnArea from './LineColumnArea';
import { getMonthlySalesData } from '../../helpers/ApiRoutes/getApiRoutes';
import withRouter from "../../components/Common/withRouter";
const MonthlySalesReport = (props) =>
{    
    const[salesGraphData, setSalesGraphData] = useState([]);
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
        monthlySalesGraphdata();
    }, [userId, roleName, roleId]);

    async function monthlySalesGraphdata()
    {
        let sgData = await getMonthlySalesData(data[0]?.user[0]?.id);
        setSalesGraphData(sgData?.revenue?.options);
    }

    
    return (
        <React.Fragment>
            <Col xl={8}>
                <Card>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                                <h5 className="card-title">{props.t("Monthly Sales Report")}</h5>
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

export default withRouter(withTranslation()(MonthlySalesReport));
