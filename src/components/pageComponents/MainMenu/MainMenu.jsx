// { This component will show the menu bar in which the following options are available: About,
// Important Information, Itinerary, Reviews, and Check Availability }

import React from "react";
import {Link} from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";
// This component is designed for reusing buttons
import ButtonType from "../../elementComponents/Button/Button";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
/*import CanvasPopup from "../AvailabilityPopup/AvailabilityPopupState";*/
import Styles from "./MainMenu.module.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
// This component is designed for reusing  AvailabilityPopupContent
import AvailabilityPopupContent from "../AvailabilityPopup/AvailabilityPopup";
function Menu(props) {
  return (
    <li className={Styles.menuItem}>

      <Link href="/">{props.brand}</Link>
    </li>
  );
}
export const MainMenu = () => {
  // Menu bar options
  const menuitems = ["About", "Important information", "Itenerary", "Reviews"];
  const [show, setShow] = useState(false);
  // For closing  the offcanvas
  const handleClose = () => setShow(false);
  // For showing   the offcanvas
  const handleShow = () => setShow(true);
  /*const a = useContext(CanvasPopup);*/
  return (
    <>
      <section className={Styles.headerMenu}>
        <Container>
          <div className={Styles.mainMenu}>
            <ul className={Styles.leftMenu}>
              {menuitems.map((menuitem) => (
                <Menu key="1" brand={menuitem} />
              ))}
            </ul>
            <div className={Styles.rightMenu}>
              <div className={Styles.headerPrice}>From $85.60</div>
              {/* Button */}
              <ButtonType
                variant="primary"
                onClick={handleShow}
                className={`btntype1 mt-4 ${Styles.headerBtn}`}
                name= "Check availability"
              />
              <Offcanvas
                className={Styles.offcanvasBox}
                show={show}
                onHide={handleClose}
                placement="end"
              >
                <Offcanvas.Header
                  className={Styles.offcanvasHead}
                  closeButton
                ></Offcanvas.Header>
                <Offcanvas.Body className={Styles.offcanvasinnerBox}>
                  {/* AvailabilityPopupContent component */}
                <AvailabilityPopupContent />
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </div>
          {/*<div>{a}</div>*/}
        </Container>
      </section>
    </>
  );
};
export default MainMenu;
