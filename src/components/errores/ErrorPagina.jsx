import React from "react";
import { RiErrorWarningLine } from "react-icons/ri"; // Importa un icono de error

const ErrorPagina = () => {
  return (
    <div className="error-container">
      <RiErrorWarningLine className="error-icon" />
      <p className="error-message">
        ¡Ups! Parece que hubo un problema al cargar los productos. Por favor,
        inténtalo de nuevo más tarde.
      </p>
    </div>
  );
};

export default ErrorPagina;
