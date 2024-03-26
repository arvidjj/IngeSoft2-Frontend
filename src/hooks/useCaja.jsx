import { useState } from 'react'
import api from '../utils/api'

const useCaja = () => {

    const CAJA_URL = '/cajas' //URL del endpoint

    const [data, setData] = useState([]);
    const [error, setError] = useState(null) //guarda error
    const [isLoading, setIsLoading] = useState(false) //guarda el estado de carga

    const handleRequest = async (FuncionBackend) => {
        setIsLoading(true)
        try {
            const res = await FuncionBackend()
            setData(res.data)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const createCaja = async params => {
        return handleRequest(() => api.post(CAJA_URL, params ))
    }

    const getAllCajas = async (page = 1, params) => {
        return handleRequest(() => api.get(CAJA_URL + "/page/" + page, params ))
    }

    return { createCaja, getAllCajas, data, error, isLoading }
}

export default useCaja