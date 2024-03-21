import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
`;

const PageNumber = styled.span`
  padding: 8px 12px;
  border: ${(props) =>
    props.active ? "1px solid #ccc" : "none"}; /* Agregamos borde solo si la página está activa */
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#EBE5FC" : "transparent")};
  color: ${(props) => (props.active ? "#6941C6" : "#333")};
`;

const ArrowButton = styled.button`

  padding: 12px 16px; /* Ajustamos el padding para hacer las flechas un poco más grandes */
  border: none; /* Quitamos el borde de los botones de flecha */
  cursor: pointer;
  background-color: transparent;
  color: #6941c6;
  font-size: 1.2rem; /* Ajustamos el tamaño de la fuente para hacer las flechas más grandes */
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      <ArrowButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </ArrowButton>
      {pageNumbers.map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </PageNumber>
      ))}
      <ArrowButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination;
