import React from 'react';
import './CustomAlert.css'; 
import ButtonBasic from '../bottons/ButtonBasic';

const CustomAlert = ({ message, confirmText, cancelText, confirmAction, cancelAction, name }) => {
  return (
    <div className="custom-alert-background">
      <div className="custom-alert">
        <p>{message}</p>
        <div className="button-container">
        <ButtonBasic text= {cancelText} onClick={cancelAction}> 
        </ButtonBasic>
      
          <button className="confirm-button" onClick={confirmAction}>
            {confirmText}
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
