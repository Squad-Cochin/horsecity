
import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker
import Flatpickr from "react-flatpickr";


//Import discounts
import { getDiscountsPageData , getSingleDiscountData} from '../../helpers/ApiRoutes/getApiRoutes';
import { updateDiscountStatus } from '../../helpers/ApiRoutes/editApiRoutes';
import { removeDiscount } from '../../helpers/ApiRoutes/removeApiRoutes'
import { addNewDiscounts } from '../../helpers/ApiRoutes/addApiRoutes';
import { updateDiscounts } from '../../helpers/ApiRoutes/editApiRoutes';
import { useFormik } from "formik";

import config from '../../config';
const DiscountsDeatails = () => {

    const [modal_list, setmodal_list] = useState(false);
    const [discounts, setDiscounts] = useState([])
    const [add_list, setAdd_list] = useState(false);
    const [discount, setDiscount] = useState([]);
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const [ errors, setErrors ] = useState("") ;
    const [modal_delete, setmodal_delete] = useState(false);

    const pageLimit = config.pageLimit;


    useEffect(() => {
        getAllData(1)
    }, [])


    function toggleStatus(button, discountId) {
        var currentStatus = button.innerText.trim();
        const discount = discounts.find((d) => d.id === discountId);
        updateDiscountStatus(discount.id)
        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            if (discount) {
                discount.status = 'INACTIVE';
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            if (discount) {
                discount.status = 'ACTIVE';
            }
        }
    }


    async function tog_list(param, productId) {
        if (param === 'ADD') {
            setErrors("")
            setAdd_list(!add_list);
        }else {
            setErrors("")
            let discountData = await getSingleDiscountData(productId)
            setDiscount(discountData.discount);
        }   
        setmodal_list(!modal_list);
    }


    const initialValues = {
        name: !add_list ? discount[0]?.name : '',
        type: !add_list ? discount[0]?.type : '',
        rate: !add_list ? discount[0]?.rate : '',
    };
    // Later in your code, when setting the initial state
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            console.log(values);
            if (add_list) {
                //add new
                console.log("add new");
                addDiscount(values)
      
            } else {
                //update previes one
                console.log("update previues one ");
                editDiscounts(values)
            }

        }
    });
    // Add discount
    async function addDiscount(val){
        let addDsc = await addNewDiscounts(val);
        if(addDsc.code === 200){
            setErrors("")
            setAdd_list(false);
            setmodal_list(false);
            getAllData(pageNumber)
        }else{
            setErrors("")
            setErrors(addDsc.message)
        }
    }

        // Update Discount
        async function editDiscounts(data){
            console.log(discounts[0]?.id);
            let updateDsc = await updateDiscounts(discount[0]?.id, data);
            if(updateDsc.code === 200){
                setErrors("")
                setAdd_list(false);
                setmodal_list(false);
                getAllData(pageNumber)
            }else{
                setErrors("")
                setErrors(updateDsc.message)
            }
        }

        function tog_delete() {
            setmodal_delete(!modal_delete);
        }

  
        async function getAllData(page) {
            let getDiscounts = await getDiscountsPageData(page || 1);
            setDiscounts(getDiscounts.discounts);
            setPageNumber(page);
            setNumberOfData(getDiscounts.totalCount);
        }

        /**This function is used to remove a discount*/
        async function remove_data(id) {
            await removeDiscount(id)
            window.location.reload();
        }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Discounts" />
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
                                                    <Button color="success" className="add-btn" onClick={() => tog_list('ADD')} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>

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
                                                        <th className="sort" data-sort="abbreviation">Rate</th>
                                                        <th className="sort" data-sort="date">Created At</th>
                                                        <th className="sort" data-sort="status">status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {discounts.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                                                            <td className="name">{item.name}</td>
                                                            <td className="name">{item.type}</td>
                                                            <td className="abbreviation">{item.rate}</td>
                                                            <td className="created_at">{item.created_at}</td>
                                                            <td>
                                                            <div>
                                                            <div className="d-flex gap-2">
                                                                            <div className="status">
                                                                                <button className="btn btn-sm btn-success status-item-btn"
                                                                                    data-bs-toggle="modal" data-bs-target="#showModal"
                                                                                    onClick={(event) => toggleStatus(event.target, item.id)}>
                                                                                    {item.status}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                             </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button
                                                                            className="btn btn-sm btn-success edit-item-btn"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#showModal"
                                                                            onClick={() => tog_list('EDIT', item.id)}
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
            <Modal className="extra-width" isOpen={modal_list} toggle={() =>  { setmodal_list(false); setAdd_list(false); }}  centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() =>  { setmodal_list(false); setAdd_list(false); }}>{add_list ? 'Add discount' : 'Edit discount'}</ModalHeader>
                <form className="tablelist-form"
                    onSubmit={validation.handleSubmit}>
                    <ModalBody>
                    {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                        <div className="mb-3">
                            <label htmlFor="taxationname-field" className="form-label">Name</label>
                            <input type="text" id="taxationname-field" name='name' className="form-control" placeholder="Enter Name" value={validation.values.name || ""}
                                onChange={validation.handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="discount-type-field" className="form-label">
                                Discount Type
                            </label>
                            <select
                                data-trigger
                                name="type"
                                id="discount-type-field"
                                className="form-control"
                                value={validation.values.type || ""}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="PERCENTAGE">PERCENTAGE</option>
                                <option value="FLAT">FLAT</option>

                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="rate-field" className="form-label">Rate </label>
                            <input type="text" id="rate-field" name='rate' className="form-control" placeholder="Enter Rate" value={validation.values.rate || ""}
                                onChange={validation.handleChange} required />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); setAdd_list(false); }}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ? 'Add discount' : 'Update discount'}</button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* Remove Modal
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
            </Modal> */}
        </React.Fragment>
    );
};

export default DiscountsDeatails;
