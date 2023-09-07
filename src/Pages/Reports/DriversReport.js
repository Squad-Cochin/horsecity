////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                      DRIVER report page functionality done over here.                      //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container,  Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import List from 'list.js';
import Flatpickr from "react-flatpickr";
import { useFormik } from "formik";

/**IMPORTED */
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getDriverReport } from '../../helpers/ApiRoutes/getApiRoutes';
import config from '../../config';


const DriverReport  = () => {
    const [ driverReport, setDriverReport ] = useState([])
    const [ fromDate, setFromDate ] = useState("");
    const [ toDate, setToDate ] = useState("");

    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const pageLimit = config.pageLimit;

   /**THIS HOOK WILL RENDER INITIAL TIME SETTING THE FROMDATE BEFORE 60 DAYS TODATE CURRENT DATE */
    useEffect(()=>{
        const today = new Date();
        const sixtyDaysAgo = new Date(today);
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
        let value = {
            from_date : sixtyDaysAgo,
            to_date : today,
        }
        const data = JSON.parse(localStorage.getItem("authUser"));
        let userId = data[0]?.user[0]?.id ;

        getData(1, value,userId)
    },[])

    /**INITIAL VALUES */
    const initialValues = { 
        from_date : "",
        to_date : "",
    }
    /**VALIDATION */
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            getData(1, values)
        }
    });

    /**GET DRIVER REPORTS */
    async function getData(page, val,spId){
        setFromDate(val.from_date)
        setToDate(val.to_date)
        if(spId){
        let getAllData = await getDriverReport(page || 1, val,spId)
        setDriverReport(getAllData?.drivers);
        setPageNumber(page);
        setNumberOfData(getAllData?.totalCount);
    }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Driver Reports" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <form className="tablelist-form" onSubmit={validation.handleSubmit} >
                                    <Row className="align-items-md-center">
                                            <Col lg={5}>
                                            {/* <h4 className="card-title mb-0">Add, Edit & Remove</h4> */}
                                            <div className="mb-3">
                                                <label htmlFor="from-field" className="form-label">From date</label>
                                                <Flatpickr
                                                    className="form-control"
                                                    name='from_date'
                                                    options={{
                                                        dateFormat: "d-m-Y",
                                                        maxDate :new Date()
                                                    }}
                                                    value= {fromDate}
                                                    onChange={(dates) => {validation.setFieldValue('from_date', dates[0]); setFromDate(dates[0])}}
                                                    placeholder= "Select from date"
                                                    required
                                                />
                                            </div>
                                            </Col>
                                            <Col lg={5}>
                                            <div className="mb-3">
                                                <label htmlFor="to-field" className="form-label">To date</label>
                                                <Flatpickr
                                                    className="form-control"
                                                    name='to_date'
                                                    options={{
                                                        dateFormat: "d-m-Y",
                                                        maxDate :new Date(),
                                                        minDate : fromDate
                                                    }}
                                                    value= { toDate }
                                                    onChange={(dates) => {validation.setFieldValue('to_date', dates[0]); setToDate(dates[0])}}
                                                    placeholder="Select to date"
                                                    required
                                                />
                                            </div>
                                            </Col>
                                            <Col lg={2} className="mt-3">
                                                <button type="submit" className="btn btn-success" id="add-btn">Submit</button>
                                            </Col>
                                        </Row>
                                    </form>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                    <th className="index" data-sort="index">#</th>
                                                        <th className="sort" data-sort="month">Driver Name</th>
                                                        <th className="sort" data-sort="number">Email</th>
                                                        <th className="sort" data-sort="number">Contact Number</th>
                                                        <th className="sort" data-sort="number">Registration Date</th>
                                                        <th className="sort" data-sort="number">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {driverReport.map((item, index)=>(
                                                    <tr key={index}> 
                                                        <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                                                        <td className="customer_name">{item.driver_name}</td>
                                                        <td className="phone">{item.email}</td>
                                                        <td className="phone">{item.contact_number}</td>
                                                        <td className="date">{item.created_at}</td>
                                                        <td className="phone">{item.status}</td>
                                                    </tr>
                                                 ))}
                                                
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                {pageNumber > 1 ?
                                                    <Link 
                                                        className="page-item pagination-prev disabled" 
                                                        onClick={()=> getData(pageNumber - 1, { from_date : fromDate, to_date : toDate })}
                                                    >
                                                        Previous
                                                    </Link>
                                                : null }
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                {numberOfData > pageLimit * pageNumber ? 
                                                    <Link className="page-item pagination-next" onClick={() => getData(pageNumber + 1, { from_date : fromDate, to_date : toDate })}>
                                                        Next
                                                    </Link> 
                                                : null }
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default DriverReport ;
