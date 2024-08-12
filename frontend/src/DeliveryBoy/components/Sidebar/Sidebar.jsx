import React from 'react'
import  './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
      <NavLink to='/deliveryhome' className="sidebar-option">
            <img src={assets.home_icon} alt="" />
            <p>Delivery Home Page</p>
        </NavLink>
        <NavLink to='/placedorderlist' className="sidebar-option">
            <img src={assets.list_icon} alt="" />
            <p>Placed Order List</p>
        </NavLink>
        <NavLink to='/deliveredorderlist' className="sidebar-option">
            <img src={assets.list_icon} alt="" />
            <p>Delivered Order List</p>
        </NavLink>
        <NavLink to='/deliveryreviews' className="sidebar-option">
            <img src={assets.list_icon} alt="" />
            <p>Delivery Reviews</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
