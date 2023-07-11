import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker
import Flatpickr from "react-flatpickr";

// Import Images
// import avatar1 from "../../assets/images/users/avatar-1.jpg";
// import avatar2 from "../../assets/images/users/avatar-2.jpg";
// import avatar3 from "../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../assets/images/users/avatar-4.jpg";
// import avatar5 from "../../assets/images/users/avatar-5.jpg";

//Import monthly reports
import { getMonthlyReports } from '../../helpers/ApiRoutes/authApiRoutes'
import { Vehicles } from '../../CommonData/Data';
import { addNewMonthlyReport } from '../../helpers/ApiRoutes/addApiRoutes';
import { updateMonthlyReport } from '../../helpers/ApiRoutes/editApiRoutes';
import { useFormik } from "formik";
const MonthlyReportsList  = () => {

    const [ modal_list, setmodal_list] = useState(false);
    //For controlling Add and Edit
    const [ add_list, setAdd_list ] = useState(false);
    const [ reports, setReports] = useState([])
    const [ report, setReport] = useState([])
    function tog_list(param,productId) {
        if(param === 'ADD'){
            setAdd_list(!add_list);
        }
        const data = reports?.find((item)=>item?.id === productId)
        setReport([data]);
        setmodal_list(!modal_list);

    }
    
    const initialValues = {
        month: !add_list ? reports[0]?.month : '',
        total_bookings: !add_list ? reports[0]?.total_bookings : '',
        canceled  : !add_list ? reports[0]?.canceled : '',
        break_down_reassign: !add_list ? reports[0]?.break_down_reassign : '',
        amount_achived: !add_list ? reports[0]?.amount_achived : '',

      };
      
      // Later in your code, when setting the initial state
  
      
      
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
                console.log(values);
                if(add_list){
                    //add new
                    console.log("add new");
                    addNewMonthlyReport(values);
                    setAdd_list(false);
                    setmodal_list(false);
                }else{
                    //update previes one
                    console.log("update previues one ");
                    updateMonthlyReport(values);
                    setAdd_list(false);
                    setmodal_list(false);
                 
                }
    
        }
      });

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }
    useEffect(()=>{
    let getReports = getMonthlyReports();
    setReports(getReports)
    },[])
    useEffect(() => {

        // const attroptions = {
        //     valueNames: [
        //         'name',
        //         'born',
        //         {
        //             data: ['id']
        //         },
        //         {
        //             attr: 'src',
        //             name: 'image'
        //         },
        //         {
        //             attr: 'href',
        //             name: 'link'
        //         },
        //         {
        //             attr: 'data-timestamp',
        //             name: 'timestamp'
        //         }
        //     ]
        // };
        // const attrList = new List('users', attroptions);
        // attrList.add({
        //     name: 'Leia',
        //     born: '1954',
        //     image: avatar5,
        //     id: 5,
        //     timestamp: '67893'
        // });

        // Existing List
        const existOptionsList = {
            valueNames: ['contact-name', 'contact-message']
        };

        new List('contact-existing-list', existOptionsList);

        // Fuzzy Search list
        new List('fuzzysearch-list', {
            valueNames: ['name']
        });

        // pagination list

        new List('pagination-list', {
            valueNames: ['pagi-list'],
            page: 3,
            pagination: true
        });
    });

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Monthly Reports" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Add, Edit & Remove</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                    <Button color="success" className="add-btn"onClick={() => tog_list('ADD')} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
                                                    <Button color="soft-danger"
                                                    // onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button>
                                                </div>
                                            </Col>
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search" placeholder="Search..." />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col" style={{ width: "50px" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                            </div>
                                                        </th>
                                                        <th className="sort" data-sort="month">Month</th>
                                                        <th className="sort" data-sort="number">Total Bookings</th>
                                                        <th className="sort" data-sort="number">Canceled</th>
                                                        <th className="sort" data-sort="number">Breakdown & Reassign</th>
                                                        <th className="sort" data-sort="number">Amount Achieved </th>
                                            
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {reports.map((item)=>(

                                        
                                                    <tr key={item.id}> 
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                            </div>
                                                        </th>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                        <td className="customer_name">{item.month}</td>
                                                        <td className="phone">{item.total_bookings}</td>
                                                        <td className="phone">{item.canceled}</td>
                                                        <td className="phone">{item.break_down_reassign}</td>
                                                        <td className="date">{item.amount_achived}</td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn" onClick={() => tog_list('EDIT',item.id)}
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>
                                                                <div className="remove">
                                                                    <button className="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Remove</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                 ))}
                                                
                                                </tbody>
                                            </table>
                                            <div className="noresult" style={{ display: "none" }}>
                                                <div className="text-center">
                                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                                        colors="primary:#121331,secondary:#08a88a" style={{ width: "75px", height: "75px" }}>
                                                    </lord-icon>
                                                    <h5 className="mt-2">Sorry! No Result Found</h5>
                                                    <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                                                        orders for you search.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                <Link className="page-item pagination-prev disabled" to="#">
                                                    Previous
                                                </Link>
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                <Link className="page-item pagination-next" to="#">
                                                    Next
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* <Row>
                 <Col xl={4}>
                            <Card>
                           
                                <CardBody>    
                                    <div id="users">
                                        <SimpleBar style={{ height: "242px" }} className="mx-n3">
                                            <ListGroup className="list mb-0" flush>
                                                <ListGroupItem data-id="1">
                                              </ListGroupItem>
                                            </ListGroup>
                                        </SimpleBar>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>


                       
                    </Row> */}

                
                </Container>
            </div>

            {/* Add Modal */}
            <Modal className="extra-width" isOpen={modal_list}  toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}>{add_list ?  'Add monthly report' : 'Edit monthly report' } </ModalHeader>
                <form className="tablelist-form"
                   onSubmit={validation.handleSubmit}>
                    <ModalBody>
                    <div className="mb-3">
                    <label htmlFor="month-field" className="form-label">Month</label>
                    <input
                        type="text"
                        id="month-field"
                        className="form-control"
                        name="month"
                        value={validation.values.month || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Month"
                        required
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="total_bookings-field" className="form-label">Total Bookings</label>
                    <input
                        type="number"
                        id="total_bookings-field"
                        className="form-control"
                        name="total_bookings"
                        value={validation.values.total_bookings || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Total Bookings"
                        required
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="canceled-field" className="form-label">Canceled</label>
                    <input
                        type="number"
                        id="canceled-field"
                        className="form-control"
                        name="canceled"
                        value={validation.values.canceled || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Canceled"
                        required
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="break_down_reassign-field" className="form-label">Break Down Reassign</label>
                    <input
                        type="number"
                        id="break_down_reassign-field"
                        className="form-control"
                        name="break_down_reassign"
                        value={validation.values.break_down_reassign || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Break Down Reassign"
                        required
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="amount_achived-field" className="form-label">Amount Achieved</label>
                    <input
                        type="number"
                        id="amount_achived-field"
                        className="form-control"
                        name="amount_achived"
                        value={validation.values.amount_achived || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Amount Achieved"
                        required
                    />
                    </div>

                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() =>{ setmodal_list(false); setAdd_list(false);}}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ?  'Add reports' : 'Update reports' }</button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} className="modal fade zoomIn" id="deleteRecordModal" centered >
                <div className="modal-header">
                    <Button type="button" onClick={() => setmodal_delete(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
                <ModalBody>
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you Sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_delete(false)}>Close</button>
                        <button type="button" className="btn w-sm btn-danger " id="delete-record">Yes, Delete It!</button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default MonthlyReportsList ;
