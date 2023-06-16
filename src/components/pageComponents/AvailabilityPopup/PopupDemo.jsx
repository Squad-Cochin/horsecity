// Importing necessary dependencies and components
import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';

// Define the PopupDemo component
export default function PopupDemo() {
  // Declare state variable for controlling the visibility of the offcanvas
  const [show, setShow] = useState({ data: "" });

  // Function to handle closing the offcanvas
  const handleClose = () => {
    setShow({ data: false });
  };

  // Function to handle showing the offcanvas
  const handleShow = () => {
    setShow({ data: true });
  };

  return (
    <>
      {/* Render the Offcanvas component */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Placeholder text for the offcanvas body */}
          Some text as placeholder. In real life, you can have the elements you
          have chosen. Like text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>

      <div className="main-cointainer">
        <h2>Compnent2</h2>
        <p></p>
      </div>
    </>
  );
}
