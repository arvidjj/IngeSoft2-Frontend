import React from 'react'
import NavBar from './NavBar'
import './Layout.css'

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
    {/* todas las pantallas estaran rodeadas de este fondo, gris al fondo
        para utilizar la carta blanca del medio, ver componente MainSquare */}
      <div className='FondoApp'>
        {children}
      </div>
    </>
  )
}

export default Layout