import React from 'react';

const ElementoNoEncontrado = ({ mensaje }) => {
  return (
    <tr>
      <td colSpan="6" className="text-center" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span role="img" aria-label="Sad face" style={{ fontSize: '2rem', marginRight: '15em' }}></span>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{mensaje}</p>
        </div>
      </td>
    </tr>
  );
};

export default ElementoNoEncontrado;
