// Import React and necessary components from react-bootstrap and other files
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Header from "../../components/pageComponents/Header/Header";
import { MainMenu } from "../../components/pageComponents/MainMenu/MainMenu";
import BackTopage from "../../components/pageComponents/BackTopage/BackTopage";
import BreadcrumbType from "../../components/pageComponents/BreadcrumbType/BreadcrumbType";
import DetailSlider from "../../components/pageComponents/DetailSlider/DetailSlider";
import ButtonType from "../../components/elementComponents/Button/Button";
import AvailabilityPopupContent from "../../components/pageComponents/AvailabilityPopup/AvailabilityPopup";
import { FeatureTable } from "../../components/pageComponents/FeatureTable/FeatureTable";
import DetailContent from "../../components/pageComponents/DetailContent/DetailContent";
import AccordionType from "../../components/pageComponents/AccordionType/AccordionType";
import AccordionType1 from "../../components/pageComponents/AccordionType/AccordionType1";
import Styles from './Detail.module.scss';
import { Link } from 'react-router-dom';

function DetailPage() {
    // State variables
    const [show, setShow] = useState(false); // State for showing/hiding the Offcanvas component
    const [pdetails, setPdetails] = useState([]); // State for product details
    const [wishlistData, setWishlistData] = useState([]); // State for wishlist data
    const [cartData, setCartData] = useState([]); // State for cart data

    // Functions to handle showing and hiding the Offcanvas component
    const handleClose = () => setShow(false); // Function to close the Offcanvas
    const handleShow = () => setShow(true); // Function to show the Offcanvas

    const [divHeight, setDivHeight] = useState(0); // State for the height of the main header
    const ref = useRef(divHeight);

    useEffect(() => {
        setDivHeight(ref.current.offsetHeight); // Get the height of the main header
        console.log('height: ', ref.current.offsetHeight);

        if (detailData && detailData.length > 0) {
            setPdetails(detailData[0]); // Set the product details from the data
        }

        // Retrieve wishlist and cart data from local storage
        let wishlistDatas = JSON.parse(localStorage.getItem('wishlisted')) || [];
        let cartDatas = JSON.parse(localStorage.getItem('cart')) || [];

        setWishlistData(wishlistDatas); // Set the wishlist data
        setCartData(cartDatas); // Set the cart data
    }, [pdetails]);

    // Object containing vehicle data
    const vehicleData = {
        images: pdetails && pdetails.vehcile && pdetails.vehcile[0].images,
        price: pdetails && pdetails.vehcile && pdetails.vehcile[0].price,
        name: pdetails && pdetails.vehcile && pdetails.vehcile[0].name,
        vehicleType: pdetails && pdetails.vehcile && pdetails.vehcile[0].vehicleType,
        company: pdetails && pdetails.vehcile && pdetails.vehcile[0].company,
        description: pdetails && pdetails.vehcile && pdetails.vehcile[0].description,
        registered: pdetails && pdetails.vehcile && pdetails.vehcile[0].registered,
        occupancy: pdetails && pdetails.vehcile && pdetails.vehcile[0].occupancy
    };

    return (
        <>
            {/* Main header section */}
            <div id="header" className={Styles.mainHeader} ref={ref} >
                <Header wishlist={wishlistData} cart={cartData} />
                <BackTopage label="See all Activities" href="listing" />
                <MainMenu currency={pdetails.currency} price={vehicleData.price} />
            </div>

            {/* Detail page content */}
            <div className={Styles.detailpage}>
                <BreadcrumbType wishlist={false} />

                <Container>
                    {/* Detail slider */}
                    <DetailSlider images={vehicleData.images} />

                    <Row className="mt-5">
                        <Col lg={8} md={7}>
                            {/* Product description */}
                            <div className={Styles.productDesc}>
                                <h2 className="header-type2">
                                    {pdetails.vechicleLocation} - {vehicleData.name}
                                </h2>
                                <div className={Styles.byTravelText}>
                                    <u>{vehicleData.vehicleType} - {vehicleData.company}</u>
                                </div>
                                {/* Rating */}
                                <div className="mt-4">
                                    <b>{vehicleData.registered}</b> (68 ratings)
                                </div>
                                <div className="mt-4">
                                    <b>4.5/5</b> (68 ratings)
                                </div>
                                <div className="mt-1">
                                    <Link to={''}>
                                        See all reviews
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={5}>
                            {/* Price section */}
                            <div className={Styles.priceSection}>
                                <h2 className="header-type2">{pdetails.currency} {vehicleData.price} </h2>
                                <div className={Styles.duration}>
                                    Offer ID: 98292{" "}
                                    <span className={Styles.durationSeparator}></span> Exp:
                                    1/31/2022
                                </div>
                                <div className={`${Styles.freeText} mt-2`}>
                                    Free cancellation available
                                </div>
                                {/* Button for checking availability */}
                                <ButtonType
                                    variant="primary"
                                    onClick={handleShow}
                                    className="btntype1 mt-4"
                                    name="Check availability"
                                />
                            </div>
                        </Col>
                    </Row>

                    {/* Feature table */}
                    <FeatureTable />

                    {/* Detail content */}
                    <DetailContent description={vehicleData.description} />

                    {/* Accordion */}
                    <AccordionType className="plusicon" />

                    {/* FAQs section */}
                    <div className={Styles.faqssection}>
                        <h2 className="header-type2">
                            Frequently Asked Questions about Barcelona Sailing Experience - Sunset
                        </h2>
                        <AccordionType1 />
                    </div>
                </Container>

                {/* Offcanvas for availability popup */}
                <Offcanvas className={Styles.offcanvasBox} show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header className={Styles.offcanvasHead} closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={Styles.offcanvasinnerBox}>
                        <AvailabilityPopupContent />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}

export default DetailPage;

// Sample detailData (product details)
const detailData = [
    {
        "currency": "AED",
        "vechicleLocation": "Abudhabi",
        "vehcile": [
            {
                "id": 0,
                "images": [
                    {
                        "id": 0,
                        "name": "https://via.placeholder.com/250x250",
                        "alt": "Image 1"
                    },
                    {
                        "id": 1,
                        "name": "https://via.placeholder.com/250x250",
                        "alt": "Image 2"
                    },
                    {
                        "id": 2,
                        "name": "https://via.placeholder.com/250x250",
                        "alt": "Image 3"
                    }
                ],
                "price": 200,
                "name": "Car Rental",
                "vehicleType": "Sedan",
                "company": "ABC Car Rentals",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae nibh at tortor blandit interdum id et sapien. Nulla facilisi. Nulla fringilla ipsum et ex tincidunt, id auctor massa laoreet. Proin sed elit eget enim efficitur varius et et dolor. Integer quis facilisis enim. Donec fermentum eros quis faucibus condimentum. Sed facilisis, ligula sit amet auctor scelerisque, tortor mi rhoncus dolor, eget fringilla sapien lorem id odio. Sed quis risus eu est commodo efficitur at at arcu. Mauris vitae risus faucibus, maximus nunc ut, pharetra nisi. Nullam et neque elit. Donec nec dictum sem.",
                "registered": "UAE Registered",
                "occupancy": "5 Seats"
            }
        ]
    }
];
