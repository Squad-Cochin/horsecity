import React, { useState, useEffect } from 'react';

import { Row, Col } from 'reactstrap';

// import { LatestTransationData } from '../../CommonData/Data/index';
import { getLatestEnquiryData } from '../../helpers/ApiRoutes/getApiRoutes';

const LatestTransation = () => {
    
    const[latestEnquiriesData, setlatestEnquiriesData] = useState([]);
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
        enquiriesDataLatest();
    }, [userId, roleName, roleId]);

    async function enquiriesDataLatest()
    {
        // console.log(`Came inside the monthly sales graph data`);
        let sgData = await getLatestEnquiryData(data[0]?.user[0]?.id);
        // console.log(`Result from the latest five enquiries: `, sgData);
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
                                                {/* <div className="form-check">
                                                    <label className="form-check -label" htmlFor="customCheckall"></label>
                                                </div> */}
                                            </th>
                                            {/* <th scope="col" style={{ width: "60px" }}></th> */}
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
                                                    {/* <input type="checkbox" className="form-check-input" id={item.id}
                                                    /> */}
                                                    <label className="form-check-label" htmlFor={item.id}></label>
                                                </div>
                                            </td>
                                            {/* <td>
                                                {item.src ? <img src={item.src} alt="user" className="avatar-xs rounded-circle" /> : <div className="avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-soft-primary text-success">
                                                        {item.clientName.charAt(0)}
                                                    </span>
                                                </div>}
                                            </td> */}
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
                                            {/* <td>
                                                <button type="button" className="btn btn-outline-success btn-sm me-1">Edit</button>
                                                <button type="button" className="btn btn-outline-danger btn-sm me-1">Cancel</button>
                                            </td> */}
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