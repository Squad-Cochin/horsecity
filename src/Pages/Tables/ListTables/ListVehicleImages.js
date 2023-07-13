import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import { useParams } from 'react-router-dom';
import { getVehiclesData } from '../../../helpers/ApiRoutes/authApiRoutes'
import { removeVehicleImage } from '../../../helpers/ApiRoutes/removeApiRoutes';
const ListVehicleImages = () => {

    const [vhImages, setVhImages] = useState([]);
    const [vehicle , setVehicle] =useState({})
    const [image_view, setImageView] = useState()
    const [modal_list, setmodal_list] = useState(false);
    const [updateImage, setUpdateImage] = useState("")
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            console.log("Id",id);
            let vehicleId = 2;
            let getvehicles = getVehiclesData();
            const data = getvehicles?.find((item) => item?.id === vehicleId);
            setVehicle(data);
            setVhImages(data?.images);
            console.log("data", data);
        }

    }, [])
    const initialValues = {
        image_title: '',
        file: '',

    };

    // Later in your code, when setting the initial state

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            values.file = updateImage;
            console.log(values);
            setmodal_list(false);
            initialValues.image_title = '';
            initialValues.file = '';

        }
    });

    function tog_list() {
        setmodal_list(!modal_list);
    }
    function remove_data(vehicle_id, image_id) {
        removeVehicleImage(vehicle_id, image_id)
    }
    const handleCertificateLogoChange = (event) => {
        const file = event.target.files[0];
        setUpdateImage(file)
        setImageView(URL.createObjectURL(file));
    };

    let title = `${vehicle?.make} ${vehicle?.models}`


    return (
     
        <React.Fragment>
               {id > 0 ? (
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem={title} />
                    <div id="customerList">
                        <Row className="g-4 mb-3">
                            <Col className="col-sm-auto">
                                <div className="d-flex gap-1">
                                    <Button
                                        color="success"
                                        className="add-btn"
                                        onClick={() => tog_list()}
                                        id="create-btn"
                                    >
                                        <i className="ri-add-line align-bottom me-1"></i>{" "}
                                        Add
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <div className="table-responsive table-card mt-3 mb-1">
                            <table
                                className="table align-middle table-nowrap"
                                id="customerTable"
                            >
                                <thead className="table-light">
                                    <tr>
                                        <th className="index" data-sort="index">
                                            #
                                        </th>
                                        <th className="sort" data-sort="quatationId">
                                            Image
                                        </th>
                                        <th className="sort" data-sort="enquiryId">
                                            Title
                                        </th>
                                        <th className="sort" data-sort="action">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list form-check-all">
                                    {vhImages.map((imageItem, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td className="quatationId">
                                                <img
                                                    src={imageItem?.url}
                                                    alt={`Static Image ${index + 1}`}
                                                    className="image-size"
                                                />
                                            </td>
                                            <td className="enquiryId">{imageItem?.title}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-danger remove-item-btn"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#deleteRecordModal" onClick={() => remove_data(2, imageItem?.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                            <div className="noresult" style={{ display: "none" }}>
                                <div className="text-center">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/msoeawqm.json"
                                        trigger="loop"
                                        colors="primary:#121331,secondary:#08a88a"
                                        style={{ width: "75px", height: "75px" }}
                                    ></lord-icon>
                                    <h5 className="mt-2">Sorry! No Result Found</h5>
                                    <p className="text-muted mb-0">
                                        We've searched more than 150+ Orders We did not find
                                        any orders for you search.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end">
                            <div className="pagination-wrap hstack gap-2">
                                <Link
                                    className="page-item pagination-prev disabled"
                                    to="#"
                                >
                                    Previous
                                </Link>
                                <ul className="pagination customers-pagination mb-0"></ul>
                                <Link className="page-item pagination-next" to="#">
                                    Next
                                </Link>
                            </div>
                        </div>
                    </div>

                </Container>
            </div>
            ) : null}
            {/* Add Modal */}
            <Modal
                className="extra-width"
                isOpen={modal_list}
                toggle={() => {
                    tog_list();
                }}
                centered
            >
                <ModalHeader
                    className="bg-light p-3"
                    id="exampleModalLabel"
                    toggle={() => {
                        tog_list();
                    }}
                >
                    Add Image
                </ModalHeader>
                <form className="tablelist-form" onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="customerName-field" className="form-label">
                                Image Title
                            </label>
                            <input
                                type="text"
                                name="image_title"
                                id="customerName-field"
                                className="form-control"
                                value={validation.values.image_title}
                                placeholder="Enter image title"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                required
                            />
                        </div>

                        {/* Certificate Image */}
                        <div className="mb-3">
                            <label htmlFor="certificateNumber-field" className="form-label">Add Image</label>
                            <div className="col-md-10">

                                <div>

                                    {image_view && <img src={image_view} alt="Certificate Image Preview" style={{ maxWidth: '100px' }} />}
                                </div>


                                <input
                                    className="form-control"
                                    name="certification_or_license_img"
                                    type="file"
                                    placeholder="Certificate Image"
                                    onChange={handleCertificateLogoChange}
                                />

                            </div>


                            {/* <input
                        type="file"
                        id="certificateNumber-field"
                        name="certification_or_license_img"
                        className="form-control"
                        placeholder="Upload Certificate image"
                        required
                        /> */}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => {
                                    setmodal_list(false);
                                }}
                            >
                                Close
                            </button>
                            <button type="submit" className="btn btn-success" id="add-btn">
                                Add Image
                            </button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>




        </React.Fragment>
   
    );
};

export default ListVehicleImages;