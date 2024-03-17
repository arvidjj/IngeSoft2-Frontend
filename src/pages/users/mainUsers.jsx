import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainUsers.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { IoAdd, IoCheckmark } from "react-icons/io5";
import { PiUserCircleLight } from "react-icons/pi";
import { TbArrowDown } from "react-icons/tb";
import { GoQuestion } from "react-icons/go";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import LabelBase from "../../components/labels/LabelBase";
import ModalBase from "../../components/modals/ModalBase";
import ButtonBasic from "../../components/bottons/ButtonBasic";
import EstadoRol from "../../components/estadoRol/estadoRol";
import CustomAlert from "../../components/alert/CustomAlert";
import Pagination from "@mui/material/Pagination";
import toast, { Toaster } from "react-hot-toast";

const MainUsers = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
      nombre: "",
      cedula:"",
      telefono:"",
      direccion:"",
      email: "",
      rol_id: null
    });
    const roles = [
        {label:"rol", value: null},
        {label:"admin", value: 1},
        {label:"cajero", value: 3},
        {label:"entrenador", value: 4}
    ]
     useEffect(() => {
         fetchUsers(currentPage);
     }, [currentPage]);
    
    const fetchUsers = async (page) => {
      try {
        const response = await api.get(`/empleados/page/${page}`);
        setUsers(response.data.items);
        setFilteredUsers(response.data.items);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error al obtener los empleado:", error);
        toast.error("No se pudo obtener empleados")
      }
    };
    // const handleNuevoUsuario = () => {
    //   setModalMode("create");
    //   setUserData({
    //     nombre: "",
    //     email: "",
    //     password:"",
    //     rol_id: null
    //   })
    //   setShowModal(true)
    // }
    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
      
        if (term.length >= 4) {
          searchClientes(term);
        } else {
            setFilteredUsers(users);
          // Siempre vuelve a la primera página cuando se borra el término de búsqueda
          setCurrentPage(1);
        }
    };
    const searchClientes = (term) => {
          const filtered = users.filter((user) => {
          const nombre = user.nombre.toLowerCase();
          const email = user.email.toLowerCase();
    
          return (
            nombre.includes(term.toLowerCase()) ||
            email.includes(term.toLowerCase())
          );
        });
        setFilteredUsers(filtered);
    };

    //Buscar una mejor implementacion
    const rolByID = (id) => {
      if(id === 1){
        return "Admin"
      }
      else if(id === 3){
        return "Cajero"
      }
      else if(id === 4){
        return "Entrenador"
      }
      else {
        return "Rol Invalido"
      }
    };
      // Funcion para guardar los cambios realizados en el cliente
      // Pendiente a la API

    const handleEditarUsuario = (usuario) => {
      setModalMode("edit"); // Establece el modo como editar
      setUserData(usuario); // Establece los datos del user a editar en el estado
      setShowEditModal(true);
    };
  
    // Función para cerrar el modal
    const handleCloseModal = () => {
      setShowModal(false);
      setShowEditModal(false);
    };
    const handleAceptar = async () => {
      try {
        if (modalMode === "create") {
          // Validación de Nombre
          const nombreExists = users.some(
            (user) =>
              user.nombre.toLowerCase() === userData.nombre.toLowerCase()
          );
          if (nombreExists) {
            toast.error("El nombre del usuario ya existe.");
            return;
          }
  
          // Validación de Código
          if (userData.cedula.length < 4) {
            toast.error("El código debe tener al menos 4 caracteres.");
            return;
          }
          const cedulaExists = users.some(
            (user) =>
              user.cedula.toLowerCase() === userData.cedula.toLowerCase()
          );
          if (cedulaExists) {
            toast.error("La cedula del user ya está en uso.");
            return;
          }
        }
  
        let response;
        if (modalMode === "create") {
          response = await api.post("/empleados", userData);
          console.log("Usuario creado:", response.data);
          toast.success("Usuario creado satisfactoriamente");
        } else if (modalMode === "edit") {
          // Verificar si se realizaron cambios
          const editedUsuarios = users.find(
            (user) => user.id === userData.id
          );
          if (
            editedUsuarios.nombre === userData.nombre &&
            editedUsuarios.cedula === userData.cedula
          ) {
            toast.promise(new Promise((resolve) => resolve()), {
              loading: "Guardando...",
              success: "No se realizo ningun cambio en el user.",
              error: "Hubo un error al guardar los cambios.",
            });
            return;
          }
          response = await api.put(
            `/empleados/${userData.id}`,
            userData
          );
          console.log("Usuario editado:", response.data);
          toast.success("Usuario actualizado satisfactoriamente");
        }
  
        setShowModal(false);
        setShowEditModal(false);
        fetchUsers(currentPage);
      } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        toast.error("Error al procesar la solicitud");
      }
    };

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
          setUserData({
            ...userData,
            [name]: value,
            cedula: cedulaValue,
          });
        } else {
          // Si no es 'ruc', actualiza normalmente
          setUserData({
            ...userData,
            [name]: value,
          });
        }
    };


    const handleConfirmDelete = async () => {
        if (userToDelete) {
          try {
            await handelDeleteUser(userToDelete.id);
            setShowAlert(false);
          } catch (error) {
            console.error("Error al eliminar usuario:", error);
            toast.error("Error al eliminar usuario" + error);
          }
        }
    };

    const handleCancelDelete = () => {
        setShowAlert(false); // Oculta la alerta
    };

    //API pendiente
    // funcion para cancelar la eliminación del cliente
    const handelDeleteUser = async (id) => {
        setShowAlert(false);
        try {
        await api.delete(`/empleados/${id}`);
        // Vuelve a cargar la lista de clientes despues de eliminar uno
        toast.success("El usuario se elimino con exito");
        fetchUsers(currentPage);
        } catch (error) {
        console.error("Error al eliminar usuario:", error);
        toast.error("Error al eliminar usuario");
        }
    };
    const handleShowAlert = (user) => {
        setUserToDelete(user)
        setShowAlert(true);
    };
    
  return(
    <div className="MaquetaCliente">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style:{
              background: "#75B798",
              color:"#0A3622"
            },
          },
          error:{
            style: {
              background: "#FFDBD9",
              color: "#D92D20"
            },
          },
        }}
      />

      <div class="card">
        <div class="container">
          <div className="card-1">
            <h2>Usuarios</h2>
            <div className="card-body d-flex align-items-center justify-content-between">
              <form className="d-flex flex-grow-1">
                <input
                  className="form-control mt-3 custom-input"
                  type="text"
                  placeholder="Buscar usuario"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <ButtonBasic text="Buscar"/>
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
                  <a className="dropdown-item">Rol</a>
                </li>
              </ul>
              </div>

              { /* onClick={handleNuevoUsuario} */}
              <button className="button-t" onClick={() => setShowModal(true)}> 
                + Nuevo Usuario
              </button>
            </div>
          </div>

          <ModalBase
            //Implementacion de Cesar.
            open={showModal || showEditModal}
            closeModal={handleCloseModal}
            title={showModal ? "Crear Nuevo Usuario" : "Editar Usuario"}
            // open={showModal}
            // closeModal={() => setShowModal(false)}
            // title="Registro de Usuario"
          >
            <form className="mb-3">
              <div className="mb-2 block">
                <div className="label-container">
                  <LabelBase label="Nombre:" htmlFor="nombre" />
                  <span className="required">*</span>
                </div>
                <input
                  style={{ width: "100%", height: "30px" }}
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={userData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div> 
              <div className="d-flex justify-content-between">
                <div className="row ">
                  <div className="col-sm">
                    <div className="label-container">
                      <LabelBase label="Telefono:" htmlFor="telefono" />
                      <span className="required">*</span>
                    </div>
                    <input
                      style={{ width: "100%", height: "30px" }}
                      type="text"
                      id="telefono"
                      name="telefono"
                      className="form-control"
                      value={userData.telefono}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-sm">
                    <div className="label-container">
                      <LabelBase label="Cedula:" htmlFor="cedula" />
                      <span className="required">*</span>
                    </div>
                    <input
                      style={{ width: "100%", height: "30px" }}
                      type="text"
                      id="cedula"
                      name="cedula"
                      className="form-control"
                      value={userData.cedula}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-2 block">
                <div className="label-container">
                  <LabelBase label="Direccion:" htmlFor="direccion" />
                  <span className="required">*</span>
                </div>
                <input
                  style={{ width: "100%", height: "30px" }}
                  type="text"
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  value={userData.direccion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2 block">
                <div className="label-container">
                  <LabelBase label="e-mail:" htmlFor="e-mail" />
                  <span className="required">*</span>
                </div>
                  <input
                    type="text"
                    style={{ width: "100%", height: "30px" }}
                    id="email"
                    name="email"
                    className="form-control"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
              </div>
              <div className="mb-2 block">
                <div className="label-container">
                  <LabelBase label="Rol:" htmlFor="rol" />
                  <span className="required">*</span>
                </div>
                <select
                  style={{ width: "100%", height: "40px" }}
                  id="rol_id"
                  name="rol_id"
                  className="form-control form-select"
                  value={userData.rol_id}
                  onChange={handleInputChange}>
                      {roles.map((opcion)=>(
                          <option key={opcion.value} value={opcion.value}>
                              {opcion.label}
                          </option>
                      ))}
                </select>
              </div>
              <div className="campo-obligatorio">
                <span className="required">*</span>
                <span className="message">Campo obligatorio</span>
              </div>

              <div className="d-flex justify-content-center align-items-center float-end">
                {/* <ButtonBasic text="Guardar" onClick={handleSubmit}>
                  {loading ? "Cargando..." : "Agregar Usuario"}
                </ButtonBasic> */}
                <ButtonBasic text="Aceptar" onClick={handleAceptar} />
              </div>
            </form> 
          </ModalBase>  
          {showAlert && userToDelete && (
      <CustomAlert
        message={`¿Estás seguro de eliminar a ${userToDelete.nombre}?`}
        confirmText="Aceptar"
        cancelText="Cancelar"
        confirmAction={handleConfirmDelete}
        cancelAction={handleCancelDelete}
      />
          )}            
          <div class="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th scope="col">Nombre del Usuario</th>
                  <th scope="col">
                    Rol <TbArrowDown />
                  </th>
                  <th scope="col">
                    email <GoQuestion />
                  </th>
                  <th scope="col">Telefono</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td><div className="estadoIDUser">{rolByID(user.rol_id)}</div></td>
                    <td>{user.email}</td>
                    <td>{user.telefono}</td>
                    <td class="text-center">
                      <a href="#" onClick={() => handleShowAlert(user)}
                      style={{ fontSize:"1.2rem"}}>
                        <RiDeleteBinLine />
                      </a>
                      <a
                        href="#"
                        onClick={() => handleEditarUsuario(user)}
                        style={{ marginLeft: "1.5em", fontSize:"1.2rem"}}
                      >
                        <FiEdit2 />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-container">
            <Pagination
              count={totalPages}
              shape="rounded"
              color="secondary"
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainUsers;