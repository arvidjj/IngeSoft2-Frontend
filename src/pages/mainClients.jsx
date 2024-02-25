import React from "react";
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

const MainClients = () => {
  return (
    <div className="MaquetaCliente">
      <div className="cuadro-central">
        <h2>Clientes</h2>
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
            <tr>
              <td>
                <Link to="/clientesInfo">
                  <PiUserCircleLight
                    style={{
                      padding: "0px",
                      fontSize: "25px",
                      background: "#eaecf000",
                    }}
                  />{" "}
                  Mark
                </Link>
              </td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
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
            <tr>
              <td>
                {" "}
                <Link to="/clientesInfo">
                  <PiUserCircleLight
                    style={{
                      padding: "0px",
                      fontSize: "25px",
                      background: "#eaecf000",
                    }}
                  />{" "}
                  Mark
                </Link>
              </td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
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
            <tr>
              <td>
                <Link to="/clientesInfo">
                  <PiUserCircleLight
                    style={{
                      padding: "0px",
                      fontSize: "25px",
                      background: "#eaecf000",
                    }}
                  />{" "}
                  Mark
                </Link>
              </td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainClients;
