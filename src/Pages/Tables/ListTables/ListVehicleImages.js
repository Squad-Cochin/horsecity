/////////////////////////////////////////////////////////////////////////////////////////////
//      The design of the vehicles images overall functionalities are coded in this file   //
//      The file contain the view all images of a particular vehicle data model            //
//      The object and functionalities are written in this file.                           //
/////////////////////////////////////////////////////////////////////////////////////////////


// Importing the react component
import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
// import { Link } from 'react-router-dom';

// The code you provided imports the useFormik hook from the "formik" library. The useFormik hook is a custom hook provided by Formik, which is a popular form library for React.
import { useFormik } from "formik";
import { useParams } from 'react-router-dom';

//The purpose of the Breadcrumbs component is to display a breadcrumb navigation element. 
// import Breadcrumbs from "../../../components/Common/Breadcrumb";

//Import Vehicle image data
import { getVehicleImageData } from '../../../helpers/ApiRoutes/getApiRoutes'
//Import remove vehicle image data
import { removeVehicleImage } from '../../../helpers/ApiRoutes/removeApiRoutes';
import { addNewImage } from '../../../helpers/ApiRoutes/addApiRoutes';
import { updateVechileImageStatus } from '../../../helpers/ApiRoutes/editApiRoutes';
// import { func } from 'prop-types';

