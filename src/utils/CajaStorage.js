class CajaStorage {
    static setCajaId(id) {
        localStorage.setItem('cajaId', id);
    }

    static getSesionCajaId() {
        return localStorage.getItem('sesionCajaId');
    }

    static setCajaId(id) {
        localStorage.setItem('cajaId', id);
    }

    static getCajaId() {
        return localStorage.getItem('cajaId');
    }

    static removeCajaId() {
        localStorage.removeItem('cajaId');
    }

    static setSesionCajaId(id) {
        localStorage.setItem('sesionCajaId', id);
    }

    static getSesionCajaId() {
        return localStorage.getItem('sesionCajaId');
    }

    static removeSesionCajaId() {
        localStorage.removeItem('sesionCajaId');
    }

    static cerrarCaja() {
        this.removeCajaId()
        this.removeSesionCajaId()
    }
}

export default CajaStorage;