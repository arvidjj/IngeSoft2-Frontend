import React, { useState, useEffect } from "react";
import "./MainProductos.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { TbArrowDown } from "react-icons/tb";
import { GoQuestion } from "react-icons/go";
import Pagination from "@mui/material/Pagination";
import ButtonBasic from "../../components/bottons/ButtonBasic";
import ModalBase from "../../components/modals/ModalBase";
import LabelBase from "../../components/labels/LabelBase";
import CustomAlert from "../../components/alert/CustomAlert";
import { IoCheckmark } from "react-icons/io5";
import api from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";

const MainProductos = () => {
  const [productos, setProductos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [productoToDelete, setProductoToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [modalMode, setModalMode] = useState("create");
  const [sortBy, setSortBy] = useState(""); // Estado para controlar el ordenamiento de los productos
  const [sortType, setSortType] = useState(""); // Estado para controlar el tipo de orden (ascendente o descendente)

  const notifyProducto = () =>
    toast.success("Producto creado satisfactoriamente");
  const notifyProductoActualizado = () =>
    toast.success("Producto actualizado satisfactoriamente");
  const [productosData, setProductosData] = useState({
    nombre: "",
    descripcion: "",
    codigo: "",
    costo: "",
    cantidad: "",
    precio: "",
  });

  useEffect(() => {
    fetchProductos(currentPage);
  }, [currentPage]);

  const fetchProductos = async (page) => {
    try {
      const response = await api.get(`/productos/page/${page}`);
      setProductos(response.data.items);
      setFilteredProductos(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleNuevoProducto = () => {
    setModalMode("create"); // Establece el modo como crear
    setProductosData({
      nombre: "",
      descripcion: "",
      codigo: "",
      costo: "",
      cantidad: "",
      precio: "",
    });
    setShowModal(true);
  };

  // Función para abrir el modal de edición y cargar los datos del producto
  const handleEditarProducto = (producto) => {
    setModalMode("edit"); // Establece el modo como editar
    setProductosData(producto); // Establece los datos del producto a editar en el estado
    setShowEditModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
  };
  // Antes de la declaración del componente, dentro de la función de componentes:
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductosData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNameChange = (event) => {
    handleInputChange(event);
  };

  const handleDescripcionChange = (event) => {
    handleInputChange(event);
  };

  const handleCodigoChange = (event) => {
    handleInputChange(event);
  };

  const handleCostoChange = (event) => {
    handleInputChange(event);
  };

  const handleCantidadChange = (event) => {
    handleInputChange(event);
  };

  const handlePrecioChange = (event) => {
    handleInputChange(event);
  };

  const handleAceptar = async () => {
    try {
      if (modalMode === "create") {
        // Lógica para crear un nuevo producto
        const response = await api.post("/productos", productosData);
        console.log("Producto creado:", response.data);
        notifyProducto();
      } else if (modalMode === "edit") {
        // Lógica para editar un producto existente
        const response = await api.put(
          `/productos/${productosData.id}`,
          productosData
        );
        console.log("Producto editado:", response.data);
        notifyProductoActualizado();
      }
      setShowModal(false);
      fetchProductos(currentPage);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      toast.error("Error al procesar la solicitud");
    }
  };

  const handleEliminarProducto = async () => {
    if (productoToDelete) {
      try {
        await api.delete(`/productos/${productoToDelete.id}`);

        fetchProductos(currentPage);
        toast.success("Producto eliminado satisfactoriamente");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        toast.error("Error al eliminar el producto");
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (productoToDelete) {
      try {
        await handleEliminarProducto();
        setShowAlert(false);
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        toast.error("Error al eliminar producto" + error);
      }
    }
  };

  const handleShowAlert = (producto) => {
    setProductoToDelete(producto);
    setShowAlert(true);
  };

  const handleCancelDelete = () => {
    setShowAlert(false); // Oculta la alerta
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length >= 4) {
      // Solo realiza la búsqueda si el término tiene al menos 3 letras
      searchProductos(term);
      setCurrentPage(1);
      setSortBy(""); // Restablecer el ordenamiento al iniciar una nueva búsqueda
      setSortType("");
    } else {
      // Restablece la lista de productos original si el término tiene menos de 3 letras
      setFilteredProductos(productos);
      // Siempre vuelve a la primera página cuando se borra el término de búsqueda
    }
  };

  const searchProductos = (term) => {
    const filtered = productos.filter((producto) => {
      const nombre = producto.nombre.toLowerCase();
      const codigo = producto.codigo.toLowerCase();

      return (
        nombre.includes(term.toLowerCase()) ||
        codigo.includes(term.toLowerCase())
      );
    });
    setFilteredProductos(filtered);
  };

  const handleSortBy = (sortBy) => {
    if (sortBy === "nombre") {
      setFilteredProductos(sortProductos(filteredProductos.slice(), sortBy));
      setSortBy("nombre");
    }
  };

  const sortProductos = (productos, sortBy) => {
    return productos.sort((a, b) => {
      if (sortBy === "precio" || sortBy === "cantidad") {
        return a[sortBy] - b[sortBy];
      } else {
        // Ordenamiento por otros tipos de datos
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      }
    });
  };
  
  const handleSortByPrice = () => {
    setFilteredProductos(sortProductos(filteredProductos.slice(), "precio"));
    setSortBy("precio");
  };
  
  const handleSortByCantidad = () => {
    setFilteredProductos(sortProductos(filteredProductos.slice(), "cantidad"));
    setSortBy("cantidad");
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
        <div className="container">
          <div className="card-1">
            <h2>Tienda</h2>
            <div className="card-body d-flex align-items-center justify-content-between">
              <form className="d-flex flex-grow-1">
                <input
                  className="form-control mt-3 custom-input"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
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
                    <a className="dropdown-item" href="#" onClick={handleSortByPrice}>
                      Precio
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleSortByCantidad}>
                      Stock
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => handleSortBy("nombre")}>
                      Nombre
                    </a>
                  </li>
                </ul>
              </div>

              <button className="button-t" onClick={handleNuevoProducto}>
                <IoAdd />
                Nuevo Producto
              </button>
            </div>
          </div>

          <ModalBase
            open={showModal || showEditModal} // Abre el modal tanto para crear como para editar
            closeModal={handleCloseModal}
            title={showModal ? "Crear Nuevo Producto" : "Editar Producto"} // Título dinámico según si es crear o editar
          >
            <form className="mb-3">
              <div className="mb-2 block">
                <LabelBase label="Nombre:" htmlFor="nombre" />
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={productosData.nombre}
                  onChange={handleNameChange}
                />
              </div>

              <div className="mb-2 block">
                <LabelBase label="Descripcion:" htmlFor="descripcion" />
                <input
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  value={productosData.descripcion}
                  onChange={handleDescripcionChange}
                ></input>
              </div>
              <div className="mb-2 block">
                <LabelBase label="Codigo:" htmlFor="codigo" />
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  className="form-control"
                  value={productosData.codigo}
                  onChange={handleCodigoChange}
                />
              </div>
              <div className="mb-2 block">
                <LabelBase label="Costo:" htmlFor="costo" />
                <input
                  id="costo"
                  name="costo"
                  className="form-control"
                  value={productosData.costo}
                  onChange={handleCostoChange}
                />
              </div>
              <div className="mb-2 block">
                <LabelBase label="Cantidad:" htmlFor="cantidad" />
                <input
                  id="cantidad"
                  name="cantidad"
                  className="form-control"
                  value={productosData.cantidad}
                  onChange={handleCantidadChange}
                />
              </div>
              <div className="mb-2 block">
                <LabelBase label="Precio:" htmlFor="precio" />
                <input
                  id="precio"
                  name="precio"
                  className="form-control"
                  value={productosData.precio}
                  onChange={handlePrecioChange}
                />
              </div>

              <div className="d-flex justify-content-center align-items-center float-end">
                <ButtonBasic text="Aceptar" onClick={handleAceptar} />
              </div>
            </form>
          </ModalBase>
          {showAlert && productoToDelete && (
            <CustomAlert
              message={`¿Estás seguro de eliminar el producto ${productoToDelete.nombre}?`}
              confirmText="Aceptar"
              cancelText="Cancelar"
              confirmAction={handleConfirmDelete}
              cancelAction={handleCancelDelete}
            />
          )}
          <div className="card-2">
            <table className="custom-table">
              <thead>
                <tr>
                  <th scope="col">Nombre del Producto</th>
                  <th scope="col">
                    Stock <TbArrowDown />
                  </th>
                  <th scope="col">
                    Codigo <GoQuestion />
                  </th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Precio</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProductos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.codigo}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td class="text-center">
                      <a href="#" onClick={() => handleShowAlert(producto)}>
                        <RiDeleteBinLine />
                      </a>
                      <a
                        href="#"
                        onClick={() => handleEditarProducto(producto)}
                        style={{ marginLeft: "2em" }}
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
              onChange={(event, page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProductos;
