import React from 'react'
import  './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
      <NavLink to='/adminhome' className="sidebar-option">
            <img src={assets.home_icon} alt="" />
            <p>Admin Home Page</p>
        </NavLink>
        <NavLink to='/customerlist' className="sidebar-option">
            <img src={assets.list_icon} alt="" />
            <p>Customer List</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.list_icon} alt="" />
            <p>Vendor List</p>
        </NavLink>
        <NavLink to='/deliveryboylist' className="sidebar-option">
            <img src={assets.list_icon} alt="" />
            <p>Delivery Boy List</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
