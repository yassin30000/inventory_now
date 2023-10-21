import './LeftNavigation.css'
import logo from '../../images/inventory_now_logo_white.png'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import InventorySheetForm from '../InventorySheetForm';
import OpenModalButton from '../OpenModalButton';
import curveLogo from '../../images/actual_curve.png'
import purpleLogo from '../../images/i-n-logo-purple.png'
import NewInventorySheet from '../NewInventorySheet';
import { createInventorySheet, fetchAllInventorySheets, fetchInventorySheet } from '../../store/inventory_sheet';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchUserItems } from '../../store/item';
import NoItemsNoSheetModal from '../NoItemsNoSheetModal';


function LeftNavigation() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const userItems = useSelector((state) => state.items.userItems);
    const activeItems = userItems.filter(item => item.active)

    const [newSheetId, setNewSheetId] = useState();

    const handleNewSheet = async () => {
        const newSheet = await dispatch(createInventorySheet());
        setNewSheetId(newSheet.inventory_sheet_id);

        await dispatch(fetchInventorySheet(newSheetId))
    }


    useEffect(() => {
        dispatch(fetchUserItems())
        dispatch(fetchInventorySheet(newSheetId))
        dispatch(fetchAllInventorySheets())
    }, [dispatch, newSheetId])

    if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/404") return null

    return (
        <>
            <div className="left-nav-container">

                <NavLink exact to='/dashboard' className="left-nav-logo">
                    <div className="logo-container">
                        <img src={logo} alt="" className="logo-img" />
                        {/* <img src={purpleLogo} alt="" /> */}

                    </div>
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

                    <NavLink to='/inventory-sheets'>
                        <span class="material-symbols-outlined">inventory</span>
                        Inventory
                    </NavLink>

                    {activeItems.length === 0 ? (
                        <OpenModalButton
                            buttonText='new'
                            // onButtonClick={handleNewSheet}
                            modalComponent={<NoItemsNoSheetModal />}
                            buttonHTML={<span class="material-symbols-outlined">add</span>}
                        />
                    ) : (
                        <OpenModalButton
                            buttonText='new'
                            onButtonClick={handleNewSheet}
                            modalComponent={<NewInventorySheet sheetId={newSheetId} />}
                            buttonHTML={<span class="material-symbols-outlined">add</span>}
                        />
                    )}


                </div>
            </div>
        </>
    )
}

export default LeftNavigation;