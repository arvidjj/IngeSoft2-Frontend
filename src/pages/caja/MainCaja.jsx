import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Btn } from "../../components/bottons/Button";
import CartaPrincipal from "../../components/cartaPrincipal/CartaPrincipal";
import './MainCaja.css'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormSelect, FormTextInput } from "../../components/forms/FormInputs";

import useCaja from "../../hooks/useCaja";

const MainCaja = () => {

    const { getAllCajas, data: cajas, isLoading, error } = useCaja();

    useEffect(() => {
        getAllCajas(1);
    }, [localStorage.getItem("user")])

    const handleAbrirCaja = (values) => {
        console.log(values)
        setTimeout(() => {
            alert(JSON.stringify(values));
        }, 400);
    }

    return (
        <>
            <CartaPrincipal>
                <div className="d-flex align-items-center justify-content-center my-auto">
                    <div className="d-flex flex-column p-4 py-5 card" style={{ "width": "25rem", marginLeft: 0 }}>
                        <h1>Abrir caja</h1>
                        <Formik
                            initialValues={{
                                id_caja: '',
                            }}
                            validationSchema={Yup.object({
                                id_caja: Yup.string()
                            })}
                            onSubmit={async (values) => {
                                await sleep(500);
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            <Form>
                                <div className="d-flex flex-column gap-2">
                                    {isLoading ? (
                                        <p>Cargando...</p>
                                    ) : (
                                        cajas.items ? (
                                            <FormSelect
                                                label="Caja"
                                                name="id_caja"
                                                required={true}
                                            >
                                                {cajas.items.map(caja => (
                                                    <option key={caja.id} value={caja.id}>{caja.nombre}</option>
                                                ))}
                                            </FormSelect>
                                        ) : (
                                            <p>No hay cajas</p>
                                        )
                                    )}

                                    <Btn type="primary" className='mt-3 align-self-end'>
                                        Abrir Caja
                                    </Btn>

                                    <button type="submit">Submit</button>

                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>

            </CartaPrincipal>
        </>
    )
}


export default MainCaja


/*
<Formik
                            initialValues={{
                                nombre: '',
                                monto: '',
                            }}
                            validationSchema={Yup.object({
                                nombre: Yup.string()
                                    .max(15, 'Debe tener 15 caracteres o menos')
                                    .required('Requerido'),
                                monto: Yup.string()
                                    .max(20, 'Debe tener 20 caracteres o menos')
                                    .required('Requerido'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            <Form>
                                <div className="d-flex flex-column gap-2">
                                    <FormTextInput
                                        label="Nombre"
                                        name="nombre"
                                        type="text"
                                        placeholder="Caja 1"
                                        required={true}
                                    />
                                    <FormTextInput
                                        label="Monto"
                                        name="monto"
                                        type="text"
                                        placeholder="2000000"
                                        required={true}
                                    />
                                    <Btn type="submit" className='mt-3 align-self-end'>
                                        Abrir Caja
                                    </Btn>
                    
                                </div>
                            </Form>
                        </Formik>

                        */