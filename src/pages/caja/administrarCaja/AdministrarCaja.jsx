import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Btn } from "../../../components/bottons/Button";
import CartaPrincipal from "../../../components/cartaPrincipal/CartaPrincipal";
import { useNavigate } from "react-router-dom";

import './AdministrarCaja.css'


import toast, { Toaster } from "react-hot-toast";

import useSesionCaja from "../../../hooks/useSesionCaja";
import useCaja from "../../../hooks/useCaja";

import CajaStorage from "../../../utils/CajaStorage";
import { CircularProgress } from "@mui/material";

const AdministrarCaja = () => {

    const navigate = useNavigate();
    const { getCajaById, data: req_caja, isLoading: cargandoCaja, error: errorCajas } = useCaja();
    const { getSesionCajaById, cerrarCajaById, data: req_sesion, isLoading: cargandoSesion, error: errorSesion } = useSesionCaja();
    const [sesionCaja, setSesionCaja] = useState({});
    const [caja, setCaja] = useState({});


    useEffect(() => {
        if (CajaStorage.getCajaId() && CajaStorage.getSesionCajaId()) {
            setCaja(getCajaById(CajaStorage.getCajaId()));
            setSesionCaja(getSesionCajaById(CajaStorage.getSesionCajaId()));
        }
        console.log(caja)
    }, [localStorage.getItem("user")])


    const goToNuevaCompra = () => {
        navigate("/caja-ventas");
    }

    const goToListarCompras = () => {
        navigate("/lista-compras");
    }

    const goToNuevaVenta = () => {
        navigate("/caja-ventas");
    }

    const goToListarVentas = () => {
        navigate("/lista-ventas");
    }

    const goToListarCobros = () => {
        navigate("/lista-cobros");
    }

    //AUN NO SE ACTUALIZA EL MONTO FINAL!!!! URGENTE
    const cerrarCajaActual = async () => {
        //hora-min-seg
        const hora = new Date().toISOString().slice(11, 19);

        const putData = {
            horaCierre: hora
        }
        await cerrarCajaById(CajaStorage.getSesionCajaId(), putData);

        CajaStorage.cerrarCaja();
        navigate("/caja");
    }

    return (
        <>
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

            <CartaPrincipal>
                <div className="d-flex align-items-center justify-content-between">
                    {(cargandoCaja && cargandoSesion && caja) ?
                        (<CircularProgress />)
                        :
                        (<h1>caja.nombre</h1>)}

                    <Btn outline onClick={cerrarCajaActual}>
                        Cerrar Caja
                    </Btn>
                </div>

                <div className="d-flex gap-5 justify-content-center my-auto flex-md-row flex-sm-column">
                    <div className="card cajaCard">
                        <p>Ventas</p>

                        <Btn type="primary" onClick={goToNuevaVenta}>
                            Nueva Venta
                        </Btn>

                        <Btn outline onClick={goToListarVentas}>
                            Listar Ventas
                        </Btn>
                    </div>
                    <div className="card cajaCard">
                        <p>Compras</p>

                        <Btn type="primary" onClick={goToNuevaCompra}>
                            Nueva Compra
                        </Btn>

                        <Btn outline onClick={goToListarCompras}>
                            Listar Compras
                        </Btn>
                    </div>
                    <div className="card cajaCard">
                        <p>Cobros Pendientes</p>

                        <Btn outline onClick={goToListarCobros}>
                            Listar Cobros Pendientes
                        </Btn>
                    </div>
                </div>

            </CartaPrincipal>
        </>
    )
}


export default AdministrarCaja
