import { useDispatch, useSelector, useStore } from 'react-redux';
import './Dashboard.css'
import { Redirect, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import NewItemModal from '../NewItemModal'
import { fetchUserItems } from '../../store/item';
import { useEffect } from 'react';
import { fetchUserCategories } from '../../store/category';
import { fetchUserSuppliers } from '../../store/supplier';

function Dashboard() {
    const sessionUser = useSelector((state) => state.session.user);
    const userItems = useSelector(state => state.items.userItems);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserItems());
        dispatch(fetchUserCategories());
        dispatch(fetchUserSuppliers());

    }, [dispatch]);

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

                        <div className="inventory-sheet-1">
                            Thursday, Sep 4
                        </div>
                        <div className="inventory-sheet-2">
                            Saturday, Sep 6

                        </div>
                        <div className="inventory-sheet-3">
                            Friday, Sep 12

                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="column grocery-list">Grocery List</div>
                    <div className="column idk-yet">Column 3</div>
                    <div className="column total-items">

                        <div id="total-items">
                            <div id="total-items-number">{userItems.length}</div>
                            <div id="total-items-label">items</div>
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
                </div>
            </div>
        </>
    )
}

export default Dashboard;