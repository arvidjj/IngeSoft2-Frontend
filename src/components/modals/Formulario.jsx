import React from "react";
import { useForm } from "react-hook-form";
import ButtonBasic from "../bottons/ButtonBasic";
import LabelBase from "../labels/LabelBase";

const Formulario = ({  handleCampoChange, productosData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Llamar a la API para crear un producto
      const response = await api.post("/productos", data); // Llama a la API con los datos del formulario
      console.log("Producto creado:", response.data);
      toast.success("Producto creado satisfactoriamente");

      // Realizar cualquier otra acción necesaria, como cerrar el modal
    } catch (error) {
      console.error("Error al crear el producto:", error);
      toast.error("Error al crear el producto");
    }
  };
  return (
    <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
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
          {...register("nombre", { required: true })}
        />
        {errors.nombre?.type === "required" && <p>Este campo es obligatorio</p>}
      </div>
      <div className="mb-2 block">
        <div className="label-container">
          <LabelBase label="Descripcion:" htmlFor="descripcion" />
        </div>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          className="form-control"
          {...register("descripcion", {
            required: false,
            maxLength: 20,
          })}
        />
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
              {...register("codigo", { required: true })}
            />
            {errors.codigo?.type === "required" && (
              <p>Este campo es obligatorio</p>
            )}
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
              {...register("cantidad", { required: true })}
            />
            {errors.cantidad?.type === "required" && (
              <p>Este campo es obligatorio</p>
            )}
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
              {...register("costo", { required: true })}
            />
            {errors.costo?.type === "required" && (
              <p>Este campo es obligatorio</p>
            )}
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
              {...register("precio", { required: true })}
            />
           {errors.precio?.type === 'required' && (
          <p>Este campo es obligatorio</p>
        )}
          </div>
        </div>
      </div>
      <div className="campo-obligatorio">
        <span className="required">*</span>
        <span className="message">Campo obligatorio</span>
      </div>
      <div className="d-flex justify-content-center align-items-center float-end">
        <ButtonBasic type="submit" text="Aceptar" />
      </div>
    </form>
  );
};

export default Formulario;
