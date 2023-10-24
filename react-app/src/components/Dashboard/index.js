import { useDispatch, useSelector, useStore } from 'react-redux';
import './Dashboard.css'
import { Redirect, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import NewItemModal from '../NewItemModal'
import { fetchUserItems } from '../../store/item';
import { useEffect } from 'react';
import { fetchUserCategories } from '../../store/category';
import { fetchUserSuppliers } from '../../store/supplier';
import { fetchAllInventorySheets } from '../../store/inventory_sheet';
import InventorySheetForm from '../InventorySheetForm';
import NewCategoryModal from '../NewCategoryModal';
import NewSupplierModal from '../NewSupplierModal';


function Dashboard() {
    const sessionUser = useSelector((state) => state.session.user);

    const allItems = useSelector(state => state.items.userItems);
    const userItems = allItems.filter(item => item.active)

    const allSheetsData = useSelector(state => state.inventorySheets.inventorySheets);
    const allSheets = allSheetsData ? allSheetsData.inventory_sheets : [];
    const userSuppliers = useSelector((state) => state.suppliers.suppliers);
    const userCategories = useSelector((state) => state.categories.categories);

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserItems());
        dispatch(fetchUserCategories());
        dispatch(fetchUserSuppliers());
        dispatch(fetchAllInventorySheets());
    }, [dispatch]);

    function formatDate(dateString) {
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    if (location.pathname === '/') history.push('/dashboard')
    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <>
            <div className="dashboard-container">
                <div className="inventory-sheets-preview-container">
                    <div className="i-s-top-container">
                        <div id='i-s-top-label'>welcome <br />to your dashboard.</div>

                    </div>
                    <div className="i-s-bottom-container">

                        {allSheets && allSheets.slice(-4).reverse().map((sheet, i) => (

                            <div className={"inventory-sheet-" + i}>


                                <div className="dashboard-card-date">
                                    {formatDate(sheet.created_at)}

                                </div>

                                <div className="dashboard-card-items">

                                    {sheet.inventory_items.filter(item => item.item.active).map((item, index) => (
                                        <div className="inventory-r" key={item.id}>
                                            <li className="inventory-i-name">{item.item.name}</li>
                                            <span className="inventory-i-quantity">{`x${item.quantity} ${item.item.suffix}`}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="inventory-btns-container">

                                    <OpenModalButton
                                        className={'edit-inventory-dashboard-btn'}
                                        modalComponent={<InventorySheetForm sheetId={sheet.id} />}
                                        buttonHTML={<span class="material-symbols-outlined">edit</span>}
                                    />

                                    <button className='goto-inventory-dashboard-btn'>
                                        <span class="material-symbols-outlined" onClick={() => history.push(`/inventory-sheets/${sheet.id}`)}>arrow_forward</span>
                                    </button>

                                </div>
                            </div>

                        ))}
                    </div>

                </div>
                <div className="row">
                    {/* <div className="column grocery-list"></div> */}

                    {/* <div className="column idk-yet"></div> */}

                    <div className="column total-items">

                        <div id="total-items">
                            <div id="total-items-number">{userItems.length}</div>
                            <div id="total-items-label">{userItems.length === 1 ? 'item' : 'items'}</div>
                        </div>

                        <div className="new-item-dash-btn-container">
                            <div className="new-item-dash-btn">
                                <OpenModalButton
                                    buttonHTML={<span class="material-symbols-outlined new-item-dash">add</span>}
                                    modalComponent={<NewItemModal />}
                                />

                            </div>
                        </div>

                    </div>

                    <div className="column total-items" id='columnTotalCat'>

                        <div id="total-items">
                            <div id="total-items-number">{userCategories.length}</div>
                            <div id="total-items-label">{userCategories.length === 1 ? 'category' : 'categories'}</div>
                        </div>

                        <div className="new-item-dash-btn-container">
                            <div className="new-item-dash-btn" id='newItemDashBtnCat'>
                                <OpenModalButton
                                    buttonHTML={<span class="material-symbols-outlined new-item-dash">add</span>}
                                    modalComponent={<NewCategoryModal />}
                                />

                            </div>
                        </div>

                    </div>
                    <div className="column total-items" id='columnTotalSup'>

                        <div id="total-items">
                            <div id="total-items-number">{userSuppliers.length}</div>
                            <div id="total-items-label">{userSuppliers.length === 1 ? 'supplier' : 'suppliers'}</div>
                        </div>

                        <div className="new-item-dash-btn-container">
                            <div className="new-item-dash-btn" id='newItemDashBtnSup'>
                                <OpenModalButton
                                    buttonHTML={<span class="material-symbols-outlined new-item-dash">add</span>}
                                    modalComponent={<NewSupplierModal />}
                                />

                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Dashboard;