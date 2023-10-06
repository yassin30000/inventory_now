import './LeftNavigation.css'
import logo from '../../images/inventory_now_logo_white.png'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function LeftNavigation() {
    const location = useLocation();
    if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/404") return null


    return (
        <>
            <div className="left-nav-container">

                <NavLink exact to='/dashboard' className="left-nav-logo">
                    <img src={logo} alt="" />
                </NavLink>

                <div className="left-nav-links">

                    <NavLink to='/dashboard'>
                        <span class="material-symbols-outlined">space_dashboard</span>
                        Dashboard
                    </NavLink>

                    <NavLink to='/items'>
                        <span class="material-symbols-outlined">inventory_2</span>
                        Items
                    </NavLink>

                    {/* <NavLink to='/suppliers'>
                        <span class="material-symbols-outlined">forklift</span>
                        Suppliers
                    </NavLink> */}

                    <NavLink to='/inventory-sheets'>
                        <span class="material-symbols-outlined">inventory</span>
                        Inventory
                    </NavLink>

                    <NavLink to='/inventory-sheets/new'>
                        <span class="material-symbols-outlined">add</span>
                        new
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default LeftNavigation;