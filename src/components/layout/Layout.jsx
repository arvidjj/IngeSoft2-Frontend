import React from 'react'
import NavBar from './NavBar'

const Layout = ({children}) => {
  return (
    <>
        <NavBar />
        {children}
      
        {/**Footer en caso de ser necesario */}
    </>
  )
}

export default Layout