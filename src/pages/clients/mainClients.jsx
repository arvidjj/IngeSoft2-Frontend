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
import toast, { Toaster } from "react-hot-toast";
import { Button } from "flowbite-react";
import { IoAddOutline } from "react-icons/io5";

const MainClients = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalidad, setModalidad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [actividades, setActividades] = useState([]);
  const [selectedActividadId, setSelectedActividadId] = useState("");
  const [selectedClienteId, setSelectedClienteId] = useState("");
  const [suscripcionModalOpen, setSuscripcionModalOpen] = useState(false); 


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
      toast.error("Error al actualizar cliente " );
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

  const handleNameChange = (event) => {
    setEditingClient({
      ...editingClient,
      nombre: event.target.value,
    });
  };
  
  const handleRucChange = (event) => {
    setEditingClient({
      ...editingClient,
      ruc: event.target.value,
    });
  };
  
  const handleTelefonoChange = (event) => {
    setEditingClient({
      ...editingClient,
      telefono: event.target.value,
    });
  };
  
  const handleEmailChange = (event) => {
    setEditingClient({
      ...editingClient,
      email: event.target.value,
    });
  };
  
  const handleDireccionChange = (event) => {
    setEditingClient({
      ...editingClient,
      direccion: event.target.value,
    });
  };
  
  // Funcion para abrir el modal cuando se hace clic en "Editar Cliente"
  const handleEditClientClick = (client) => {
    setEditingClient(client);
    setModalOpen(true);
  };

  // Funcion para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };


  
  // Funcion para guardar los cambios realizados en el cliente
  const handleGuardarCambios = async () => {
    try {
      await api.put(`/clientes/${editingClient.id}`, editingClient); // Actualiza el cliente con los datos editados
      setModalOpen(false); // Cierra el modal 
      fetchClientes();
      toast.success("Usuario editado satisfactoriamente");

    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      toast.error("Error al actualizar cliente " );
    }
  };
    
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si algún campo esta vacio
    for (const key in clienteData) {
      if (clienteData[key] === "") {
        toast.error(`El campo ${key} no puede estar vacío`);
        return;
      }
    }

    // Verificar la validez del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clienteData.email)) {
      toast.error("Correo electrónico inválido");
      return;
    }

    // Verificar la longitud del numero de teléfono
    if (clienteData.telefono.length < 8) {
      toast.error("El número de teléfono debe tener al menos 8 dígitos");
      return;
    }

    setLoading(true);

    // Concatenar el apellido al nombre completo antes de enviar los datos
    const nombreCompleto = `${clienteData.nombre} ${clienteDataExtra.apellido}`;
    const datosCliente = { ...clienteData, nombre: nombreCompleto };

    try {
      const response = await api.post(`/clientes`, datosCliente);
      console.log("Cliente agregado:", response.data);
      toast.success("Cliente guardado exitosamente") 
      fetchClientes();
      setClienteDataExtra({ apellido: '' });
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
      toast.error('Error al registrar cliente');
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
        toast.error("Error al eliminar cliente" + error);
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
      toast.success("El cliente se elimino con exito");
      fetchClientes();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      toast.error("Error al eliminar cliente");
    }
  };

  const handleShowAlert = (client) => {
    setClientToDelete(client);
    setShowAlert(true);
  };

//suscripcion
useEffect(() => {
  fetchActividades();
}, []);
const handleSuscripcionModalOpen = () => {
  setSuscripcionModalOpen(true);
};

const handleSuscripcionModalClose = () => {
  setSuscripcionModalOpen(false);
};

const fetchActividades = async () => {
  try {
    const response = await api.get("http://localhost:8080/actividades/page/1");
    const actividadesData = response.data.items.map((actividad) => ({
      id: actividad.id,
      nombre: actividad.nombre,
    }));
    setActividades(actividadesData);
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    toast.error("Error al obtener actividades");
  }
};


