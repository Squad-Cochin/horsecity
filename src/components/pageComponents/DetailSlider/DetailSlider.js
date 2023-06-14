//  { On the  details page, the component displays an image slider. }
import React, { useState } from "react";
import Styles from "./DetailSlider.module.scss";
// Images 
import banner1 from "../../../asset/images/mainbanner.jpg";
import banner2 from "../../../asset/images/rightbanner1.jpg";
import banner3 from "../../../asset/images/rightbanner2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
// Import the Slider component from the react-slick/lib/slider library
import Slider from "react-slick/lib/slider";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

// Define the DetailSlider component
export default function DetailSlider() {
  // Declare a state variable named 'nav1' using the useState hook
  const [nav1, setNav1] = useState();
  // Declare another state variable named 'nav2' using the useState hook
  const [nav2, setNav2] = useState();
  
  // Define the settings for the slider component
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    centerMode: false,
    useTransform: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          vertical: false,
          horizontal:true,
          verticalSwiping: false,
          useTransform: false
        }
      }
    ],    
  };
  return (
    <>
    
      <div className={Styles.bannerSlider}>
        <Row className={Styles.bannerFlex}> 
          <Col className={Styles.cmnCol} md={8}>
 
            <Slider
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
              dots={false}
              arrows={false}
              swipeToSlide={false}
              fade={true}
            >
              <div className={Styles.bannerslide}>
                <Image className={Styles.bannerimg} src={banner1} alt=""/>
              </div>
              <div className={Styles.bannerslide}>
                <Image className={Styles.bannerimg} src={banner2} alt=""/>
              </div>
              <div className={Styles.bannerslide}>
                <Image className={Styles.bannerimg} src={banner3} alt=""/>
              </div>
            </Slider>
          </Col>
          <Col className={Styles.cmnCol} md={4}>
            <Slider
              className={Styles.secondSlider}
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              {...settings}
            >
              <div className={Styles.bannerslide}>
                <div>
                  <Image className={Styles.bannersideimg} src={banner1} alt=""/>
                </div>
              </div>
              <div className={Styles.bannerslide}>
                <div>
                  <Image className={Styles.bannersideimg} src={banner2} alt="" />
                </div>
              </div>
              <div className={Styles.bannerslide}>
                <div>         
                <Image className={Styles.bannersideimg} src={banner3} alt=""/>
                </div>
              </div>
              
            </Slider>
   

          </Col>
        </Row>
      </div>
    </>
  );
}
