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
import LabelBase from "../../components/labels/LabelBase";
import ModalBase from "../../components/modals/ModalBase";
import ButtonBasic from "../../components/bottons/ButtonBasic";
import CustomAlert from "../../components/alert/CustomAlert";
import Pagination from "@mui/material/Pagination";

const MainClients = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clienteData, setClienteData] = useState({
    nombre: "",
    ruc: "",
    cedula: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  const [clienteDataExtra, setClienteDataExtra] = useState({
    apellido: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Define la cantidad de elementos por página

  useEffect(() => {
    fetchClientes();
  }, [currentPage]);

  useEffect(() => {
    // Concatenar el apellido al nombre al cargar el componente
  }, [clienteDataExtra.apellido]);

  const fetchClientes = async () => {
    try {
      const response = await api.get(
        `/clientes/page/${currentPage}?perPage=${itemsPerPage}`
      );
      setClientes(response.data.items);
      setFilteredClientes(response.data.items);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  
    if (term.length >= 4) {
      searchClientes(term);
    } else {
      setFilteredClientes(clientes);
      // Siempre vuelve a la primera página cuando se borra el término de búsqueda
      setCurrentPage(1);
    }
  };

  const searchClientes = (term) => {
    const filtered = clientes.filter((cliente) => {
      const nombre = cliente.nombre.toLowerCase();
      const email = cliente.email.toLowerCase();
      const telefono = cliente.telefono.toLowerCase();

      return (
        nombre.includes(term.toLowerCase()) ||
        email.includes(term.toLowerCase()) ||
        telefono.includes(term.toLowerCase())
      );
    });
    setFilteredClientes(filtered);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si algún campo esta vacio
    for (const key in clienteData) {
      if (clienteData[key] === "") {
        alert(`El campo ${key} no puede estar vacío`);
        return;
      }
    }

    // Verificar la validez del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clienteData.email)) {
      alert("Correo electrónico inválido");
      return;
    }

    // Verificar la longitud del numero de teléfono
    if (clienteData.telefono.length < 8) {
      alert("El número de teléfono debe tener al menos 8 dígitos");
      return;
    }

    setLoading(true);

    // Concatenar el apellido al nombre completo antes de enviar los datos
    const nombreCompleto = `${clienteData.nombre} ${clienteDataExtra.apellido}`;
    const datosCliente = { ...clienteData, nombre: nombreCompleto };

    try {
      const response = await api.post(`/clientes`, datosCliente);
      console.log("Cliente agregado:", response.data);
      alert('Cliente creado correctamente');
      fetchClientes();
      setClienteData({
        nombre: '',
        ruc: '',
        cedula: '',
        telefono: '',
        email: '',
        direccion: '',
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      alert('Error al crear cliente');
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Verificar si el campo es 'telefono' y si el valor contiene solo numeros
    if (name === "telefono" && !(/^\d+$/.test(value))) {
      return;
    }

    if (name === "ruc") {
      let cedulaValue = "";
      if (value.length > 7) {
        cedulaValue = value.slice(0, 7); //los primeros 7 caracteres del RUC
      } else {
        cedulaValue = value; // Si el RUC tiene menos de 7 caracteres toma el valor completo
      }
      setClienteData({
        ...clienteData,
        [name]: value,
        cedula: cedulaValue,
      });
    } else {
      // Si no es 'ruc', actualiza normalmente
      setClienteData({
        ...clienteData,
        [name]: value,
      });
    }
  };
  const handleApellidoChange = (e) => {
    setClienteDataExtra({
      ...clienteDataExtra,
      apellido: e.target.value,
    });
  };

  const handleConfirmDelete = async () => {
    if (clientToDelete) {
      try {
        await handleDeleteCliente(clientToDelete.id);
        setShowAlert(false);
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
        alert("Error al eliminar cliente");
      }
    }
  };

  const handleCancelDelete = () => {
    setShowAlert(false); // Oculta la alerta
  };

  // funcion para cancelar la eliminación del cliente
  const handleDeleteCliente = async (id) => {
    setShowAlert(false);
    try {
      await api.delete(`/clientes/${id}`);
      // Vuelve a cargar la lista de clientes despues de eliminar uno
      fetchClientes();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      alert("Error al eliminar cliente");
    }
  };

  const handleShowAlert = (client) => {
    setClientToDelete(client);
    setShowAlert(true);
  };

  return (
    <div className="MaquetaCliente">
      <div className="cuadro-central">
        <h2>Clientes</h2>
        <div className="header-cliente">
          <div className="header-Principal">
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control me-2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <ButtonBasic text="Buscar" onClick={handleSearchChange} />
            <button className="button" onClick={() => setShowModal(true)}>
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
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>
                <Link to={`/clientesinfo/${cliente.id}`}>
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
                  <a href="#" onClick={() => handleShowAlert(cliente)}>
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
      {/* Modal para registrar nuevo cliente */}
      <ModalBase
        open={showModal}
        closeModal={() => setShowModal(false)}
        title="Registro de Cliente"
      >
        <div>
          <div className="modal-body" style={{ marginTop: "0px", paddingTop: "0px" }}>
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>Datos Personales</p>

            <form>
              <div>
                <LabelBase label="Nombre:" htmlFor="nombre" />
                <input
                  style={{ width: "100%", height: "30px" }}
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={clienteData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <LabelBase label="Apellido:" htmlFor="apellido" />
                <input
                  type="text"
                  style={{ width: "100%", height: "30px" }}
                  id="apellido"
                  name="apellido"
                  className="form-control"
                  value={clienteDataExtra.apellido}
                  onChange={handleApellidoChange}
                />
              </div>
              <div className="d-flex">
                <div style={{ margin: "5px" }}>
                  <LabelBase label="CI/RUC:" htmlFor="ruc" />
                  <input
                    type="text"
                    style={{ width: "100%", height: "30px" }}
                    id="ruc"
                    name="ruc"
                    className="form-control"
                    value={clienteData.ruc}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ margin: "5px" }}>
                  <LabelBase label="Telefono:" htmlFor="telefono" />
                  <input
                    type="text"
                    style={{ width: "100%", height: "30px" }}
                    id="telefono"
                    name="telefono"
                    className="form-control"
                    value={clienteData.telefono}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <LabelBase label="e-mail:" htmlFor="email" />
                <input
                  type="text"
                  style={{ width: "100%", height: "30px" }}
                  id="email"
                  name="email"
                  className="form-control"
                  value={clienteData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <LabelBase label="Dirección:" htmlFor="direccion" />
                <input
                  type="text"
                  style={{ width: "100%", height: "30px" }}
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  value={clienteData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center float-end">
                <ButtonBasic text="Guardar" onClick={handleSubmit}>
                  {loading ? "Cargando..." : "Agregar Cliente"}
                </ButtonBasic>
              </div>
            </form>
          </div>
        </div>
      </ModalBase>
      {showAlert && clientToDelete && (
        <CustomAlert
          message={`¿Estás seguro de eliminar a ${clientToDelete.nombre}?`}
          confirmText="Aceptar"
          cancelText="Cancelar"
          confirmAction={handleConfirmDelete}
          cancelAction={handleCancelDelete}
        />
      )}
      <div className="d-flex justify-content-center mt-4">
      <div className="pagination-container">
  <Pagination
    count={Math.ceil(filteredClientes.length / itemsPerPage)}
    page={currentPage <= 2 ? currentPage : 1} 
    onChange={(event, value) => setCurrentPage(value)}
    shape="rounded"
    color="secondary"
  />
</div>

      </div>
    </div>
  );
};

export default MainClients;
