import React from "react";

const EstadoIndicator = ({ estado }) => {

    let color;
    let textColor;
  
    // Convertimos el estado a minuscula
    const estadoLowerCase = estado.toLowerCase();
  
    switch (estadoLowerCase) {
      case 'pagado':
        color = '#ECFDF3'; // Verde claro
        textColor = '#027A48'; // Verde oscuro
        break;
      case 'pendiente':
        color = '#FFDBD9'; // Rojo claro
        textColor = '#D92D20'; // Rojo oscuro
       
        break;
      default:
        color = 'black'; 
        textColor = 'black';
        
    }
  
    return (
      <div style={{ backgroundColor: color, borderRadius: '15px', color: textColor, width: '70%',fontWeight: 'bold', textAlign: 'center', margin: '0,1%',fontFamily: 'Inter, sans-serif'}}>
        {estado}
      </div>
    );
  };
export default EstadoIndicator;