const handleSubmitSuscripcion = async (event) => {
  event.preventDefault();

  const suscripcionData = {
    suscripcionDto: {
      clienteID: selectedClienteId,
      total: 100.0,
    },
    suscripcionDetalleDtoList: [
      {
        subscripcionId: null,
        actividadId: selectedActividadId,
        estado: "PAGADO",
        fechaInicio: fechaInicio,
        fechaFin: "",
        modalidad: modalidad,
      },
    ],
  };

  try {
    const response = await api.post(
      "http://localhost:8080/suscripciones/con-detalles",
      suscripcionData
    );
    console.log("Suscripción agregada:", response.data);
    toast.success("Suscripción agregada exitosamente");
    setSuscripcionModalOpen(false);
  } catch (error) {
    console.error("Error al agregar suscripción:", error);
    toast.error("Error al agregar suscripción");
  }
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
            <Button   text="Filtar por" onClick={handleSearchChange} />
            <button className="button" onClick={() => setShowModal(true)}>
              <IoAdd />
              Nuevo Cliente
            </button>
          </div>
        </div>
        <hr />
        <div className="tabla">
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
                <td className=".custom-table2">{cliente.active ? "Activo" : "Inactivo"}</td>
                <td className=".custom-table2">Plan</td>
                <td className="custom-table2">{cliente.email}</td>
                <td className="custom-table2">{cliente.telefono}</td>
                <td className="custom-table2">
                  <a href="#" onClick={() => handleShowAlert(cliente)}>
                    <RiDeleteBinLine />
                  </a>
                  <a href="#" onClick={() => handleEditClientClick(cliente)}>
        <FiEdit2 />
                  </a>
                  <a href="#" onClick={() => handleSuscripcionModalOpen()}>
                  <IoAddOutline />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="d-flex justify-content-center mt-4">
        <Pagination
    count={Math.ceil(filteredClientes.length / itemsPerPage)}
    page={currentPage <= 2 ? currentPage : 1} 
    onChange={(event, value) => setCurrentPage(value)}
    shape="rounded"
    color="secondary"
  />
  
  </div>
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
      {/*modal para editar cliente*/ }
      <ModalBase
       open={modalOpen}
       title="Editar Cliente"
       closeModal={handleCloseModal}
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
                  value={editingClient ? editingClient.nombre : ""}
                  onChange={handleNameChange}
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
                    value={editingClient ? editingClient.ruc : ""}
                    onChange={handleRucChange}
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
                    value={editingClient ? editingClient.telefono : ""}
                    onChange={handleTelefonoChange}
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
                  value={editingClient ? editingClient.email : ""}
                  onChange={handleEmailChange}
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
                  value={editingClient ? editingClient.direccion : ""}
                  onChange={handleDireccionChange}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center float-end">
              <ButtonBasic text="Guardar" onClick={handleGuardarCambios}>
              {loading ? "Cargando..." : "Guardar Cambios"}
            </ButtonBasic>
              </div>
            </form>
          </div>
        </div>
      </ModalBase>
      

      {/*modal de suscripciones */}
      <ModalBase
        open={suscripcionModalOpen}
        closeModal={handleSuscripcionModalClose}
        title="Agregar Suscripción"
      >
        <form onSubmit={handleSubmitSuscripcion}>
          <div>
            <LabelBase label="Cliente:" htmlFor="cliente">
            <LabelBase label="Nombre:" htmlFor="nombre" />
                <p 
                  style={{ width: "100%", height: "30px" }}/>
              <select
                id="cliente"
                name="cliente"
                value={selectedClienteId}
                onChange={(e) => setSelectedClienteId(e.target.value)}
              >
                <option value="">Selecciona un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </LabelBase>
          </div>
          <div>
            <LabelBase label="Modalidad:" htmlFor="modalidad" />
            <select
            style={{ width: "100%", height: "30px" }}
              id="modalidad"
              name="modalidad"
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
            >
              <option value="">Selecciona una modalidad</option>
              <option value="SEMANAL">Semanal</option>
              <option value="MENSUAL">Mensual</option>
            </select>
          </div>
          <div>
            <LabelBase label="Fecha de inicio:" htmlFor="fechaInicio" />
            <input
            style={{ width: "25%", height: "30px" }}
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div>
            <LabelBase label="Actividad:" htmlFor="actividad"/>
              <select
              style={{ width: "100%", height: "30px" }}
                id="actividad"
                name="actividad"
                value={selectedActividadId}
                onChange={(e) => setSelectedActividadId(e.target.value)}
              >
                <option value="">Selecciona una actividad</option>
                {actividades.map((actividad) => (
                  <option key={actividad.id} value={actividad.id}>
                    {actividad.nombre}
                  </option>
                ))}
              </select>
          </div>   
          <ButtonBasic text="Guardar" onClick={handleSubmitSuscripcion}>
              {loading ? "Cargando..." : "Guardar Cambios"}
            </ButtonBasic>
        </form>
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
      <Toaster position="top-right" reverseOrder={false}
  toastOptions={{
    success: {
      style: {
        background: '#75B798',
        color: '#0A3622'
      },
    },
    error: {
      style: {
        background: '#FFDBD9',
        color: '#D92D20'
      },
    },
      
  }}
/>

      <div className="d-flex justify-content-center mt-4">
    
      <div className="pagination-container">
  
</div>

      </div>
    </div>
  );
};

export default MainClients;
