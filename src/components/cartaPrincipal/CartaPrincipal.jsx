import React from 'react'
import "./CartaPrincipal.css";

const CartaPrincipal = ({ children, isCentered = true }) => {
  return (
    <>
      <div className='carta'>
        <div className='px-5 py-3'>
          {children}
        </div>
      </div>
    </>
  )
}

export default CartaPrincipal