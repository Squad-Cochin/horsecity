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
function DetailPage() {
    const [show, setShow] = useState(false);         

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [divHeight, setDivHeight] = useState(0);
    const ref = useRef(divHeight);

    useEffect(() => {
        setDivHeight(ref.current.offsetHeight);
        console.log('height: ', ref.current.offsetHeight);
      }, []);
  return (
    <>
      <div id="header" className={Styles.mainHeader} ref={ref} >
        <Header />
        <BackTopage label="See all Activities" href="/" />
        <MainMenu />
      </div>
      <div className={Styles.detailpage}>
        <BreadcrumbType wishlist={false} />
        <Container>
          <DetailSlider />
          <Row className="mt-5">
            <Col lg={8} md={7}>
              <div className={Styles.productDesc}>
                <h2 className="header-type2">
                  Barcelona Sailing Experience - Sunset
                </h2>
                <div className={Styles.byTravelText}>
                  <u>By Julia Travel - Gray Line Spain</u>
                </div>
                {/* Rating */}
                <div className="mt-4">
                  <b>4.5/5</b> (68 ratings)
                </div>

                <div className="mt-1">
                  <a href="#" className="link-type1">
                    See all reviews
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={4} md={5}>
              <div className={Styles.priceSection}>
                <h2 className="header-type2">From $85.60 per adult</h2>
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
          <DetailContent />
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