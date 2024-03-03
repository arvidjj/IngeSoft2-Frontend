import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainClients.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { PiUserCircleLight } from "react-icons/pi";
import { TbArrowDown } from "react-icons/tb";
import { GoQuestion } from "react-icons/go";
import { Link } from "react-router-dom";
import api from "../../utils/api"; 

const MainClients = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get("/clientes/page/1");
      setClientes(response.data.items);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  return (
    <div className="MaquetaCliente">
      <div className="cuadro-central">
        <h2>Clientes</h2>
        <p>aaaaaa</p>
        <div className="header-cliente">
          <div className="header-Principal">
            <a href="#" className="a">
              <BsSearch style={{ color: "black" }} />
            </a>
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control me-2"
              style={{ width: "450px", height: "37px" }}
            />
            <button className="button">
              {" "}
              <IoAdd />
              Nuevo Cliente
            </button>
          </div>
        </div>
        <hr />
        <table className="custom-table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">
                Estado <TbArrowDown />
              </th>
              <th scope="col">
                Plan <GoQuestion />
              </th>
              <th scope="col">Email</th>
              <th scope="col">Numero de telefono</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table tbody tr:nth-child(odd) ">
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>
                  <Link to={`/clientesInfo/${cliente.id}`}>
                    <PiUserCircleLight
                      style={{
                        padding: "0px",
                        fontSize: "25px",
                        background: "#eaecf000",
                      }}
                    />{" "}
                    {cliente.nombre}
                  </Link>
                </td>
                <td>{cliente.active ? "Activo" : "Inactivo"}</td>
                <td>Plan</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>
                  <a href="#">
                    <RiDeleteBinLine />
                  </a>
                  <a href="#">
                    {" "}
                    <FiEdit2 />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainClients;
