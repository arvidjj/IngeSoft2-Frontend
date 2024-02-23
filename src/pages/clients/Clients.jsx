import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InfoClients.css"; // Asegúrate de importar tu archivo de estilos CSS

const Clients = () => {
  return (
    <div className="container-fluid MaquetaCliente">
      <div className="H2">
        <button className="btn btn-primary">Salir</button>
        <h2>Clientes</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="cuadro-central">
            <div className="info-cliente">
              <p>Informacion Personal</p>
              <button className="btn btn-success float-end">
                Modificar Cliente
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-6">
          <div className="content"></div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
