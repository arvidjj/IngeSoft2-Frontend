import React from "react";
import "./MainProductos.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import ButtonBasic from "../../components/bottons/ButtonBasic";
import { IoCheckmark } from "react-icons/io5";
const MainProductos = () => {
  return (
    <div className="MaquetaCliente">
      <div className="cuadro-central">
        <div class="container">
          <div class="card">
            <h2>Tienda</h2>
            <div className="card-body d-flex align-items-center justify-content-between">
              <form className="d-flex flex-grow-1">
                <input
                  className="form-control mt-3 custom-input"
                  type="text"
                  placeholder="Search"
                />
                <ButtonBasic text="Buscar" />
              </form>

              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle btn-filtrar"
                  data-bs-toggle="dropdown"
                >
                  <IoCheckmark />
                  Filtrar por...
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Precio
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Stock
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Nombre
                    </a>
                  </li>
                </ul>
              </div>

              <button className="button-t" >
              <IoAdd />
              Nuevo Producto
            </button>
            </div>
          </div>

          <div class="card">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Nombre del Producto</th>
                  <th>Stock</th>
                  <th>Codigo</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Energizante Powerade</td>
                  <td>100</td>
                  <td>0001</td>
                  <td>Bebida Energetica</td>
                  <td>12.000</td>
                  <td className="custom-table2">
                    <a href="#" onClick={() => handleShowAlert(cliente)}>
                      <RiDeleteBinLine />
                    </a>
                    <a href="#" onClick={() => handleEditClientClick(cliente)}>
                      <FiEdit2 />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Energizante Powerade</td>
                  <td>100</td>
                  <td>0001</td>
                  <td>Bebida Energetica</td>
                  <td>12.000</td>
                  <td className="custom-table2">
                    <a href="#" onClick={() => handleShowAlert(cliente)}>
                      <RiDeleteBinLine />
                    </a>
                    <a href="#" onClick={() => handleEditClientClick(cliente)}>
                      <FiEdit2 />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Energizante Powerade</td>
                  <td>100</td>
                  <td>0001</td>
                  <td>Bebida Energetica</td>
                  <td>12.000</td>
                  <td className="custom-table2">
                    <a href="#" onClick={() => handleShowAlert(cliente)}>
                      <RiDeleteBinLine />
                    </a>
                    <a href="#" onClick={() => handleEditClientClick(cliente)}>
                      <FiEdit2 />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Pagination count={5} shape="rounded" color="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProductos;
