import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container,  Row } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker for using  date pick
import Flatpickr from "react-flatpickr";
/**Using for form validation */
import { useFormik } from "formik";

import { getInvoiceReport } from '../../helpers/ApiRoutes/getApiRoutes';
import config from '../../config';

//Import reports
const InvoiceReport  = () => {
    const [ invoiceReport, setInvoiceReport ] = useState([])
    const [ searchDate, setSearchDate ] = useState({})
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const pageLimit = config.pageLimit;

    useEffect(()=>{
        const today = new Date();
        const sixtyDaysAgo = new Date(today);
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
        console.log(today,"next",sixtyDaysAgo)
        let value = {
            from_date : sixtyDaysAgo,
            to_date : today,
        }
        getData(1, value)
    },[])

    const initialValues = { 
        from_date : "",
        to_date : "",
    }
    
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            getData(1, values)
        }
    });

    async function getData(page, val){
        setSearchDate(val)
        console.log("val",val)
        // let getAllData = await getInvoiceReport(page || 1, val)
        // setInvoiceReport(getAllData?.invoices);
        // setPageNumber(page);
        // setNumberOfData(getAllData?.totalCount);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Invoice Reports" />

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
                                                        dateFormat: "d-m-Y"
                                                    }}
                                                    value= ""
                                                    onChange={(dates) =>validation.setFieldValue('from_date', dates[0])}
                                                    placeholder="Select from date"
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
                                                        dateFormat: "d-m-Y"
                                                    }}
                                                    value= ""
                                                    onChange={(dates) =>validation.setFieldValue('to_date', dates[0])}
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
                                                        <th className="sort" data-sort="month">Customer Name</th>
                                                        <th className="sort" data-sort="month">Service Provider Name</th>
                                                        <th className="sort" data-sort="number">Invoice Id</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {invoiceReport.map((item, index)=>(
                                                    <tr key={index}> 
                                                        <th scope="row">{index + 1}</th>
                                                        <td className="customer_name">{item.customer_name}</td>
                                                        <td className="service_provider_name">{item.service_provider_name}</td>
                                                        <td className="phone">{item.invoice_id}</td>
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
                                                        onClick={()=> getData(pageNumber - 1, searchDate)}
                                                    >
                                                        Previous
                                                    </Link>
                                                : null }
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                {numberOfData > pageLimit * pageNumber ? 
                                                    <Link className="page-item pagination-next" onClick={() => getData(pageNumber + 1, searchDate)}>
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

export default InvoiceReport ;
