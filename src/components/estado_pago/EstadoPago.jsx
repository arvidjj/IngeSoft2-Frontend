import React from 'react';

const EstadoPago = ({ estado }) => {
  let color;
  let textColor;

  switch (estado) {
    case 'Pagado':
      color = '#75B798';
      textColor = '#027A48'; // Color verde para "Pagado"
      break;
    case 'No pagado':
      color = '#FFDBD9';
      textColor = '#D92D20'; // Color rojo para "No pagado"
      break;
    default:
      color = 'black'; 
      textColor = 'black';
  }

  return (
    <div style={{ backgroundColor: color, borderRadius: '15px', color: textColor, fontWeight: 'bold', width: '25%', textAlign: 'center', margin: '1%'}}>
      {estado}
    </div>
  );
};

export default EstadoPago;
