import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import "./SkillRegistration.css";

const SuccessModal = ({ isOpen, onClose, name }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-icon">
          <FiCheckCircle />
        </div>
        <h2>Congratulations, {name}!</h2>
        <p>
          Your registration for the <strong>Don Bosco Weekend Skills</strong> has been received successfully. 
          We have also received your payment receipt.
        </p>
        <p className="modal-subtext">See you soon!</p>
        
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;