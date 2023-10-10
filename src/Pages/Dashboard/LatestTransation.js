import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { getLatestEnquiryData } from '../../helpers/ApiRoutes/getApiRoutes';

const LatestTransation = () => {
    
    const[latestEnquiriesData, setlatestEnquiriesData] = useState([]);
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
        let sgData = await getLatestEnquiryData(data[0]?.user[0]?.id);
        setlatestEnquiriesData(sgData);
    }
    
    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Latest Enquiries</h4>

                            <div className="table-responsive">
                                <table className="table table-centered table-nowrap mb-0">

                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ width: "50px" }}>
                                            </th>
                                            <th>Sr.no</th>
                                            <th scope="col">User Name & Name</th>
                                            <th scope="col">Enquiry Date</th>
                                            <th scope="col">Pickup Location</th>
                                            <th scope="col">Drop Location</th>
                                            <th scope="col">Horses</th>
                                            <th scope="col">Status</th>
                                            {/* <th scope="col">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {latestEnquiriesData.map((item, key) => (<tr key={key}>
                                            <td>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor={item.id}></label>
                                                </div>
                                            </td>
                                            <th scope="row">{(key + 1)}</th>
                                            <td>
                                                <p className="mb-0 font-size-15">{item.user_name}</p>
                                                <h5 className="font-size-15 mb-0">{item.name}</h5>
                                            </td>
                                            <td>{item.date}</td>
                                            <td>{item.pickup_location}</td>
                                            <td>{item.drop_location}</td>

                                            <td>
                                                {item.no_of_horse}
                                            </td>
                                            <td>
                                                {item.status}
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default LatestTransation;