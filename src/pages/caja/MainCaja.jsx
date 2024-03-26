import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Btn } from "../../components/bottons/Button";
import CartaPrincipal from "../../components/cartaPrincipal/CartaPrincipal";
import './MainCaja.css'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormSelect, FormTextInput } from "../../components/forms/FormInputs";
import { useNavigate } from "react-router-dom";

import useCaja from "../../hooks/useCaja";
import useSesionCaja from "../../hooks/useSesionCaja";

const MainCaja = () => {

    const { getAllCajas, data: cajas, isLoading: cargandoCajas, error: errorCajas } = useCaja();
    const { createSesionCaja, isLoading: cargandoSesion, error: errorSesion } = useSesionCaja();
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserData(user);
            getAllCajas(1);
        }
    }, [localStorage.getItem("user")])

    const handleAbrirCaja = async (values) => {

        if (cargandoSesion || cargandoCajas) return;

        //anho-mes-fecha
        const fecha = new Date().toISOString().slice(0, 10);
        //hora-min-seg
        const hora = new Date().toISOString().slice(11, 19);

        const postData = {
            idCaja: values['id_caja'],
            idUsuario: 1,
            montoInicial: values['montoInicial'],
            montoFinal: null,
            fecha: fecha,
            horaApertura: hora,
            horaCierre: null
        }

        const success = await createSesionCaja(postData);
        
        if (!errorSesion) {
            navigate("/caja-administracion");
        }
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
                                montoInicial: ''
                            }}
                            validationSchema={Yup.object({
                                id_caja: Yup.string()
                                    .required('Requerido'),
                                montoInicial: Yup.string()
                                    .required('Requerido'),
                            })}
                            onSubmit={async (values) => {
                                handleAbrirCaja(values)
                            }}
                        >
                            <Form>
                                <div className="d-flex flex-column gap-2">
                                    {cargandoCajas ? (
                                        <p>Cargando...</p>
                                    ) : (
                                        cajas.items ? (
                                            <>
                                                <FormSelect
                                                    label="Caja"
                                                    name="id_caja"
                                                    required={true}
                                                >
                                                    <option value="">Selecciona una Caja</option>
                                                    {cajas.items.map(caja => (
                                                        <option key={caja.id} value={caja.id}>{caja.nombre}</option>
                                                    ))}
                                                </FormSelect>
                                                <FormTextInput
                                                    label="Monto Inicial"
                                                    name="montoInicial"
                                                    type="number"
                                                    placeholder="2000000"
                                                    required={true}
                                                />
                                            </>
                                        ) : (
                                            <p>No hay cajas</p>
                                        )
                                    )}

                                    <Btn type="primary" className='mt-3 align-self-end' loading={cargandoSesion} disabled={cargandoSesion}>
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
codigo para registrar una caja:
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