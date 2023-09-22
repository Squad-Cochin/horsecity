/////////////////////////////////////////////////////////////////////////////////////////////
//      The design of the enquiries overall functionalities are coded in this file         //
//      The file contain the View all enquiry model, View particular enquiry data model    //
//       The object and functionalities are written in this file.                          //
/////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import Flatpickr from "react-flatpickr";

/**IMPORTED FILES */
import config from '../../../config';
import { getEnquiriesData, getSingleEnquiryData, getSPUserName, getSPVehiclesData, getSPDriverData, getDiscounts } from "../../../helpers/ApiRoutes/getApiRoutes";
import { addNewQuotaion } from "../../../helpers/ApiRoutes/addApiRoutes";
import Breadcrumbs from "../../../components/Common/Breadcrumb";


const ListEnquiriesTable = () => {

    const [view_modal, setView_modal] = useState(false);
    const [enquiry, setEnquiry] = useState(null);
    const [enquiries, setEnquiries] = useState([]);
    const [tAmount, setTAmount] = useState(0)
    const [driverAmount, setDriverAmount] = useState(0)
    const [vehicleAmount, setVehicleAmount] = useState(0)
    const [taxation, setTaxation] = useState([]);
    const [taxAmount, setTaxAmount] = useState(0)
    const [taxApplayed, setTaxApplayed] = useState("NO")
    const [finalAmount, setFinalAmount] = useState(0);
    const [modal, setModal] = useState(false);
    const [serviceProviders, setServiceProviders] = useState([]);
    const [sPVechiles, setSPVechiles] = useState([]);
    const [sPDrivers, setSPDrivers] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfData, setNumberOfData] = useState(0);
    const [module, setModule] = useState({});
    const [role, setRole] = useState("")
    const [userId, setUserId] = useState("");
    const [errors, setErrors] = useState("")
    const [pageTitle, setPageTitle] = useState('KailPlus');
    const pageLimit = config.pageLimit;
    const role_id = config.Role

    //  The useEffect hook is used to perform some initialization logic when the component mounts
    useEffect(() => {
        const settings = JSON.parse(localStorage.getItem("settingsData"));
        setPageTitle(settings.application_title);
        const data = JSON.parse(localStorage.getItem("authUser"));
        let userIdd = data[0]?.user[0]?.id
        let role_id = data[0]?.user[0]?.role_Id
        setRole(role_id)
        setUserId(userIdd);
        getAllData(1)
    }, [userId, role]);

    /**INITIAL VALUES */
    const initialValues = {
        customer_id: enquiry ? enquiry[0]?.customer_id : "",
        customer_name: enquiry ? enquiry[0]?.customer_name : "",
        enquiry_id: enquiry ? enquiry[0]?.id : "",
        vehicle_id: enquiry ? enquiry[0]?.vehicle_id : "",
        vehicle_number: enquiry ? enquiry[0]?.vehicle_number : "",
        service_provider_id: enquiry ? enquiry[0]?.service_provider_id : "",
        service_provider_name: enquiry ? enquiry[0]?.service_provider_name : "",
        trip_type: enquiry ? enquiry[0]?.trip_type : "",
        pickup_location: enquiry ? enquiry[0]?.pickup_location : "",
        pickup_country: enquiry ? enquiry[0]?.pickup_country : "",
        drop_location: enquiry ? enquiry[0]?.drop_location : "",
        drop_country: enquiry ? enquiry[0]?.drop_country : "",
        no_of_horse: enquiry ? enquiry[0]?.no_of_horse : "",
        current_amount: "",
        tax_amount: "",
        discount_amount: "",
        vehicle_amount: "",
        driver_amount: "",
        special_requirement: "",
        additional_service: "",
        transportation_insurance_coverage: "",
        drop_date: "",
        pickup_time: "",
        drop_time: "",
        pickup_date: enquiry ? enquiry[0]?.pickup_date : "",
        discount_type_id: "",
        driver_id: "",
        final_amount: "",
    };

    /**VALIDATION */
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            values.discount_amount = discountAmount;
            values.final_amount = finalAmount;
            values.tax_amount = taxAmount;
            values.current_amount = tAmount;
            addQuatation(values)
        }
    });

    /**After closing modal set state default value */
    function modalClose() {
        setEnquiry(null);
        setTAmount(0);
        setDriverAmount(0);
        setVehicleAmount(0);
        setTaxAmount(0)
        setFinalAmount(0);
        setTaxation([]);
        setTaxApplayed("NO");
        setServiceProviders([]);
        setSPVechiles([]);
        setSPDrivers([]);
        setDiscounts([]);
        setSelectedDiscount("");
        setDiscountAmount(0);
        setModal(false);
        setView_modal(false);
    }

    /**After editing will add new quotaion  */
    async function addQuatation(val) {
        let addQut = await addNewQuotaion(val)
        if (addQut.code === 200) {
            setErrors("")
            getAllData(pageNumber)
            modalClose();
        } else {
            setErrors("")
            setErrors(addQut.message)
        }
        // let getEnqData = await getEnquiriesData(1);
    }

    // function for get data all service provider data
    async function getAllData(page) {
        if (userId) {
            let getEnqData = await getEnquiriesData(page || 1, userId);
            setEnquiries(getEnqData.enquiries);
            setModule(getEnqData.module[0])
            setPageNumber(page);
            setNumberOfData(getEnqData.totalCount);
        }
    }

    /**
     * The below function is for the view buttone. It will be used for getting the details of the particular enquiry.
     */
    async function tog_view(productId) {
        let singleEnqData = await getSingleEnquiryData(productId)
        setEnquiry(singleEnqData.enquiry);
        setView_modal(prevState => !prevState);
    }
    /**CONFIRM ENQUIRY */
    const tog_confirm = async (id) => {
        setErrors("")
        let singleEnqData = await getSingleEnquiryData(id)
        let serviceProviderData = await getSPUserName()
        const sPVechilesData = await getSPVehiclesData(singleEnqData.enquiry[0]?.service_provider_id)
        setSPVechiles(sPVechilesData.vehicles)
        const sPDriverData = await getSPDriverData(singleEnqData.enquiry[0]?.service_provider_id)
        setSPDrivers(sPDriverData.drivers)
        const discountsData = await getDiscounts()
        setDiscounts(discountsData)
        setServiceProviders(serviceProviderData.serviceProviders)
        setEnquiry(singleEnqData.enquiry);
        setTaxation(singleEnqData.tax);
        setModal(!modal);
    };

    /**SETTING DRIVER & VEHICLES BASIS OF SERVICE PROVIDER */
    async function serviceProviderSelected(id) {
        const sPVechilesData = await getSPVehiclesData(id)
        const sPDriverData = await getSPDriverData(id)
        setSPDrivers(sPDriverData.drivers)
        setSPVechiles(sPVechilesData.vehicles)
    }
    /**BASIS OF CHANGING DISCOUNT WILL CHANGE TAXAMOUNT & FINAL AMOUNT */
    async function calcDiscount(val) {
        setSelectedDiscount(val);
        if (val !== "") {
            let discountType = discounts.find((d) => d.id === Number(val));
            if (discountType.type === "PERCENTAGE") {
                let discount = Number(tAmount) * (Number(discountType.rate) / 100);
                setDiscountAmount(discount)
                setFinalAmount(Number(tAmount) - Number(discount));
                if (taxApplayed === "YES") {
                    if (taxation[0]?.type === "PERCENTAGE") {
                        let taxAmount = (Number(tAmount) - Number(discount)) * (Number(taxation[0].value) / 100)
                        setTaxAmount(taxAmount)
                        setFinalAmount(Number(tAmount) - Number(discount) + Number(taxAmount));
                    } else {
                        if (Number(taxation[0].value) < (Number(tAmount) - Number(discount))) {
                            setTaxAmount(0)
                            setFinalAmount(Number(tAmount) - Number(discount));
                        } else {
                            setTaxAmount(Number(taxation[0].value))
                            setFinalAmount(Number(tAmount) - Number(discount) + Number(taxation[0].value));
                        }

                    }
                } else {
                    setTaxAmount(0)
                    setFinalAmount(Number(tAmount) - Number(discount));
                }
            } else {
                if (Number(discountType.rate) < Number(tAmount)) {
                    setDiscountAmount(Number(discountType.rate))
                    setFinalAmount(Number(tAmount) - Number(discountType.rate));
                    if (taxApplayed === "YES") {
                        if (taxation[0]?.type === "PERCENTAGE") {
                            let taxAmount = (Number(tAmount) - Number(discountType.rate)) * (Number(taxation[0].value) / 100)
                            setTaxAmount(Number(taxAmount))
                            setFinalAmount(Number(tAmount) - Number(discountType.rate));
                        } else {
                            if (Number(taxation[0].value) < (Number(tAmount) - Number(discountType.rate))) {
                                setTaxAmount(0)
                                setFinalAmount(Number(tAmount) - Number(discountType.rate));
                            } else {
                                setTaxAmount(Number(taxation[0].value))
                                setFinalAmount(Number(tAmount) - Number(discountType.rate) + Number(taxation[0].value));
                            }

                        }
                    } else {
                        setTaxAmount(0)
                        setFinalAmount(Number(tAmount) - Number(discountType.rate))
                    }
                } else {
                    setDiscountAmount(0)
                    if (taxApplayed === "YES") {
                        if (taxation[0]?.type === "PERCENTAGE") {
                            let taxAmount = (Number(tAmount)) * (Number(taxation[0].value) / 100)
                            setTaxAmount(taxAmount)
                            setFinalAmount(Number(tAmount) + Number(taxAmount));
                        } else {
                            if (Number(taxation[0].value) < (Number(tAmount))) {
                                setTaxAmount(0)
                                setFinalAmount(Number(tAmount))
                            } else {
                                setTaxAmount(taxation[0].value)
                                setFinalAmount(Number(tAmount) + Number(taxation[0].value));
                            }
                        }
                    } else {
                        setTaxAmount(0)
                        setFinalAmount(Number(tAmount))
                    }
                }
            }
        } else {
            setDiscountAmount(0)
            if (taxApplayed === "YES") {
                if (taxation[0]?.type === "PERCENTAGE") {
                    let taxAmount = (Number(tAmount)) * (Number(taxation[0].value) / 100)
                    setTaxAmount(taxAmount)
                    setFinalAmount(Number(tAmount) + Number(taxAmount));
                } else {
                    if (Number(taxation[0].value) < (Number(tAmount))) {
                        setTaxAmount(0)
                        setFinalAmount(Number(tAmount))
                    } else {
                        setTaxAmount(Number(taxation[0].value))
                        setFinalAmount(Number(tAmount) + Number(Number(taxation[0].value)))
                    }

                }
            } else {
                setTaxAmount(0)
                setFinalAmount(Number(tAmount))
            }
        }
    }
    /**BASIS OF CHANGING VEHICLE & DRIVER AMOUNT THAT TIME WILL CHANGE FINAL AMOUNT */
    async function totalAmount(val) {
        if (selectedDiscount !== "") {
            let discountType = discounts.find((d) => d.id === Number(selectedDiscount));
            if (discountType.type === "PERCENTAGE") {
                let discount = Number(val) * (Number(discountType.rate) / 100);
                setDiscountAmount(Number(discount))
                setFinalAmount(Number(val) - Number(discount));
                if (taxApplayed === "YES") {
                    if (taxation[0]?.type === "PERCENTAGE") {
                        let taxAmount = (Number(val) - Number(discount)) * (Number(taxation[0].value) / 100)
                        setTaxAmount(Number(taxAmount))
                        setFinalAmount(Number(val) - Number(discount) + Number(taxAmount));
                    } else {
                        if (taxation[0].value > (Number(val) - Number(discount))) {
                            setTaxAmount(0)
                            setFinalAmount(Number(val) - Number(discount));
                        } else {
                            setTaxAmount(Number(taxation[0].value))
                            setFinalAmount(Number(val) - Number(discount) + Number(taxation[0].value));
                        }

                    }
                } else {
                    setTaxAmount(0)
                    setFinalAmount(Number(val) - Number(discount));
                }
            } else {
                if (Number(discountType.rate) < Number(val)) {
                    setDiscountAmount(Number(discountType.rate))
                    setFinalAmount(Number(val) - Number(discountType.rate));
                    if (taxApplayed === "YES") {
                        if (taxation[0]?.type === "PERCENTAGE") {
                            let taxAmount = (Number(val) - Number(discountType.rate)) * (Number(taxation[0].value) / 100)
                            setTaxAmount(Number(taxAmount))
                            setFinalAmount(Number(val) - Number(discountType.rate) + Number(taxAmount));
                        } else {
                            if (taxation[0].value > (Number(val) - Number(discountType.rate))) {
                                setTaxAmount(0)
                                setFinalAmount(Number(val) - Number(discountType.rate));
                            } else {
                                setTaxAmount(Number(taxation[0].value))
                                setFinalAmount(Number(val) - Number(discountType.rate) + Number(taxation[0].value));
                            }

                        }
                    } else {
                        setTaxAmount(0)
                        setFinalAmount(Number(val));
                    }
                } else {
                    setDiscountAmount(0)
                    if (taxApplayed === "YES") {
                        if (taxation[0]?.type === "PERCENTAGE") {
                            let taxAmount = Number(val) * (Number(taxation[0].value) / 100)
                            setTaxAmount(taxAmount)
                            setFinalAmount(Number(val) + Number(taxAmount));
                        } else {
                            if (Number(taxation[0].value) > Number(val)) {
                                setTaxAmount(0)
                                setFinalAmount(Number(val));
                            } else {
                                setTaxAmount(Number(taxation[0].value))
                                setFinalAmount(Number(val) + Number(taxation[0].value));
                            }

                        }
                    } else {
                        setTaxAmount(0)
                        setFinalAmount(Number(val));
                    }
                }
            }
        } else {
            setDiscountAmount(0)
            setFinalAmount(Number(val));
            if (taxApplayed === "YES") {
                if (taxation[0]?.type === "PERCENTAGE") {
                    let taxAmount = Number(val) * (Number(taxation[0].value) / 100)
                    setTaxAmount(taxAmount)
                    setFinalAmount(Number(val) + taxAmount);

                } else {
                    if (Number(taxation[0].value) > Number(val)) {
                        setTaxAmount(0)
                        setFinalAmount(Number(val));

                    } else {
                        setTaxAmount(Number(taxation[0].value))
                        setFinalAmount(Number(val) + Number(taxation[0].value));
                    }

                }
            } else {
                setTaxAmount(0)
                setFinalAmount(Number(val));
            }
        }
        setTAmount(val)
    }
    /**BASIS OF CHANGING TAX AMOUNT THAT TIME WILL CHANGE FINAL AMOUNT */
    async function applyTaxation(val) {
        setTaxApplayed(val);
        if (val === "YES") {
            if (taxation[0]?.type === "PERCENTAGE") {
                let taxAmount = (Number(tAmount) - Number(discountAmount)) * (Number(taxation[0].value) / 100)
                setTaxAmount(taxAmount)
                setFinalAmount(Number(tAmount) - Number(discountAmount) + Number(taxAmount));
            } else {
                if (Number(taxation[0].value) > (Number(tAmount) - Number(discountAmount))) {
                    setTaxAmount(0)
                    setFinalAmount(Number(tAmount) - Number(discountAmount));
                } else {
                    setTaxAmount(Number(taxation[0].value))
                    setFinalAmount(Number(tAmount) - Number(discountAmount) + Number(taxation[0].value));
                }
            }
        } else {
            setTaxAmount(0)
            setFinalAmount(Number(tAmount) - Number(discountAmount))
        }

    }
    document.title = `Enquiry | ${pageTitle} `;
    // the execution of all the object and element are written inside the return. Whenever this file will be called only the code inside the return written will be returned
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Header of the Page */}
                    <Breadcrumbs title="Tables" breadcrumbItem="Enquiries" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">View</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                            </Col>
                                        </Row>
                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="index" data-sort="index">#</th>
                                                        <th className="sort" data-sort="customer_name">Customer Name</th>
                                                        {!(role === role_id.service_provider) ? (
                                                            <th className="sort" data-sort="service_provider">Service Provider Name</th>
                                                        ) : null}
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="created_date">Created At</th>
                                                        <th className="sort" colSpan={2} data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {enquiries.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                                                            <td className="customer_name">{item.customer_name}</td>
                                                            {!(role === role_id.service_provider) ? (
                                                                <td className="service_provider">{item.service_provider}</td>
                                                            ) : null}
                                                            <td className="status">{item.status}</td>
                                                            <td className="created_date">{item.created_at}</td>
                                                            <td>
                                                                {JSON.parse(module?.read || 'true') ? (
                                                                    <div className="d-flex gap-2">
                                                                        <div className="edit">
                                                                            <button className="btn btn-sm btn-success edit-item-btn" onClick={() => tog_view(item.id)}
                                                                                data-bs-toggle="modal" data-bs-target="#showModal">
                                                                                View
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ) : null}
                                                            </td>
                                                            {item.status !== "CONFIRMED" ? (
                                                                <td>
                                                                    {JSON.parse(module?.update || 'true') ? (
                                                                        <div className="d-flex gap-2">
                                                                            <div className="edit">
                                                                                <button className="btn btn-sm btn-primary edit-item-btn" onClick={() => tog_confirm(item.id)}
                                                                                    data-bs-toggle="modal" data-bs-target="#showModal">
                                                                                    Confirm
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </td>
                                                            ) : null}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>


                                            {/* The below the message when there is not data to showcase on the page */}
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
                                        {/* the below is having the code of the pagination of the page.
                                        The previous and next button are also in side this function */}
                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                {pageNumber > 1 ?
                                                    <Link
                                                        className="page-item pagination-prev disabled"
                                                        onClick={() => getAllData(pageNumber - 1)}
                                                    >
                                                        Previous
                                                    </Link>
                                                    : null}
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                {numberOfData > pageLimit * pageNumber ?
                                                    <Link className="page-item pagination-next" onClick={() => getAllData(pageNumber + 1)}>
                                                        Next
                                                    </Link>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/****************************** Add Modal *************/}
            <Modal className="extra-width" isOpen={modal} toggle={() => { modalClose() }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { modalClose() }}>Confirm Enquery</ModalHeader>
                <form className="tablelist-form"
                    onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                        <div className="mb-3">
                            <label htmlFor="customerName-field" className="form-label">Customer Name</label>
                            <input
                                type="text"
                                name="customer_name"
                                id="customerName-field"
                                className="form-control"
                                value={validation.values.customer_name || ""}
                                onChange={validation.handleChange}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="service_provider_id-field" className="form-label">Service Provider Name</label>
                            <select
                                data-trigger
                                name="service_provider_id"
                                id="service_provider_id-field"
                                className="form-control"
                                value={validation.values.service_provider_id || ""}
                                onChange={(e) => { validation.handleChange(e); serviceProviderSelected(e.target.value); }}
                                onBlur={validation.handleBlur}
                                required
                                disabled={role == role_id.service_provider}
                            >
                                <option value="">Select Service Provider</option>
                                {serviceProviders.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="vehicle_id-field" className="form-label">Vehicle Number</label>
                            <select
                                data-trigger
                                name="vehicle_id"
                                id="vehicle_id-field"
                                className="form-control"
                                value={validation.values.vehicle_id || ""}
                                // onSelect={enquiry_details(validation.values.service_provider_id)}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                required
                            // required
                            >
                                <option value="">Select Any Vehicle Number</option>
                                {sPVechiles.map((item, index) => (
                                    <option key={index} value={item.id}>{item.vehicle_number}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="trip_type-field" className="form-label">Trip Type</label>
                            <select
                                data-trigger
                                name="trip_type"
                                id="trip_type-field"
                                className="form-control"
                                value={validation.values.trip_type || ""}
                                // onSelect={enquiry_details(validation.values.service_provider_id)}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                required
                            >
                                <option value="">Select Trip Type</option>
                                <option value="PRIVATE">Private</option>
                                <option value="GCC">GCC</option>
                                <option value="SHARING">Sharing</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pickup_country-field" className="form-label">Pickup Country</label>
                            <input
                                type="text"
                                name="pickup_country"
                                id="pickup_country-field"
                                className="form-control"
                                value={validation.values.pickup_country || ""}
                                onChange={validation.handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pickup_location-field" className="form-label">Pickup Location</label>
                            <input
                                type="text"
                                name="pickup_location"
                                id="pickup_location-field"
                                className="form-control"
                                value={validation.values.pickup_location || ""}
                                onChange={validation.handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="drop_country-field" className="form-label">Drop Country</label>
                            <input
                                type="text"
                                name="drop_country"
                                id="drop_country-field"
                                className="form-control"
                                value={validation.values.drop_country || ""}
                                onChange={validation.handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="drop_location-field" className="form-label">Drop Location</label>
                            <input
                                type="text"
                                name="drop_location"
                                id="drop_location-field"
                                className="form-control"
                                value={validation.values.drop_location || ""}
                                onChange={validation.handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="no_of_horse-field" className="form-label">Number of Hourse</label>
                            <input
                                type="text"
                                name="no_of_horse"
                                id="no_of_horse-field"
                                className="form-control"
                                value={validation.values.no_of_horse || ""}
                                onChange={validation.handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="driver_id-field" className="form-label">Driver</label>
                            <select
                                data-trigger
                                name="driver_id"
                                id="driver_id-field"
                                className="form-control"
                                value={validation.values.driver_id || ""}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                required
                            >
                                <option value="">Select Any Vehicle Number</option>
                                {sPDrivers.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="discount_type_id-field" className="form-label">Discount</label>
                            <select
                                data-trigger
                                name="discount_type_id"
                                id="discount_type_id-field"
                                className="form-control"
                                value={validation.values.discount_type_id || ""}
                                onChange={(e) => { validation.handleChange(e); calcDiscount(e.target.value); }}
                                onBlur={validation.handleBlur}
                       
                            // required
                            >
                                <option value="">Select Discount</option>
                                {discounts.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pickup_date-field" className="form-label">Pickup Date</label>
                            <Flatpickr
                                className="form-control"
                                name='pickup_date'
                                options={{
                                    dateFormat: "d-m-Y",
                                    minDate: new Date(),
                                    required: true, 
                                }}
                                value={validation.values.pickup_date || ""}
                                onChange={(dates) => validation.setFieldValue('pickup_date', dates[0])}
                                placeholder={validation.values.pickup_date || "Select Date"}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pickup_time-field" className="form-label">Pickup Time</label>
                            <input
                                type="time"
                                name="pickup_time"
                                id="pickup_time-field"
                                className="form-control"
                                value={validation.values.pickup_time || ""}
                                onChange={validation.handleChange}
                                required
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="drop_date-field" className="form-label">Drop Date</label>
                            <Flatpickr
                                className="form-control"
                                name='drop_date'
                                options={{
                                    dateFormat: "d-m-Y",
                                    required: true, 
                                    minDate:validation.values.pickup_date
                                }}
                                value=""
                                onChange={(dates) => validation.setFieldValue('drop_date', dates[0])}
                                placeholder={validation.values.drop_date || "Select Date"}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="drop_time-field" className="form-label">Drop Time</label>
                            <input
                                type="time"
                                name="drop_time"
                                id="drop_time-field"
                                className="form-control"
                                value={validation.values.drop_time || ""}
                                onChange={validation.handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Transportation Insurance Coverage
                            </label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="transportation-insurance-coverage-yes"
                                    name="transportation_insurance_coverage"
                                    className="form-check-input"
                                    value="TRUE"
                                    checked={
                                        validation.values.transportation_insurance_coverage ===
                                        "TRUE"
                                    }
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    required
                                />
                                <label
                                    htmlFor="transportation-insurance-coverage-yes"
                                    className="form-check-label"
                                >
                                    Yes
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="transportation-insurance-coverage-no"
                                    name="transportation_insurance_coverage"
                                    className="form-check-input"
                                    value="FALSE"
                                    checked={
                                        validation.values.transportation_insurance_coverage === "FALSE  "
                                    }
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    required
                                />
                                <label
                                    htmlFor="transportation-insurance-coverage-no"
                                    className="form-check-label"
                                >
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="additional_service-field" className="form-label">Additional Service</label>
                            <input
                                type="text"
                                name="additional_service"
                                id="additional_service-field"
                                className="form-control"
                                value={validation.values.additional_service || ""}
                                onChange={validation.handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="special_requirement-field" className="form-label">Special Requirement</label>
                            <input
                                type="text"
                                name="special_requirement"
                                id="special_requirement-field"
                                className="form-control"
                                value={validation.values.special_requirement || ""}
                                onChange={validation.handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="vehicle_amount-field" className="form-label">Vehicle Payment</label>
                            <input
                                type="text"
                                name="vehicle_amount"
                                id="vehicle_amount-field"
                                className="form-control"
                                value={validation.values.vehicle_amount || ""}
                                onChange={(e) => { validation.handleChange(e); setVehicleAmount(e.target.value); totalAmount(Number(e.target.value) + Number(driverAmount)) }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="driver_amount-field" className="form-label">Driver Payment</label>
                            <input
                                type="text"
                                name="driver_amount"
                                id="driver_amount-field"
                                className="form-control"
                                value={validation.values.driver_amount || ""}
                                onChange={(e) => { validation.handleChange(e); setDriverAmount(e.target.value); totalAmount(Number(e.target.value) + Number(vehicleAmount)) }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="discount_amount-field" className="form-label">Discount Payment</label>
                            <input
                                type="text"
                                name="discount_amount"
                                id="discount_amount-field"
                                className="form-control"
                                value={discountAmount}
                                onChange={validation.handleChange}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Applay Tax
                            </label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="tax_applayed-yes"
                                    name="tax_applayed"
                                    className="form-check-input"
                                    value="YES"
                                    onChange={(e) => { applyTaxation(e.target.value); }}
                                    onBlur={validation.handleBlur}
                                    required
                                />
                                <label
                                    htmlFor="tax_applayed-yes"
                                    className="form-check-label"
                                >
                                    Yes
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="tax_applayed-no"
                                    name="tax_applayed"
                                    className="form-check-input"
                                    value="NO"
                                    onChange={(e) => { applyTaxation(e.target.value); }}
                                    onBlur={validation.handleBlur}
                                    required
                                />
                                <label
                                    htmlFor="tax_applayed-no"
                                    className="form-check-label"
                                >
                                    No
                                </label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tax_amount-field" className="form-label">Tax Payment</label>
                            <input
                                type="text"
                                name="tax_amount"
                                id="tax_amount-field"
                                className="form-control"
                                value={taxAmount}
                                onChange={validation.handleChange}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="final_amount-field" className="form-label">Final Payment</label>
                            <input
                                type="text"
                                name="final_amount"
                                id="final_amount-field"
                                className="form-control"
                                value={finalAmount}
                                onChange={validation.handleChange}
                                readOnly
                            />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { modalClose() }}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn"  onClick={() => {
                                    window.location.href = '#exampleModalLabel'; // Change the URL here
                            }}>Confirm Enquery</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>


            {/* View Modal function code*/}
            <Modal className="extra-width" isOpen={view_modal} centered >
                <ModalHeader toggle={() => { modalClose() }}>View Enquiry</ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        {enquiry && enquiry.length > 0 && enquiry.map((item, index) => (
                            <div key={index}>
                                {/* The below element is for the customer name feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="customerName-field" className="form-label">Customer Name</label>
                                    <input
                                        type="text"
                                        name="customer_name"
                                        id="customerName-field"
                                        className="form-control"
                                        value={item.customer_name}
                                        readOnly
                                    />
                                </div>
                                {/* The below element is for the customer contact number feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="customer_contact_no-field" className="form-label">Customer Contact Number</label>
                                    <input
                                        type="text"
                                        name="customer_contact_no"
                                        id="customer_contact_no-field"
                                        className="form-control"
                                        value={item.customer_contact_no}
                                        readOnly
                                    />
                                </div>
                                {/* The below element is for the service provider name feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="service_provider-field" className="form-label">Service Provider Name</label>
                                    <input
                                        type="text"
                                        name="service_provider"
                                        id="service_provider-field"
                                        className="form-control"
                                        value={item.service_provider_name}
                                        readOnly
                                    />
                                </div>
                                {/* The below element is for the vehicle number feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="vehicle_number-field" className="form-label">Vehicle Number</label>
                                    <input
                                        type="text"
                                        name="vehicle_number"
                                        id="vehicle_number-field"
                                        className="form-control"
                                        value={item.vehicle_number}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="trip_type-field" className="form-label">Trip Type</label>
                                    <input
                                        type="text"
                                        name="trip_type"
                                        id="trip_type-field"
                                        className="form-control"
                                        value={item.trip_type}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="pickup_country-field" className="form-label">Pickup Country</label>
                                    <input
                                        type="text"
                                        name="pickup_country"
                                        id="pickup_country-field"
                                        className="form-control"
                                        value={item.pickup_country}
                                        readOnly
                                    />
                                </div>

                                {/* The below element is for the pickup location feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="pickup_location-field" className="form-label">Pickup Location</label>
                                    <input
                                        type="text"
                                        name="pickup_location"
                                        id="pickup_location-field"
                                        className="form-control"
                                        value={item.pickup_location}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="drop_country-field" className="form-label">Drop Country</label>
                                    <input
                                        type="text"
                                        name="drop_country"
                                        id="drop_country-field"
                                        className="form-control"
                                        value={item.drop_country}
                                        readOnly
                                    />
                                </div>

                                {/* The below element is for the drop location feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="drop_location-field" className="form-label">Drop Location</label>
                                    <input
                                        type="text"
                                        name="drop_location"
                                        id="drop_location-field"
                                        className="form-control"
                                        value={item.drop_location}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="no_of_horse-field" className="form-label">Number of Hourse</label>
                                    <input
                                        type="text"
                                        name="no_of_horse"
                                        id="no_of_horse-field"
                                        className="form-control"
                                        value={item.no_of_horse}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="created_at-field" className="form-label">Created At</label>
                                    <input
                                        type="text"
                                        name="created_at"
                                        id="created_at-field"
                                        className="form-control"
                                        value={item.created_at}
                                        readOnly
                                    />
                                </div>

                                {/* The below element is for the description feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="description-field" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description-field"
                                        className="form-control"
                                        value={item.description}
                                        readOnly
                                    />
                                </div>
                            </div>
                        ))}
                    </ModalBody> {/* Here all the element will be done*/}
                    {/* All the buttons are add from the footer */}
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { modalClose() }}>Close</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default ListEnquiriesTable;