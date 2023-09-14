////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Driver page functionality done over here.                            //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from 'react-router-dom';


//IMPORTED FILES
import { removeTaxation } from '../../helpers/ApiRoutes/removeApiRoutes'
import { addNewTaxation } from '../../helpers/ApiRoutes/addApiRoutes';
import { updateTaxation, updateTaxationStatus} from '../../helpers/ApiRoutes/editApiRoutes';
import { getTaxationsData, getSingleTaxationData } from '../../helpers/ApiRoutes/getApiRoutes';
import { useFormik } from "formik";
import config from '../../config';
const TaxationDeatails = () => {

    const [ modal_list, setmodal_list] = useState(false);
    const [ taxations, setTaxations] = useState([]);
    const [ taxation, setTaxation] = useState([]);
    const [ add_list, setAdd_list ] = useState(false);
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const [ errors, setErrors ] = useState("")
    const pageLimit = config.pageLimit;
    const [pageTitle, setPageTitle] = useState('KailPlus');
    /**Initial render wIll load this hook */
    useEffect(() => {
        
        const settings = JSON.parse(localStorage.getItem("settingsData"));
        setPageTitle(settings.application_title);
        getAllData(1)
    }, []);

    // function for get data all service provider data
    async function getAllData(page) {
        let getTaxations = await getTaxationsData(page || 1);
        setTaxations(getTaxations.taxations);
        setPageNumber(page);
        setNumberOfData(getTaxations.totalCount);
    }
    
    /**IT WILL OPEN ADD & EDIT POPUP */
    async function tog_list(param,productId) {
        if(param === 'ADD'){
            setAdd_list(!add_list);
        } else {
            let taxationData = await getSingleTaxationData(productId)
            setTaxation(taxationData.taxation);
        }
        setmodal_list(!modal_list);
    }

    /**INITIAL VALUES */
    const initialValues = {
        name : !add_list ? taxation[0]?.name : '',
        type : !add_list ? taxation[0]?.type : '',
        value : !add_list ? taxation[0]?.value : '',
      };
    /**VALIDATION */
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {

                if(add_list){
                    //add new
                    addTaxation(values)
                }else{
                    //update previes one
                    editTxations(values)
                }
        }
      });


    // Add Taxation
    async function addTaxation(val){
        let addTax = await addNewTaxation(val);
        if(addTax.code === 200){
            setErrors("")
            setAdd_list(false);
            setmodal_list(false);
            getAllData(pageNumber)
        }else{
            setErrors("")
            setErrors(addTax.message)
        }
    }

    /**Function for changing service provider status */
    function toggleStatus(button, taxationId) {
        var currentStatus = button.innerText.trim();
        const taxation = taxations.find((t) => t.id === taxationId);
        updateTaxationStatus(taxation.id)
        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            if (taxation) {
                taxation.status = 'INACTIVE';
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            if (taxation) {
                taxation.status = 'ACTIVE';
            }
        }
    }

    // Update service provider
    async function editTxations(data){
        let updateTax = await updateTaxation(taxations[0]?.id, data);
        if(updateTax.code === 200){
            setErrors("")
            setAdd_list(false);
            setmodal_list(false);
            getAllData(pageNumber)
        }else{
            setErrors("")
            setErrors(updateTax.message)
        }
    }

    /**This function is used to remove a service provider*/
    async function remove_data(id) {
      let tax =   await removeTaxation(id)
      if (tax.code === 200) {
        getAllData(pageNumber)
    } 
    }
    document.title = `Taxation | ${pageTitle} `;
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Taxations" />
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
                                                    <Button color="success" className="add-btn" onClick={() => tog_list('ADD')}  id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="table-responsive table-card mt-3 mb-1">
                                        <table className="table align-middle table-nowrap" id="customerTable">
                                        <thead className="table-light">
                                            <tr>
                                            <th className="index" data-sort="index">#</th>
                                            <th className="sort" data-sort="name">Name</th>
                                            <th className="sort" data-sort="type">Type</th>
                                            <th className="sort" data-sort="value">Value</th>
                                            <th className="sort" data-sort="created_at">Created At</th>
                                            <th className="sort" data-sort="status">Status</th>
                                            <th className="sort" data-sort="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list form-check-all">
                                            {taxations.map((item,index) => (
                                            <tr key={item.id}>
                                                <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                                                <td className="name">{item.name}</td>
                                                <td className="type">{item.type}</td>
                                                <td className="value">{item.value}</td>
                                                <td className="created_at">{item.created_at}</td>
                                                <td className="status">
                                                    {item.status === "ACTIVE" ?
                                                        <button
                                                            className="btn btn-sm btn-success status-item-btn"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#showModal"
                                                            onClick={(event) => toggleStatus(event.target, item.id)}
                                                        >
                                                            {item.status}
                                                        </button> :
                                                        <button
                                                            className="btn btn-sm btn-danger status-item-btn"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#showModal"
                                                            onClick={(event) => toggleStatus(event.target, item.id)}
                                                        >
                                                            {item.status}
                                                        </button>
                                                    }
                                                </td>
                                                <td>
                                                <div className="d-flex gap-2">
                                                    <div className="edit">
                                                    <button
                                                        className="btn btn-sm btn-success edit-item-btn"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#showModal"
                                                        onClick={() => tog_list('EDIT',item.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    </div>
                                                    <div className="remove">
                                                    <button
                                                        className="btn btn-sm btn-danger remove-item-btn"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#deleteRecordModal"
                                                        onClick={() => remove_data(item?.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                    </div>
                                                </div>
                                                </td>
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
                                                        onClick={()=> getAllData(pageNumber - 1)}
                                                    >
                                                        Previous
                                                    </Link>
                                                : null }
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                {numberOfData > pageLimit * pageNumber ? 
                                                    <Link className="page-item pagination-next" onClick={() => getAllData(pageNumber + 1)}>
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

            {/* Add Modal */}
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { setmodal_list(false); setAdd_list(false); }}  centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { setmodal_list(false); setAdd_list(false); }}>{add_list ?  'Add taxation' : 'Edit taxation' } </ModalHeader>
                <form className="tablelist-form"
                 onSubmit={validation.handleSubmit}>
                    <ModalBody>
                    {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                    {/* Tax Name */}
                    <div className="mb-3">
                        <label htmlFor="tax-field" className="form-label">Name</label>
                        <input
                        type="text"
                        id="tax-field"
                        className="form-control"
                        name="name"
                        placeholder="Enter Tax Name"
                        value={validation.values.name || ""}
                        onChange={validation.handleChange}
                        required
                        />
                    </div>

                    {/* Tax Type */}
                    <div className="mb-3">
                        <label htmlFor="taxtype-field" className="form-label">Tax Type</label>
                        <select
                            data-trigger
                            name="type"
                            id="taxtype-field"
                            className="form-control"
                            value={validation.values.type || ""}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            required
                        >
                            <option value="">Select Tax Type</option>
                            <option value="PERCENTAGE">PERCENTAGE</option>
                            <option value="FLAT">FLAT</option>
                        </select>
                    </div>

                    {/* Tax Value */}
                    <div className="mb-3">
                        <label htmlFor="value-field" className="form-label">Value</label>
                        <input
                        type="text"
                        id="value-field"
                        className="form-control"
                        name="value"
                        value={validation.values.value || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Value"
                        required
                        />
                    </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() =>{ setmodal_list(false); setAdd_list(false);}}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ?  'Add taxation' : 'Update taxation' }</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default TaxationDeatails;
