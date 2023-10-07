import { useSelector } from 'react-redux';
import './Dashboard.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



function Dashboard() {

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <>
            <div className="dashboard-container">
                <div className="inventory-sheets-preview-container">
                    <div className="i-s-top-container">
                        <div id='i-s-top-label'>recent <br />inventory sheets</div>

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
                            <div id="total-items-number">249</div>
                            <div id="total-items-label">items</div>
                        </div>

                        <div className="new-item-dash-btn-container">
                            <div className="new-item-dash-btn">
                                <span class="material-symbols-outlined new-item-dash">
                                    add
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;