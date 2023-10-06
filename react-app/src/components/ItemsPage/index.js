import React, { useState } from 'react';
// import ItemsTab from './ItemsTab'; 
// import CategoriesTab from './CategoriesTab'; 
// import SuppliersTab from './SuppliersTab'; 
import './ItemsPage.css'

function ItemsPage() {
    const [activeTab, setActiveTab] = useState('items'); // Default tab is 'items'

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='items-page-container'>
            <div className="tabs">
                <button
                    className={activeTab === 'items' ? 'active' : ''}
                    onClick={() => handleTabChange('items')}
                >
                    Items
                </button>
                <button
                    className={activeTab === 'categories' ? 'active' : ''}
                    onClick={() => handleTabChange('categories')}
                >
                    Categories
                </button>
                <button
                    className={activeTab === 'suppliers' ? 'active' : ''}
                    onClick={() => handleTabChange('suppliers')}
                >
                    Suppliers
                </button>
            </div>
            <div className="tab-content">
                {/* {activeTab === 'items' && <ItemsTab />}
                {activeTab === 'categories' && <CategoriesTab />}
                {activeTab === 'suppliers' && <SuppliersTab />} */}
            </div>
        </div>
    );
}

export default ItemsPage;
