import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './InfoClients.css'


const InfoClients = () => {
  return (
    <div className="container-fluid MaquetaCliente">
      <div className="H2">
        <button className="btn btn-primary">Salir</button>
        <h2>Cliente</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="cuadro-central">
            <div className="header-cliente">
              <p>Informacion Personal</p>
              <button className="btn btn-success float-end">
                Modificar Cliente
              </button>
            </div>
            <div className="info-cliente">
              <div>
                <i>Icono</i>
              </div>
              <div>
                <h3>Drew Cano</h3>
                <p>correo</p>
              </div>
              <div>
                <h4>RUC</h4>
                <p>1111111</p>
              </div>
            </div>
            <hr />
            <div className="datos-extras">
              <div>
                <h4>Plan Actual</h4>
                <p>Mensual</p>
              </div>
              <div className="Num-Telefono">
                <h3>Numero de Telefono</h3>
                <p>243425234</p>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Pago/Mes</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Descripcion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td> the Bird</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoClients;