// The name of the ListVehicleImages function. Which will be executed and used all over program. This funtion is having all the code
const ListVehicleImages = () => 
{
    const [vhImages, setVhImages] = useState([]); // State variable to store vehicle images
    // const [vehicle, setVehicle] = useState({}); // State variable to store a single vehicle
    const [image_view, setImageView] = useState(); // State variable to store the image view
    const [modal_list, setmodal_list] = useState(false); // State variable to control list modal visibility
    const [updateImage, setUpdateImage] = useState(""); // State variable to store the updated image
    const [ errors, setErrors ] = useState("")
    const { id } = useParams(); // Retrieve the 'id' parameter from the URL using the 'useParams' hook
    // let title = `${vehicle?.make} ${vehicle?.models}`; // Generate a title using the 'make' and 'models' properties of the 'vehicle' object

    useEffect(() => {
        if (id) {
            getAllData()
            // let getvehicles = getVehicleImageData();
            // const data = getvehicles?.find((item) => item?.id === parseInt(id));
            // setVehicle(data); // Set the 'vehicle' state to the found vehicle data
            // setVhImages(data?.images); // Set the 'vhImages' state to the vehicle images
        }
    }, []);

    // The intial values of the variables
    const initialValues = 
    {
        title: '',
        image: '',
    };

    // function for get data all Vechile data
    async function getAllData() {
        let getvehicleImages = await getVehicleImageData(id);
        console.log("ss",getvehicleImages)
        setVhImages(getvehicleImages)
        // setSproviders(getSP.serviceProviders);
        // setVehicles(getvehicles?.vehicles);
        // setPageNumber(page);
        // setNumberOfData(getvehicles?.totalCount);
    }

    // The below function is the Status button
    function toggleStatus(button, vehiclesId) 
    {
        var currentStatus = button.innerText.trim();
        let getvehicles = getVehicleImageData();
        if (currentStatus === 'ACTIVE') 
        {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            // Find the corresponding vehicle by ID
            const vehicle = vhImages.find((v) => v.id === vehiclesId);
            if (vehicle) 
            {
                vehicle.status = 'INACTIVE';
            }
        }
        else if (currentStatus === 'INACTIVE')
        {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            // Find the corresponding vehicle by ID
            const vehicle = vhImages.find((v) => v.id === vehiclesId);
            if (vehicle) 
            {
                vehicle.status = 'ACTIVE';
            }
        }   
    }

    // The below function is showing the data. 
    function tog_list() 
    {
        setmodal_list(!modal_list);
    }
    
    // The below function is for going to the previous page
    const previousPage = () => 
    {
        window.history.back(); // Go back to the previous page
    };
    
    // The below function is for chnaing the vehicle image
    const handleVehicleImageChange = (event) => 
    {
        const file = event.target.files[0];
        setUpdateImage(file);
        setImageView(URL.createObjectURL(file));
    };

    const validation = useFormik
    ({
        enableReinitialize: true, // Flag to enable reinitialization of initial values
        initialValues, // Initial values for the form
        onSubmit: (values) =>
        {
          values.image = updateImage; // Assign the updated image file to the 'file' field in form values
          addVechileImage(values)
        },
    });

    async function addVechileImage(val){
        let addImg = await addNewImage(val, id);
        if(addImg.code === 200){
            setErrors("")
            setmodal_list(false);
            initialValues.title = ''; // Reset the 'image_title' field in initial values
            initialValues.image = ''; // Reset the 'file' field in initial values
            getAllData()
        }else{
            setErrors("")
            setErrors(addImg.message)
        }
    }

     // The below function is the Status button
     function toggleStatus(button, vehiclesId)
     {
         console.log("vid",vehiclesId)
         var currentStatus = button.innerText.trim();
         const vehicle = vhImages.find((v) => v.id === vehiclesId);
         updateVechileImageStatus(vehicle.id)
         if (currentStatus === 'ACTIVE')
         {
             button.innerText = 'INACTIVE';
             button.classList.remove('btn-success');
             button.classList.add('btn-danger');
             if (vehicle)
             {
                 vehicle.status = 'INACTIVE';
             }
         }
         else if (currentStatus === 'INACTIVE')
         {
             button.innerText = 'ACTIVE';
             button.classList.remove('btn-danger');
             button.classList.add('btn-success');
             if (vehicle)
             {
                 vehicle.status = 'ACTIVE';
             }
         }
     }

     /**This function is used to remove a service provider*/
    async function remove_data(id) {
        await removeVehicleImage(id)
        window.location.reload();
    }

    return (     
        <React.Fragment>
        {id > 0 ? (
            <div className="page-content">
                <Container fluid>
                    {/* Header of the Page */}
                    {/* <Breadcrumbs title="Tables" breadcrumbItem={title} /> */}
                    <div id="customerList">
                        <Row className="g-4 mb-3">
                            <Col className="col-sm-auto">
                                <div className="d-flex gap-1">
                                    {/* The below button is going back to vehicle list page */}
                                    <Button color="primary" className="add-btn" onClick={previousPage} id="previous-btn">
                                        <i className="ri-arrow-left-line align-bottom me-1"></i> Vehicle List
                                    </Button>
                                     {/* The below button is for add the vehicle */}
                                    <Button color="success" className="add-btn" onClick={() => tog_list()} id="create-btn">
                                        <i className="ri-add-line align-bottom me-1"></i>{" "}
                                        Add
                                    </Button>
                                </div>  
                            </Col>
                        </Row>

                        <div className="table-responsive table-card mt-3 mb-1">
                            <table className="table align-middle table-nowrap" id="customerTable" >
                                <thead className="table-light">
                                    <tr>
                                        {/* This are the columns and column heading in the vehicle page */}
                                        <th className="index" data-sort="index"> # </th>
                                        <th className="sort" data-sort="vehicleimage"> Image </th>
                                        <th className="sort" data-sort="vehicletitle"> Title </th>
                                        <th className="sort" data-sort="created_at"> Created At </th>
                                        <th className="sort" data-sort="status"> Status </th>
                                        <th className="sort" data-sort="action"> Actions </th>
                                    </tr>
                                </thead>
                                <tbody className="list form-check-all">
                                    {/* The data we will be getting to showcase on vehicle page is
                                    from a object. We will map and show them one by one. The below function will be used this */}
                                    {/* 'getVehiclesData' is having all the enquiry data. */}
                                    {/* Index is the number of the data. i.e Serial number */}
                                    {vhImages.map((imageItem, index) => (
                                        <tr key={index}>
                                            {/* Below we are intialize the enquiry data */}
                                            <th scope="row">{index + 1}</th>
                                            <td className="vehicleimage"> <img src={imageItem?.url} alt={`Static Image ${index + 1}`} className="image-size" /> </td>
                                            <td className="vehicletitle">{imageItem?.title}</td>
                                            <td className="created_at">{imageItem?.uploaded_at}</td>
                                            {/* This is the place from where we are calling the status button and function */}
                                            <td>{imageItem.status === "ACTIVE" ?
                                                <button
                                                    className="btn btn-sm btn-success status-item-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#showModal"
                                                    onClick={(event) => toggleStatus(event.target, imageItem.id)}
                                                >
                                                    {imageItem.status}
                                                </button> :
                                                <button
                                                    className="btn btn-sm btn-danger status-item-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#showModal"
                                                    onClick={(event) => toggleStatus(event.target, imageItem.id)}
                                                >
                                                    {imageItem.status}
                                                </button>
                                                }
                                            </td>
                                            {/* This is the place from where we are calling the Remove button and function */}
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal" onClick={() => remove_data(imageItem?.id)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* If there are no data to show, then thic line of code will be executed */}
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
                        {/* the below is having the code of the pagination of the page.
                            The previous and next button are also in side this function */}
                        {/* <div className="d-flex justify-content-end">
                            <div className="pagination-wrap hstack gap-2">
                                <Link className="page-item pagination-prev disabled"to="#"> Previous </Link>
                                <ul className="pagination customers-pagination mb-0"></ul>
                                <Link className="page-item pagination-next" to="#"> Next </Link>
                            </div>
                        </div> */}

                    </div>
                </Container>
            </div>
            ) : null}

            {/* Add vehicle image Modal */}
            {/* The below line is for the heading of pop up of edit or add vehicle image */}
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(); }}centered>
                {/* The below line is for the heading of pop up of edit and add driver */}
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }} >
                    Add Image
                </ModalHeader>
                <form className="tablelist-form" onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                        {/* The Below element is adding the title of the image of the vehicle. It will be taken when it is uploaded */}
                        {/* Done by Shaheer */}
                        <div className="mb-3">
                            <label htmlFor="customerName-field" className="form-label"> Image Title </label>
                            <input
                                type="text"
                                name="title"
                                id="customerName-field"
                                className="form-control"
                                value={validation.values.title}
                                placeholder="Enter image title"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                required
                            />
                        </div>
                        {/* The Below element is uploading the image of the vehicle. */}
                        <div className="mb-3">
                            <label htmlFor="vehicleimage-field" className="form-label">Add Image</label>
                            <div className="col-md-10">
                                <div>
                                    {image_view && <img src={image_view} alt="Vehicle Image Preview" style={{ maxWidth: '100px' }} />}
                                </div>
                                <input
                                    className="form-control"
                                    name="vehicle_image"
                                    type="file"
                                    placeholder="Vehicle Image"
                                    onChange={handleVehicleImageChange}
                                />
                            </div>
                        </div>
                    </ModalBody> {/* Here all the element will be done*/}
                    <ModalFooter> {/* All the buttons are add from the footer */}
                        {/* Close Button */}
                        <div className="hstack gap-2 justify-content-end">
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() =>
                                {
                                    setmodal_list(false);
                                }}
                            >
                                Close
                            </button>
                            
                            {/* Add image Button */}
                            <button type="submit" className="btn btn-success" id="add-btn">
                                Add Image
                            </button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </React.Fragment>   
    );
};

export default ListVehicleImages; // Export the list vehicle function function.