import "bootstrap/dist/css/bootstrap.min.css";
import './InfoClients.css'
import {useState} from "react";
import {IoArrowBackSharp} from "react-icons/io5";
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


import {IoPencilOutline} from "react-icons/io5";
import Pagination from '@mui/material/Pagination';

import ButtonBasic from "../../components/bottons/ButtonBasic.jsx";
import ModalBase from "../../components/modals/ModalBase.jsx";
import LabelBase from "../../components/labels/LabelBase.jsx";

const InfoClients = () => {
    const [value, setValue] = useState('one');
    const [showPayments, setShowPayments] = useState(true); // Mostrar tabla de pagos por defecto
    const [showMeasurements, setShowMeasurements] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    // Función para obtener las iniciales del nombre y del apellido
    const getInitials = (name) => {
        const initials = name.split(' ').map(word => word.charAt(0)).join('');
        return initials.toUpperCase();
    };
    const ButtonBasic2 = ({initials}) => {
        return (
            <div className="circle initials">
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
    // Función para abrir el modal cuando se hace clic en "Editar Cliente"
    const handleEditClientClick = () => {
        setModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleAceptar = () =>{
        setModalOpen(false);
    }
    return (
        <div className="container-fluid MaquetaCliente">
            <div className="cuadro-central">
                <div className="header-cliente">
                    <button className="custom-button"><span className="icon"><IoArrowBackSharp/></span></button>
                </div>
                <div className="info-cliente">
                    <div>
                        {/* Botón con las iniciales del nombre y apellido en un círculo */}
                        <ButtonBasic2 initials={getInitials('Drew Cano')}/>
                    </div>
                    <div>
                        <h3>Drew Cano</h3>
                        <Alert variant="outlined" severity="error">
                            Este cliente tiene 1 pago atrasado
                        </Alert>
                        {/*https://mui.com/material-ui/react-alert/     Para buscar las otras alertas*/}
                    </div>
                    <div className="d-flex justify-content-center mb-4 float-end">
                        <ButtonBasic icon={<IoPencilOutline/>} color="secondary" text="Editar Cliente"
                                     onClick={handleEditClientClick}/>
                    </div>
                </div>
                {/* Modal que se abre al editar */}
                <ModalBase open={modalOpen} title="Editar Cliente" closeModal={handleCloseModal}>

                    <form className="mb-3">
                        <div className="mb-2 block">
                            <LabelBase label="Nombre:" htmlFor="nombre" />
                            <input type="text" id="nombre" name="nombre" className="form-control" />
                        </div>
                        <div className="mb-2 block">
                            <LabelBase label="Apellido:" htmlFor="apellido" />
                            <input type="text" id="apellido" name="apellido" className="form-control" />
                        </div>
                        <div className="mb-2 block">
                            <LabelBase label="Plan Actual:" htmlFor="plan-actual" />
                            <select id="plan-actual" name="plan-actual" className="form-select">
                                <option value="mensual">Mensual</option>
                                <option value="semanal">Semanal</option>
                                <option value="diario">Diario</option>
                            </select>
                        </div>
                        <div className="mb-2 block">
                            <LabelBase label="RUC:" htmlFor="ruc" />
                            <input type="text" id="ruc" name="ruc" className="form-control" />
                        </div>
                        <div className="mb-2 block">
                            <LabelBase label="Telefono:" htmlFor="telefono" />
                            <input type="tel" id="telefono" name="telefono" className="form-control" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center float-end">
                            <ButtonBasic text="Aceptar" onClick={handleAceptar} />
                        </div>

                    </form>

                </ModalBase>

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

    );
};

export default InfoClients;
