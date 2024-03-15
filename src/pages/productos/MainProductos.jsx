import React, { useState, useEffect } from "react";
import "./MainProductos.css";
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
  const [error, setError] = useState(false); // Estado para manejar el error
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Función para filtrar productos por rango de precio
  const handleFilterByPriceRange = (minPrice, maxPrice) => {
    // Filtrar los productos dentro del rango de precios
    const filtered = productos.filter((producto) => {
      const precio = parseFloat(producto.precio);
      return precio >= minPrice && precio <= maxPrice;
    });
    // Actualizar el estado de los productos filtrados
    setFilteredProductos(filtered);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Aquí podrías realizar otras acciones relacionadas con el cambio de página, como cargar datos adicionales, etc.
  };
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
      setError(false);
    } catch (error) {
      setError(true);
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

  const handleCampoChange = (event) => {
    const { name, value } = event.target;
    // Verificar si el valor es negativo y no permitirlo
    if (
      name === "cantidad" ||
      name === "costo" ||
      name === "precio" ||
      name === "codigo"
    ) {
      if (parseFloat(value) < 0) {
        toast.error("No se admiten valores negativos en ningun campo");
        return;
      }
    }
    setProductosData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAceptar = async () => {
    try {
      if (modalMode === "create") {
        // Validación de Nombre
        const nombreExists = productos.some(
          (producto) =>
            producto.nombre.toLowerCase() === productosData.nombre.toLowerCase()
        );
        if (nombreExists) {
          toast.error("El nombre del producto ya existe.");
          return;
        }

        // Validación de Código
        if (productosData.codigo.length < 4) {
          toast.error("El código debe tener al menos 4 caracteres.");
          return;
        }
        const codigoExists = productos.some(
          (producto) =>
            producto.codigo.toLowerCase() === productosData.codigo.toLowerCase()
        );
        if (codigoExists) {
          toast.error("El código del producto ya está en uso.");
          return;
        }
      }

      // Validación de Precio vs. Costo
      if (parseFloat(productosData.precio) < parseFloat(productosData.costo)) {
        toast.error("El precio no puede ser menor que el costo.");
        return;
      }

      let response;
      if (modalMode === "create") {
        response = await api.post("/productos", productosData);
        console.log("Producto creado:", response.data);
        toast.success("Producto creado satisfactoriamente");
      } else if (modalMode === "edit") {
        // Verificar si se realizaron cambios
        const editedProducto = productos.find(
          (producto) => producto.id === productosData.id
        );
        if (
          editedProducto.nombre === productosData.nombre &&
          editedProducto.descripcion === productosData.descripcion &&
          editedProducto.codigo === productosData.codigo &&
          editedProducto.costo === productosData.costo &&
          editedProducto.cantidad === productosData.cantidad &&
          editedProducto.precio === productosData.precio
        ) {
          toast.promise(new Promise((resolve) => resolve()), {
            loading: "Guardando...",
            success: "No se realizo ningun cambio en el producto.",
            error: "Hubo un error al guardar los cambios.",
          });
          return;
        }
        response = await api.put(
          `/productos/${productosData.id}`,
          productosData
        );
        console.log("Producto editado:", response.data);
        toast.success("Producto actualizado satisfactoriamente");
      }

      setShowModal(false);
      setShowEditModal(false);
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
            <h2>Tienda</h2>
            <div className="card-body d-flex align-items-center ">
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
                  className="btn btn-secundary dropdown-toggle btn-filtrar"
                  data-bs-toggle="dropdown"
                  style={{ fontSize: "1.02rem" }}
                >
                  <IoCheckmark />
                  Filtrar por Precio
                </button>
                <ul className="dropdown-menu">
                  <form className=" px-2 ">
                    <div className="mb-3">
                      <label htmlFor="minPrice" className="form-label">
                        Precio mínimo
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="minPrice"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>

                    <label htmlFor="maxPrice" className="form-label">
                      Precio máximo
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="maxPrice"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <div className="d-grid">
                      <ButtonCrear
                        text="Aplicar"
                        onClick={() =>
                          handleFilterByPriceRange(
                            parseFloat(minPrice),
                            parseFloat(maxPrice)
                          )
                        }
                      />
                    </div>
                  </form>
                </ul>
              </div>

              <ButtonCrear
                text="Nuevo Producto"
                onClick={handleNuevoProducto}
                icon={<IoAdd />}
                color="secondary"
              />
            </div>
          </div>

          <ModalBase
            open={showModal || showEditModal}
            closeModal={handleCloseModal}
            title={showModal ? "Crear Nuevo Producto" : "Editar Producto"}
          >
            <form className="mb-3">
              <div className="mb-2 block">
                <div className="label-container">
                  <LabelBase label="Nombre:" htmlFor="nombre" />
                  <span className="required">*</span>
                </div>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={productosData.nombre}
                  onChange={handleCampoChange}
                  required
                />
              </div>
              <div className="mb-2 block">
                <div className="label-container">
                  <LabelBase label="Descripcion:" htmlFor="descripcion" />
                  {/* No se requiere asterisco para campos opcionales */}
                </div>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  value={productosData.descripcion}
                  onChange={handleCampoChange}
                  maxLength={40}
                ></input>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column mr-2">
                  <div className="mb-2 block">
                    <div className="label-container">
                      <LabelBase label="Codigo:" htmlFor="codigo" />
                      <span className="required">*</span>
                    </div>
                    <input
                      type="number"
                      id="codigo"
                      name="codigo"
                      className="form-control"
                      value={productosData.codigo}
                      onChange={handleCampoChange}
                      required
                    />
                  </div>
                  <div className="mb-2 block">
                    <div className="label-container">
                      <LabelBase label="Cantidad:" htmlFor="cantidad" />
                      <span className="required">*</span>
                    </div>
                    <input
                      type="number"
                      id="cantidad"
                      name="cantidad"
                      className="form-control"
                      value={productosData.cantidad}
                      onChange={handleCampoChange}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <div className="mb-2 block">
                    <div className="label-container">
                      <LabelBase label="Costo:" htmlFor="costo" />
                      <span className="required">*</span>
                    </div>
                    <input
                      type="number"
                      id="costo"
                      name="costo"
                      className="form-control"
                      value={productosData.costo}
                      onChange={handleCampoChange}
                      required
                    />
                  </div>
                  <div className="mb-2 block">
                    <div className="label-container">
                      <LabelBase label="Precio:" htmlFor="precio" />
                      <span className="required">*</span>
                    </div>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      className="form-control"
                      value={productosData.precio}
                      onChange={handleCampoChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="campo-obligatorio">
                <span className="required">*</span>
                <span className="message">Campo obligatorio</span>
              </div>
              <div className="d-flex justify-content-center align-items-center float-end">
                <ButtonCrear text="Aceptar" onClick={() => handleAceptar()} />
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
          <div class="table-container">
            {error ? (
              <ErrorPagina /> // Muestra el componente de error si hay un error
            ) : (
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
                    <th scope="col">Precio(Gs)</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProductos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>
                        <StockIndicator stock={producto.cantidad} />
                      </td>
                      <td>{producto.codigo}</td>
                      <td>{producto.descripcion}</td>
                      <td>{producto.precio}</td>
                      <td class="text-center">
                        <a
                          href="#"
                          onClick={() => handleShowAlert(producto)}
                          style={{ fontSize: "1.2rem" }}
                        >
                          <RiDeleteBinLine />
                        </a>
                        <a
                          href="#"
                          onClick={() => handleEditarProducto(producto)}
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
          <div className="pagination-container">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProductos;
