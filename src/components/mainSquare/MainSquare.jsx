import React from 'react'
import "./MainSquare.css";

const MainSquare = ({children, isCentered}) => {
  return (
    <>
        <div className='carta SquareMain container'>
          {children}
        </div>
    </>
  )
}

export default MainSquare