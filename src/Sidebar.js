import { faFaceLaughWink, faPersonWalkingLuggage, faShirt, faShoppingBasket, faTachographDigital, faTruckFast, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon">
                    <img src={require('./assets/images/logo.png')}/>
                </div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/dashboard">
                    <FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />
                    <span>Dashboard</span>
                </Link>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Users --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/category-list">
                    <FontAwesomeIcon icon={faShoppingBasket} style={{ marginRight: "0.5rem" }} />
                    <span>Orders</span>
                </Link>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Users --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/customer-list">
                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                    <span>Customers</span>
                </Link>
            </li>
            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />


            {/* <!-- Nav Item - Users --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/dp-list">
                    <FontAwesomeIcon icon={faPersonWalkingLuggage} style={{ marginRight: "0.5rem" }} />
                    <span>Delivery Partners</span>
                </Link>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Users --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/service-list">
                    <FontAwesomeIcon icon={faTruckFast} style={{ marginRight: "0.5rem" }} />
                    <span>Services</span>
                </Link>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Users --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/category-list">
                    <FontAwesomeIcon icon={faShirt} style={{ marginRight: "0.5rem" }} />
                    <span>Categories</span>
                </Link>
            </li>

        </ul>
    )
}

export default Sidebar