import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainUsers.css";
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

const MainUsers = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
      nombre: "",
      email: "",
      password:"",
      rol_id: null
    });
    const roles = [
//        {label:"rol", value: null},
        {label:"admin", value: 1},
        {label:"cajero", value: 3},
        {label:"entrenador", value: 4}
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Define la cantidad de elementos por página
    // useEffect(() => {
    //     fetchUsers();
    // }, [currentPage]);
    
    const fetchUsers = async () => {
        try {
          const response = await api.get(
           // `/clientes/page/${currentPage}?perPage=${itemsPerPage}` // Pendiente a la api de usuarios
          );
          setUsers(response.data.items);
          setFilteredUsers(response.data.items);
        } catch (error) {
        //   console.error("Error al obtener clientes:", error);
        //   toast.error("Error al actualizar cliente " );
        }
    };
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
    
        // Concatenar el apellido al nombre completo antes de enviar los datos
        //const datosCliente = { ...userData, nombre: nombreCompleto };
    
        try {
          if (userData.rol_id === null){
            console.log("Este es el error")
          }
          const response = await api.post(`/auth/register`, userData); //esperando API
          console.log("Usuario agregado:", response.data);
          toast.success("Usuario guardado exitosamente") 
          setUserData({
            nombre: '',
            email: '',
            password:'',
            rol_id: null,
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
        <div className="cuadro-central">
          <h2>Usuarios</h2>
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
                Nuevo Usuario
              </button>
            </div>
          </div>
          <hr />
          <div className="tabla">
          <table className="custom-table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                {/* <th scope="col">
                  Estado <TbArrowDown />
                </th>
                <th scope="col">
                  Plan <GoQuestion />
                </th> */}
                <th scope="col">Email</th>
                <th scope="col">Numero de telefono</th>
                <th scope="col"></th>
              </tr>
            </thead>
            
          </table>
          </div>
          <div className="d-flex justify-content-center mt-4">
          <Pagination
      count={Math.ceil(filteredUsers.length / itemsPerPage)}
      page={currentPage <= 2 ? currentPage : 1} 
      onChange={(event, value) => setCurrentPage(value)}
      shape="rounded"
      color="secondary"
    />
    
    </div>
        </div>
        {/* Modal para registrar nuevo usuario */}
        <ModalBase
          open={showModal}
          closeModal={() => setShowModal(false)}
          title="Registro de Usuario"
        >
          <div>
            <div className="modal-body" style={{ marginTop: "0px", paddingTop: "0px" }}>
              <p style={{ fontWeight: "bold", fontSize: "14px" }}>Datos Personales</p>
  
              <form>
                <div>
                  <LabelBase label="Nombre:" htmlFor="nombre" />
                  <span className="required">*</span>
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
                <div>
                  <LabelBase label="e-mail:" htmlFor="email" />
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
                <div>
                  <LabelBase label="Contraseña:" htmlFor="contraseña" />
                  <input
                    type="text"
                    style={{ width: "100%", height: "30px" }}
                    id="password"
                    name="password"
                    className="form-control"
                    value={userData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <LabelBase label="Rol:" htmlFor="rol" />
                    <select
                    style={{ width: "100%", height: "30px" }}
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
                <div className="d-flex justify-content-center align-items-center float-end">
                  <ButtonBasic text="Guardar" onClick={handleSubmit}>
                    {loading ? "Cargando..." : "Agregar Usuario"}
                  </ButtonBasic>
                </div>
              </form>
              
            </div>
            
          </div>
        </ModalBase>
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