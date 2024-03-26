import { useState } from 'react'
import api from '../utils/api'

const useSesionCaja = () => {

    const CAJA_URL = '/cajas/sesiones-caja' //URL del endpoint

    const [data, setData] = useState([]); //datos traidos del back
    const [error, setError] = useState(null) //guarda error
    const [isLoading, setIsLoading] = useState(false) //guarda el estado de cargando

    const handleRequest = async (FuncionBackend) => {
        setIsLoading(true)
        try {
            const res = await FuncionBackend() // que funcion se ejecutara en el back
            setData(res.data) //guarda los datos traidos del back
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    //Funciones del endpoint
    const createSesionCaja = async params => {
        return handleRequest(() => api.post(CAJA_URL, params ))
    }

    return { createSesionCaja, data, error, isLoading }
}

export default useSesionCaja