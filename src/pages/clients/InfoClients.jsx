// eslint-disable-next-line no-unused-vars
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './InfoClients.css'

import {IoArrowBackSharp} from "react-icons/io5";
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


import { IoPencilOutline } from "react-icons/io5";
import Pagination from '@mui/material/Pagination';

import ButtonBasic from "../../components/bottons/ButtonBasic.jsx";

const InfoClients = () => {
    const [value, setValue] = React.useState('one');
    const [showPayments, setShowPayments] = React.useState(true); // Mostrar tabla de pagos por defecto
    const [showMeasurements, setShowMeasurements] = React.useState(false);

    // Función para obtener las iniciales del nombre y del apellido
    const getInitials = (name) => {
        const initials = name.split(' ').map(word => word.charAt(0)).join('');
        return initials.toUpperCase();
    };
    const ButtonBasic2 = ({ initials }) => {
        return (
            <div className="circle initials" >
                {initials}
            </div>
        );
    };


    // Función para manejar el cambio de pestaña
    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Actualiza los estados para mostrar u ocultar las tablas según la pestaña seleccionada
        if (newValue === 'one') {
            setShowPayments(true);
            setShowMeasurements(false);
        } else {
            setShowPayments(false);
            setShowMeasurements(true);
        }
    };
    return (
        <div className="container-fluid MaquetaCliente">
            <div className="row">
                <div className="col-12">
                    <div className="cuadro-central">
                        <div className="header-cliente">
                            <button className="custom-button"><span className="icon"><IoArrowBackSharp/></span></button>
                        </div>
                        <div className="info-cliente">
                            <div>
                                {/* Botón con las iniciales del nombre y apellido en un círculo */}
                                <ButtonBasic2 initials={getInitials('Drew Cano')}  />
                            </div>
                            <div>
                                <h3>Drew Cano</h3>
                                <Alert variant="outlined" severity="error">
                                    Este cliente tiene 1 pago atrasado
                                </Alert>
                                {/*https://mui.com/material-ui/react-alert/     Para buscar las otras alertas*/}
                            </div>
                            <div className="d-flex justify-content-center mb-4 float-end">
                                <ButtonBasic icon={<IoPencilOutline />} color="secondary" text="Editar Cliente"  />
                            </div>
                        </div>

                        <hr/>
                        <div className="datos-extras">
                            <div>
                                <h4>Plan Actual</h4>
                                <p>Mensual</p>
                            </div>
                            <div>
                                <h4>RUC</h4>
                                <p>1111111</p>
                            </div>
                            <div>
                                <h4>N° de Telefono</h4>
                                <p>243425234</p>
                            </div>
                        </div>
                        <Box className="Pago-Mediciones d-flex justify-content-center mb-3">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value="one" label="Pagos"/>
                                <Tab value="two" label="Mediciones"/>

                            </Tabs>
                        </Box>
                        {/* Renderiza la tabla de pagos si showPayments es true */}
                        {showPayments && (
                            <table className="table">
                                {/* Contenido de la tabla de pagos */}
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">N° Factura</th>
                                        <th scope="col">Pago</th>
                                        <th scope="col">Estado</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">11111</th>
                                        <td>Enero</td>
                                        <td>Vencido</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2222</th>
                                        <td>Febrero</td>
                                        <td>Pagado</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">33333</th>
                                        <td>Marzo</td>
                                        <td>Pagado</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </table>
                        )}

                        {/* Renderiza la tabla de mediciones si showMeasurements es true */}
                        {showMeasurements && (
                            <table className="table">
                                {/* Contenido de la tabla de mediciones */}
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Brazo</th>
                                        <th scope="col">Piernas</th>
                                        <th scope="col">Cintura</th>
                                        <th scope="col">Cadera</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">21 Enero 2023</th>
                                        <td>32</td>
                                        <td>32</td>
                                        <td>32</td>
                                        <td>32</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">21 Enero 2023</th>
                                        <td>32</td>
                                        <td>32</td>
                                        <td>32</td>
                                        <td>32</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">21 Enero 2023</th>
                                        <td>32</td>
                                        <td>32</td>
                                        <td>32</td>
                                        <td>32</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </table>
                        )}


                        <div className="d-flex justify-content-center mt-4">
                            <Pagination count={10} color="secondary"/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoClients;
