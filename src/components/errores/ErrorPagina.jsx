import React, { Children } from "react";
import { RiErrorWarningLine } from "react-icons/ri"; // Importa un icono de error

const ErrorPagina = ({mensaje}) => {
  return (
    <div className="error-container">
      <RiErrorWarningLine className="error-icon" />
      <p className="error-message">
       {mensaje}
      </p>
    </div>
  );
};

export default ErrorPagina;
