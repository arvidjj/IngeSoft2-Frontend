import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Btn } from "../../../components/bottons/Button";
import CartaPrincipal from "../../../components/cartaPrincipal/CartaPrincipal";
import { useNavigate } from "react-router-dom";

import './AdministrarCaja.css'


import toast, { Toaster } from "react-hot-toast";


const AdministrarCaja = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
    }, [localStorage.getItem("user")])


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
                <h1>Caja #0001</h1>

                <div className="d-flex gap-5">
                    <div className="card cajaCard">
                        <p>Ventas</p>

                        <Btn type="primary">
                            Nueva Venta
                        </Btn>

                        <Btn outline>
                            Listar Ventas
                        </Btn>
                    </div>
                    <div className="card cajaCard">
                        <p>Compras</p>

                        <Btn type="primary">
                            Nueva Compra
                        </Btn>

                        <Btn outline>
                            Listar Compras
                        </Btn>
                    </div>
                    <div className="card cajaCard">
                        <p>Cobros Pendientes</p>

                        <Btn outline>
                            Listar Cobros Pendientes
                        </Btn>
                    </div>
                </div>

            </CartaPrincipal>
        </>
    )
}


export default AdministrarCaja
