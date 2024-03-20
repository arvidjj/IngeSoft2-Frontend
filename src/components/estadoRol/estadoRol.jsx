import React from "react";

const EstadoRol = ({ rol }) => {
  let rolUsuario; // Colores específicos para el rol
  const color = "#E5D0FF"; // Color de fondo púrpura claro
  const textColor = "#6941C6"; // Color de texto púrpura oscuro
  if(id === 1){
    return "Admin"
  } else if(id === 3){
    return "Cajero"
  } else if(id === 4){
    return "Entrenador"
  } else {
    return "Rol Invalido"
  }
  return (
    <div
      style={{
        backgroundColor: color,
        color: textColor,
        borderRadius: "5px",
        width: "70%",
        textAlign: "center",
        marginLeft: "1rem"
      }}
    >
        {}
    </div>
  );
};

export default EstadoRol;
