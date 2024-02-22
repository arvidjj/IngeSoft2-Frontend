import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Link to='/home'>Inicio</Link>
        <Outlet/>
    </div>
  )
}

export default Layout