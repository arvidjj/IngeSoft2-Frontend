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
//    const [modalMode, setModalMode] = useState("create");s
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
        setUserData(response.data.items);
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
    const handleNameChange = (event) => {
        setEditingUser({
          ...editingUser,
          nombre: event.target.value,
        });
    };
      
    const handleEmailChange = (event) => {
        setEditingUser({
          ...editingUser,
          email: event.target.value,
        });
    };
      

    // Funcion para abrir el modal cuando se hace clic en "Editar Cliente"
    const handleEditUserClick = (user) => {
        setEditingUser(user);
        setModalOpen(true);
    };
    const rolByID = (id) => {
      if(id === 1){
        return "ADMIN"
      }
      else if(id === 3){
        return "CAJERO"
      }
      else if(id === 4){
        return "ENTRENADOR"
      }
      else {
        return "ROL INVALIDO"
      }
  };
    // Funcion para cerrar el modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };
      // Funcion para guardar los cambios realizados en el cliente
      // Pendiente a la API
    const handleGuardarCambios = async () => {
        try {
        await api.put(`/clientes/${editingClient.id}`, editingClient); // Actualiza el cliente con los datos editados
        setModalOpen(false); // Cierra el modal 
        fetchClientes();
        toast.success("Usuario editado satisfactoriamente");

        } catch (error) {
        console.error("Error al actualizar usuario:", error);
        toast.error("Error al actualizar usuario " );
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Verificar si algún campo esta vacio
        for (const key in userData) {
          if (userData[key] === "") {
            toast.error(`El campo ${key} no puede estar vacío`);
            return;
          }
        }
    
        // Verificar la validez del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
          toast.error("Correo electrónico inválido");
          return;
        }
    
        setLoading(true);
    
        try {
          const response = await api.post(`/empleados`, userData); //esperando API
          console.log("Usuario agregado:", response.data);
          toast.success("Usuario guardado exitosamente") 
          setUserData({
            nombre: "",
            cedula:"",
            telefono:"",
            direccion:"",
            email: "",
            rol_id: null
          });
          setShowModal(false);
        } catch (error) {
          console.error("Error al registrar usuario:", error);
          toast.error('Error al registrar usuario');
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
        await api.delete(`/clientes/${id}`);
        // Vuelve a cargar la lista de clientes despues de eliminar uno
        toast.success("El usuario se elimino con exito");
        fetchUsers();
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
                  background: "#FFDBD9",
                  color:"#D92D20"
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
                    Nuevo Usuario
                  </button>
                </div>
              </div>

              <ModalBase
                //Implementacion de Cesar.
                // open={showModal || showEditModal}
                // closeModal={handleCloseModal}
                // title={showModal ? "Crear Nuevo Usuario" : "Editar Usuario"}
                open={showModal}
                closeModal={() => setShowModal(false)}
                title="Registro de Usuario"
              >
                <form className="mb-3">
                {/* nombre: "",
                cedula:"",
                telefono:"",
                direccion:"",
                email: "",
                rol_id: null */}
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
                  <div className="mb-2 block">
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
                  <div className="mb-2 block">
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
                    <ButtonBasic text="Guardar" onClick={handleSubmit}>
                      {loading ? "Cargando..." : "Agregar Usuario"}
                    </ButtonBasic>
                    {/* <ButtonBasic text="Aceptar" onClick={handleAceptar} /> */}
                  </div>
                </form> 
              </ModalBase>              
            </div>
          </div>
        
        {/*modal para editar Usuario*/ }
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
                    value={editingUser ?  editingUser.nombre:""}
                    onChange={handleNameChange}
                  />
                </div>
                <div>
                  <LabelBase label="e-mail:" htmlFor="email" />
                  <input
                    type="text"
                    style={{ width: "100%", height: "30px" }}
                    id="email"
                    name="email"
                    className="form-control"
                    value={editingUser ?  editingUser.email : ""}
                    onChange={handleEmailChange}
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
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td>{rolByID(user.rol_id)}</td>
                    <td>{user.email}</td>
                    <td>{user.telefono}</td>
                    <td class="text-center">
                      <a href="#" onClick={() => handleShowAlert(user)}
                      style={{ fontSize:"1.2rem"}}>
                        <RiDeleteBinLine />
                      </a>
                      <a
                        href="#"
                        onClick={() => handleEditarProducto(user)}
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
    )
}
export default MainUsers;