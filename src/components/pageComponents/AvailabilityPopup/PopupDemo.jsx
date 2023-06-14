import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';


export default function PopupDemo() {
    const [show, setShow] = useState({ data: "" });
    const handleClose = () => {
        setShow({ data: false });
    };
    const handleShow = () => {
        setShow({ data: true });
    };
  return (
    <>
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
        <div className="main-cointainer">
            <h2>Compnent2</h2>  
            <p></p>
        </div>
    </>
    
  );
}
