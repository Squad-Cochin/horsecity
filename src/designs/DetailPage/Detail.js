import React,{useState,useRef,useEffect} from 'react'

import {Container, Row, Col} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
// Imported component
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
import Styles from './Detail.module.scss'
import { Link } from 'react-router-dom';
function DetailPage() {
    const [show, setShow] = useState(false);         
    const [pdetails, setPdetails] =useState([])
    const [wishlistData, setWishlistData] = useState([])
    const [cartData, setCartData] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [divHeight, setDivHeight] = useState(0);
    const ref = useRef(divHeight);

    useEffect(() => {
        setDivHeight(ref.current.offsetHeight);
        console.log('height: ', ref.current.offsetHeight);
        if (detailData && detailData.length > 0) {
          setPdetails(detailData[0]);
        }
      let wishlistDatas = JSON.parse(localStorage.getItem('wishlisted')) || [];
      let cartDatas = JSON.parse(localStorage.getItem('cart')) || [];
      setWishlistData(wishlistDatas);
      setCartData(cartDatas)
      }, [pdetails]);

      const vehicleData = {
        images: pdetails && pdetails.vehcile && pdetails.vehcile[0].images,
        price: pdetails && pdetails.vehcile && pdetails.vehcile[0].price,
        name :  pdetails && pdetails.vehcile && pdetails.vehcile[0].name,
        vehicleType : pdetails && pdetails.vehcile && pdetails.vehcile[0].vehicleType,
        company : pdetails && pdetails.vehcile && pdetails.vehcile[0].company,
        description : pdetails && pdetails.vehcile && pdetails.vehcile[0].description,
        registered : pdetails && pdetails.vehcile && pdetails.vehcile[0].registered,
        occupancy : pdetails && pdetails.vehcile && pdetails.vehcile[0].occupancy
      };
// for(let i of pdetails.vehcile){
//   console.log("i",i);
// }
      //  console.log("details",details[0]);
      //  console.log("curr",details.currency);
  return (
    <>
      <div id="header" className={Styles.mainHeader} ref={ref} >
        <Header wishlist={wishlistData} cart={cartData}/>
        <BackTopage label="See all Activities" href="/" />
        <MainMenu currency={pdetails.currency} price={vehicleData.price} />
      </div>
      <div className={Styles.detailpage}>
        <BreadcrumbType wishlist={false} />
        <Container>
          <DetailSlider images={vehicleData.images}/>
          <Row className="mt-5">
            <Col lg={8} md={7}>
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
                {/* For checking availablity */}
                <ButtonType
                  variant="primary"
                  onClick={handleShow}
                  className="btntype1 mt-4"
                  name= "Check availability"
                />
              </div>
            </Col>
          </Row>
          <FeatureTable />
          <DetailContent description={vehicleData.description} />
          {/* <MeetingSection></MeetingSection> */}
          {/* <TimelineMap /> */}
          <AccordionType className="plusicon" />
          <div className={Styles.faqssection}>
            <h2 className="header-type2">
              Frequently Asked Questions about Barcelona Sailing Experience -
              Sunset
            </h2>
            <AccordionType1 />
          </div>
        </Container>
        <Offcanvas className={Styles.offcanvasBox} show={show} onHide={handleClose} placement="end" >
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

export default DetailPage

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
            "name": "https://via.placeholder.com/250x250"
          },
          {
            "id": 1,
            "name": "https://via.placeholder.com/250x250"
          },
          {
            "id": 2,
            "name": "https://via.placeholder.com/250x250"
          },
          {
            "id": 3,
            "name": "https://via.placeholder.com/250x250"
          },
          {
            "id": 4,
            "name": "https://via.placeholder.com/250x250"
          }
        ],
        "name": "Mildred Burt",
        "vehicleType": "private",
        "company": "Wells",
        "description": "Nostrud elit ipsum ea eu ut nostrud officia ullamco mollit laboris nostrud. Commodo proident elit veniam ad fugiat in. Ipsum sint ad est ullamco ut. Qui eu commodo officia consectetur cupidatat fugiat aliquip enim proident consequat eiusmod ea excepteur pariatur. Aliquip cillum reprehenderit excepteur minim.\r\n",
        "price": "3,719.67",
        "registered": "2023-01-29T11:13:28 -06:-30",
        "occupancy": 3,
        "isActive": false,
        "availability": "Y"
      }
    ]
  }
]