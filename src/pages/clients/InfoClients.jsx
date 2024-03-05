import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InfoClients.css";
import toast, { Toaster } from "react-hot-toast";

import { useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import Alert from "@mui/material/Alert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { IoPencilOutline } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";

import ButtonBasic from "../../components/bottons/ButtonBasic.jsx";
import ModalBase from "../../components/modals/ModalBase.jsx";
import LabelBase from "../../components/labels/LabelBase.jsx";
import EstadoPago from "../../components/estado_pago/EstadoPago.jsx";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const InfoClients = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [showPayments, setShowPayments] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("one");
  const [editingClient, setEditingClient] = useState(null);
  const notify = () => toast.success("Cambios guardados satisfactoriamente");

  useEffect(() => {
    fetchCliente();
  }, [id]);

  const fetchCliente = async () => {
    try {
      const response = await api.get(`/clientes/${id}`); // Utiliza el id para obtener los datos del cliente
      setCliente(response.data);
    } catch (error) {
      console.error("Error al obtener cliente:", error);
    }
  };

  // Función para obtener las iniciales del nombre y del apellido
  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0)).join("");
    return initials.toUpperCase();
  };
  const initials = cliente ? getInitials(cliente.nombre) : "";

  const ButtonBasic2 = ({ initials }) => {
    return <div className="circle initials">{initials}</div>;
  };
  // Función para manejar el cambio de pestaña
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Actualiza los estados para mostrar u ocultar las tablas según la pestaña seleccionada
    if (newValue === "one") {
      setShowPayments(true);
      setShowMeasurements(false);
    } else {
      setShowPayments(false);
      setShowMeasurements(true);
    }
  };
  const handleNameChange = (event) => {
    setEditingClient({
      ...editingClient,
      nombre: event.target.value,
    });
  };
  // Función para abrir el modal cuando se hace clic en "Editar Cliente"
  const handleEditClientClick = () => {
    setEditingClient(cliente);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAceptar = async () => {
    try {
      await api.put(`/clientes/${id}`, editingClient); // Actualiza el cliente con los datos editados
      setCliente(editingClient); // Actualiza el estado local del cliente
      setModalOpen(false); // Cierra el modal
      notify(); // Mostrar notificación al actualizar cliente
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
    }
  };

  return (
    <div className="container-fluid MaquetaCliente">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="cuadro-central">
        <div style={{ marginLeft: "3%" }}>
          <Link to="/clientes">
            <button className="custom-button">
              <IoArrowBackSharp />
            </button>
          </Link>
        </div>
        <div className="cuadro-medio">
          {cliente && ( // Verifica si cliente no es null antes de intentar acceder a sus propiedades
            <div className="info-cliente">
              <div>
                <ButtonBasic2 initials={initials} />
              </div>
              <div style={{ marginLeft: "10%" }}>
                <h3 style={{ color: "#667085" }}>{cliente.nombre}</h3>
                <Alert
                  variant="outlined"
                  severity="error"
                  style={{ borderRadius: "50px", backgroundColor: "#FFCFCF" }}
                >
                  Este cliente tiene 1 pago atrasado
                </Alert>
                {/*https://mui.com/material-ui/react-alert/     Para buscar las otras alertas*/}
              </div>

              <div className="d-flex justify-content-center mb-4 float-end">
                <ButtonBasic
                  icon={<IoPencilOutline />}
                  color="secondary"
                  text="Editar Cliente"
                  onClick={handleEditClientClick}
                />
              </div>
            </div>
          )}
          {/* Modal que se abre al editar */}
          <ModalBase
            open={modalOpen}
            title="Editar Cliente"
            closeModal={handleCloseModal}
          >
            <form className="mb-3">
              <div className="mb-2 block">
                <LabelBase label="Nombre y Apellido:" htmlFor="nombre" />
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={editingClient ? editingClient.nombre : ""}
                  onChange={handleNameChange}
                />
              </div>

              <div className="mb-2 block">
                <LabelBase label="Plan Actual:" htmlFor="plan-actual" />
                <select
                  id="plan-actual"
                  name="plan-actual"
                  className="form-select"
                >
                  <option value="mensual">Mensual</option>
                  <option value="semanal">Semanal</option>
                  <option value="diario">Diario</option>
                </select>
              </div>
              <div className="mb-2 block">
                <LabelBase label="RUC:" htmlFor="ruc" />
                <input
                  type="text"
                  id="ruc"
                  name="ruc"
                  className="form-control"
                  value={editingClient ? editingClient.ruc : ""}
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-2 block">
                <LabelBase label="Telefono:" htmlFor="telefono" />
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  className="form-control"
                  value={editingClient ? editingClient.telefono : ""}
                  onChange={handleNameChange}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center float-end">
                <ButtonBasic text="Aceptar" onClick={handleAceptar} />
              </div>
            </form>
          </ModalBase>

          <hr />
          {cliente && (
            <div className="datos-extras">
              <div>
                <h4>Plan Actual</h4>
                <p>{cliente.planActual}</p>
              </div>
              <div>
                <h4>RUC</h4>
                <p>{cliente.ruc}</p>
              </div>
              <div>
                <h4>N° de Telefono</h4>
                <p>{cliente.telefono}</p>
              </div>
            </div>
          )}
          <Box className="Pago-Mediciones d-flex justify-content-center mb-3">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="one" label="Pagos" />
              <Tab value="two" label="Mediciones" />
            </Tabs>
          </Box>
          {/* Renderiza la tabla de pagos si showPayments es true */}
          {showPayments && (
            <table class="table table-striped">
              {/* Contenido de la tabla de pagos */}
                             
               <thead>
                  <tr>
                    <th scope="col">N° Factura</th>
                    <th scope="col">Pago</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">11111</th>
                    <td>Enero</td>
                    <td><EstadoPago estado="No pagado" /></td>
                  </tr>
                  <tr>
                    <th scope="row">2222</th>
                    <td>Febrero</td>
                    <td><EstadoPago estado="Pagado" /></td>
                  </tr>
                  <tr>
                    <th scope="row">33333</th>
                    <td>Marzo</td>
                    <td><EstadoPago estado="Pagado" /></td>
                  </tr>
                </tbody>
             </table>
            
          )}

          {/* Renderiza la tabla de mediciones si showMeasurements es true */}
          {showMeasurements && (
            <table class="table table-striped">              {/* Contenido de la tabla de mediciones */}
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Brazo</th>
                    <th scope="col">Piernas</th>
                    <th scope="col">Cintura</th>
                    <th scope="col">Cadera</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">21 Enero 2023</th>
                    <td>32</td>
                    <td>32</td>
                    <td>32</td>
                    <td>32</td>
                  </tr>
                  <tr>
                    <th scope="row">21 Enero 2023</th>
                    <td>32</td>
                    <td>32</td>
                    <td>32</td>
                    <td>32</td>
                  </tr>
                  <tr>
                    <th scope="row">21 Enero 2023</th>
                    <td>32</td>
                    <td>32</td>
                    <td>32</td>
                    <td>32</td>
                  </tr>
                </tbody>
              </table>
            
          )}

          <div className="d-flex justify-content-center mt-4">
            <Pagination count={5} shape="rounded" color="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoClients;
