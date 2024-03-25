import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LabelBase from "../labels/LabelBase";
import ButtonCrear from "../bottons/ButtonCrear";
import ButtonBasic from "../bottons/ButtonBasic";
const FormularioCaja = () => {
  return (
    <Formik
      initialValues={{
        fecha: new Date(),
        modalidadPago: "",
        ruc: "",
        razonSocial: "",
        direccion: "",
        cantidad: "",
        producto: "",
        precioUnitario: "",
        iva: "",
        subtotal: "",
      }}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="d-flex">
                <div style={{ width: "70%" }}>
                  <LabelBase htmlFor="fecha">Fecha</LabelBase>
                  <Field
                    name="fecha"
                    as={DatePicker}
                    className="form-control"
                  />
                  <ErrorMessage name="fecha" component="div" />
                </div>
                <div style={{ width: "50%" }}>
                  <LabelBase htmlFor="modalidadPago">
                    Modalidad de Pago
                  </LabelBase>
                  <Field
                    name="modalidadPago"
                    as="select"
                    className="form-control"
                  >
                    <option value="contado">Contado</option>
                    <option value="cuota">Cuota</option>
                  </Field>
                  <ErrorMessage name="modalidadPago" component="div" />
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div style={{ width: "40%", marginRight: "1.5rem" }}>
                <LabelBase htmlFor="ruc">RUC</LabelBase>
                <Field type="text" name="ruc" className="form-control" />
                <ErrorMessage name="ruc" component="div" />
              </div>
              <div style={{ width: "60%" }}>
                <LabelBase htmlFor="razonSocial">Razón Social</LabelBase>
                <Field
                  type="text"
                  name="razonSocial"
                  className="form-control"
                />
                <ErrorMessage name="razonSocial" component="div" />
              </div>
            </div>

            <div>
              <LabelBase htmlFor="direccion">Dirección</LabelBase>
              <Field type="text" name="direccion" className="form-control" />
              <ErrorMessage name="direccion" component="div" />
            </div>
          </div>
          <hr />
          <div className="row mb-3">
            <div className="col-md-2" style={{ width: "10%" }}>
              <LabelBase htmlFor="cantidad">Cantidad</LabelBase>
              <Field type="number" name="cantidad" className="form-control" />
              <ErrorMessage name="cantidad" component="div" />
            </div>
            <div className="col-md-2" style={{ width: "25%" }}>
              <LabelBase htmlFor="producto">Producto</LabelBase>
              <Field name="producto" as="select" className="form-control">
                <option value="">Seleccione...</option>
                {/* Opciones del select desde la API */}
              </Field>
              <ErrorMessage name="producto" component="div" />
            </div>
            <div className="col-md-2">
              <LabelBase htmlFor="precioUnitario">Precio Unitario</LabelBase>
              <Field
                type="number"
                name="precioUnitario"
                className="form-control"
              />
              <ErrorMessage name="precioUnitario" component="div" />
            </div>
            <div className="col-md-2" style={{ width: "10%" }}>
              <LabelBase htmlFor="iva">IVA</LabelBase>
              <Field type="number" name="iva" className="form-control" />
              <ErrorMessage name="iva" component="div" />
            </div>
            <div className="col-md-2">
              <LabelBase htmlFor="subtotal">Subtotal</LabelBase>
              <Field type="number" name="subtotal" className="form-control" />
              <ErrorMessage name="subtotal" component="div" />
            </div>
            <div className="col">
              <div className="d-flex justify-content-end mt-3">
                <ButtonBasic id="btn-buscar" text="Agregar Item" />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">P.Unitario</th>
                  <th scope="col">Iva</th>
                  <th scope="col">SubTotal(Gs)</th>
                  <th scope="col"></th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="text-end">
            <ButtonCrear
              id="btn-crear"
              text="Generar Factura"
              color="secondary"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioCaja;
