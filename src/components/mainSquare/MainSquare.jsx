import React from 'react'
import "./MainSquare.css";

const MainSquare = ({ children, isCentered }) => {
  return (
    <>
      <div className='carta container-lg'>
        {/*<div className="centered">*/}
        <div className='container-lg px-5 py-3'>
          {children}
        </div>
        {/*</div>*/}
      </div>
    </>
  )
}

export default MainSquare