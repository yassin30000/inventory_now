import React, { useEffect, useState } from 'react';
import './ItemsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../../store/item';
import { fetchSingleSupplier, fetchUserSuppliers } from '../../store/supplier';
import { fetchUserCategories } from '../../store/category';
import CategoriesTab from '../CategoriesTab';
import SuppliersTab from '../SuppliersTab';
import OpenModalButton from '../OpenModalButton';
import NewItemModal from '../NewItemModal';
import ConfirmDeleteItem from '../ConfirmDeleteItem';


function ItemsPage() {
    const [activeTab, setActiveTab] = useState('items');
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);


    const userItems = useSelector((state) => state.items.userItems);
    const userSuppliers = useSelector((state) => state.suppliers.suppliers);
    const userCategories = useSelector((state) => state.categories.categories); // Get user categories


    const supplierDictionary = {};
    userSuppliers.forEach((supplier) => {
        supplierDictionary[supplier.id] = supplier.name;
    });

    const categoryDictionary = {};
    userCategories.forEach((category) => {
        categoryDictionary[category.id] = category.name;
    });

    const itemsWithSupplierAndCategoryNames = userItems.map((item) => ({
        ...item,
        supplierName: supplierDictionary[item.supplier_id] || 'Unknown Supplier',
        categoryName: categoryDictionary[item.category_id] || 'Unknown Category',
    }));

    console.log('CATEGORIES: ', itemsWithSupplierAndCategoryNames)

    const [showDropdown, setShowDropdown] = useState(null);

    const handleEditDropDown = (index) => {
        if (showDropdown === index) {
            setShowDropdown(null);
        } else {
            setShowDropdown(index);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (sessionUser) {

            dispatch(fetchUserSuppliers());
            dispatch(fetchUserCategories());
            dispatch(fetchUserItems());
        }

    }, [dispatch]);

    return (
        <div className="items-page-container">
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
                {activeTab === 'categories' && <CategoriesTab />}
                {activeTab === 'suppliers' && <SuppliersTab />}
                {activeTab === 'items' && (
                    <div className="items-content">
                        <table className="items-table">
                            <thead id='items-heading-row'>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Supplier</th>
                                    <th>Low Stock At</th>
                                    <th>Suffix</th>
                                    <th><div className="new-item-btn-container">
                                        <OpenModalButton
                                            modalComponent={<NewItemModal />}
                                            buttonText='new item'
                                        />
                                    </div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsWithSupplierAndCategoryNames.map((item, index) => (
                                    <tr key={item.id} className={index === itemsWithSupplierAndCategoryNames.length - 1 ? 'last-row' : ''}>
                                        <td id='item-name'>{item.name}</td>
                                        <td id='item-category'>{item.categoryName}</td>
                                        <td>{item.supplierName}</td>
                                        <td>{item.low_stock_at}</td>
                                        <td>{item.suffix}</td>
                                        <td id='item-dots'><span class="material-symbols-outlined" onClick={() => handleEditDropDown(index)}>more_horiz</span>
                                            {showDropdown === index && (
                                                <div className="item-edit-dropdown">
                                                    
                                                    <button className="edit-item-option">edit</button>
                                                    <OpenModalButton
                                                        modalComponent={<ConfirmDeleteItem />}
                                                        buttonText='delete'
                                                    />

                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )).reverse()}
                            </tbody>
                        </table>


                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemsPage;
