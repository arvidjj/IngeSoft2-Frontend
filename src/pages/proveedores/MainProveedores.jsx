import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainProveedores.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { TbArrowDown } from "react-icons/tb";
import { GoQuestion } from "react-icons/go";

import ButtonBasic from "../../components/bottons/ButtonBasic";
import ButtonCrear from "../../components/bottons/ButtonCrear";
import ModalBase from "../../components/modals/ModalBase";
import LabelBase from "../../components/labels/LabelBase";
import CustomAlert from "../../components/alert/CustomAlert";
import StockIndicator from "../../components/ManejoStock/StockIndicator";
import { IoCheckmark } from "react-icons/io5";
import api from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import ErrorPagina from "../../components/errores/ErrorPagina";
import Pagination from "../../components/pagination/PaginationContainer";
import ElementoNoEncontrado from "../../components/errores/ElementoNoEncontrado";


const MainProveedores = () => {

    const [proveedores, setProveedores] = useState([]);
    const [filteredProveedores, setFilteredProveedores] = useState([]);

    const [searchQuery, setSearchQuery] = useState(""); //TODO
    const [searchResultsFound, setSearchResultsFound] = useState(true); // TODO

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [error, setError] = useState(false); // Estado para manejo de errores

    useEffect(() => {
        fetchProveedores(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Aquí podrías realizar otras acciones relacionadas con el cambio de página, como cargar datos adicionales, etc.
    };

    const fetchProveedores = async (page) => {
        try {
            const response = await api.get(`/proveedores/page/${page}`);
            console.log(response.data.items);
            setProveedores(response.data.items);
            setFilteredProveedores(response.data.items);
            setTotalPages(response.data.totalPages);
            setError(false);
        } catch (error) {
            setError(true);
            console.error("Error al obtener los proveedores:", error);
        }
    };


    return (
        <div className="MaquetaCliente">
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    success: {
                        style: {
                            background: "#75B798",
                            color: "#0A3622",
                        },
                    },
                    error: {
                        style: {
                            background: "#FFDBD9",
                            color: "#D92D20",
                        },
                    },
                }}
            />
            <div class="card">
                <div class="container">
                    <div className="card-1">
                        <h2>Proveedores</h2>
                        <div className="card-body d-flex align-items-center ">
                            <form className="d-flex flex-grow-1">
                                <input
                                    id="Btn-Buscar"
                                    className="form-control mt-3 custom-input"
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={console.log("TODO handleInputChange")}
                                />
                                <ButtonBasic
                                    id="Btn-Buscar"
                                    text="Buscar"
                                    onClick={console.log("TODO handleSearchClick")}
                                />
                            </form>

                            <div className="TODO hacerdropdown">

                            </div>

                            <ButtonCrear
                                id="Btn-Crear"
                                text="Nuevo Proveedor"
                                onClick={console.log("TODO handleNuevoProducto")}
                                icon={<IoAdd />}
                                color="secondary"
                            />
                        </div>
                    </div>

                    <div className="TODO hacerModalBase">
                    </div>
                    <div className="TODO hacerAlerta">
                    </div>

                    <div class="table-container">
                        {error && <ErrorPagina />}{" "}
                        {/* Muestra el componente de error si hay un error */}
                        {!error &&
                            filteredProveedores.length === 0 &&
                            !searchResultsFound && (
                                <ElementoNoEncontrado mensaje="Proveedor no encontrado!" />
                            )}
                        {!error && filteredProveedores.length > 0 && (
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre del Proveedor</th>
                                        <th scope="col">
                                            RUC
                                        </th>
                                        <th scope="col">
                                            Email
                                        </th>
                                        <th scope="col">Número de Teléfono</th>
                                        <th scope="col">Dirección</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProveedores.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.ruc}</td>
                                            <td>{producto.email}</td>
                                            <td>{producto.telefono}</td>
                                            <td>{producto.direccion}</td>
                                            <td class="text-center">
                                                <a
                                                    href="#"
                                                    onClick={() => console.log("handleShowAlert(producto)")}
                                                    style={{ fontSize: "1.2rem" }}
                                                >
                                                    <RiDeleteBinLine />
                                                </a>
                                                <a
                                                    href="#"
                                                    onClick={() => console.log("handleEditarProducto(producto)")}
                                                    style={{ marginLeft: "1.5em", fontSize: "1.2rem" }}
                                                >
                                                    <FiEdit2 />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                </div>
                <div className="pagination-container">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainProveedores;