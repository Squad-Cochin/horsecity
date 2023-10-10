// components/CustomModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set the parent element for accessibility

function CustomModal({ isOpen, onRequestClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0 0 0 / 5%)',
        },
        content: {
          inset: '20px',
          border: 'none',
          background: 'white',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '600px',
          margin: 'auto',
          marginTop: '100px',
          marginBottom: '60px',
          height:'361px'
        },
      }}
    >
      {children}
    </Modal>
  );
}

export default CustomModal;
