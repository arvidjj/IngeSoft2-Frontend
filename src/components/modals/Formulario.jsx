import React from "react";
import { useForm } from "react-hook-form";
import ButtonBasic from "../bottons/ButtonBasic";
import LabelBase from "../labels/LabelBase";

const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  
  const onSubmit = handleSubmit((data) =>{
    console.log(data);
  });

  /*
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
  };*/
  
  return (
    <form className="mb-3" onSubmit={onSubmit}>
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
          {...register("nombre", {
            required: {
              value: true,
              message: "Nombre requerido",
            },
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 20,
              message: "El nombre debe tener al maximo 20 caracteres",
            },
          })}
        />
        {errors.nombre && <span>{errors.nombre.message}</span>}
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
            maxLength: {
              value: 40,
              message: "La descripcion solo puede tener 40 caracteres",
            },
          })}
        />
        {errors.descripcion && <span>{errors.descripcion.message}</span>}
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
              {...register("codigo", {
                required: {
                  value: true,
                  message: "Codigo requerido",
                },
                minLength: {
                  value: 6,
                  message: "El codigo solo debe tener 6 digitos",
                },
                maxLength: {
                  value: 6,
                  message: "El codigo solo debe tener 6 digitos",
                },
              })}
            />
            {errors.codigo && <span>{errors.codigo.message}</span>}
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
              {...register("cantidad", {
                required: {
                  value: true,
                  message: "Cantidad requerido",
                },
                maxLength: {
                  value: 999,
                  message: "La cantidad no puede superar las 1000 unidades",
                },
              })}
            />
            {errors.cantidad && <span>{errors.cantidad.message}</span>}
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
              {...register("costo", {
                required: {
                  value: true,
                  message: "Costo requerido",
                },
                minLength: {
                  value: 1,
                  message: "El costo no puede ser 0",
                },
              })}
            />
            {errors.costo && <span>{errors.costo.message}</span>}
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
              {...register("precio", {
                required: {
                  value: true,
                  message: "Precio requerido",
                },
                minLength: {
                  value: 2,
                  message: "El precio debe ser mayor al costo",
                },
              })}
            />
            {errors.precio && <span>{errors.precio.message}</span>}
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
