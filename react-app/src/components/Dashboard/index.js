import './Dashboard.css'

function Dashboard() {
    return (
        <>
            {/* <div className="dashboard-container">

                <div className="inventory-sheets-preview-container">
                    <div className="inventory-sheets-preview">

                    </div>

                </div>

                <div className="total-items-container">
                    <div className="total-items">
                        327
                    </div>
                </div>

                <div className="grocery-list-container">
                    <div className="grocery-list">
                        <p>hemp seeds</p>
                        <p>hemp seeds</p>
                        <p>hemp seeds</p>
                        <p>hemp seeds</p>
                    </div>
                </div>

                <div className="low-stock-container">
                    <div className="low-stock">
                        <p>hemp seeds</p>
                        <p>granola</p>
                        <p>your mom</p>
                        <p>hemp seeds</p>
                    </div>
                </div>
            </div> */}

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