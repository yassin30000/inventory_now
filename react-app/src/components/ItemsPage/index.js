import React, { useEffect, useState } from 'react';
import './ItemsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../../store/item';
import { fetchSingleSupplier, fetchUserSuppliers } from '../../store/supplier';
import { fetchUserCategories } from '../../store/category';


function ItemsPage() {
    const [activeTab, setActiveTab] = useState('items');
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);


    const userItems = useSelector((state) => state.items.userItems);
    const userSuppliers = useSelector((state) => state.suppliers.suppliers);
    const userCategories = useSelector((state) => state.categories.categories); // Get user categories


    // Create a dictionary of supplier_id to supplier name
    const supplierDictionary = {};
    userSuppliers.forEach((supplier) => {
        supplierDictionary[supplier.id] = supplier.name;
    });

    const categoryDictionary = {};
    userCategories.forEach((category) => {
        categoryDictionary[category.id] = category.name;
    });

    // Map userItems to include supplier names
    const itemsWithSupplierAndCategoryNames = userItems.map((item) => ({
        ...item,
        supplierName: supplierDictionary[item.supplier_id] || 'Unknown Supplier',
        categoryName: categoryDictionary[item.category_id] || 'Unknown Category',
    }));

    console.log('CATEGORIES: ', itemsWithSupplierAndCategoryNames)


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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsWithSupplierAndCategoryNames.map((item, index) => (
                                    <tr key={item.id} className={index === itemsWithSupplierAndCategoryNames.length - 1 ? 'last-row' : ''}>
                                        <td id='item-name'>{item.name}</td>
                                        <td id='item-category'>{item.categoryName}</td>
                                        <td>{item.supplierName}</td> {/* Display supplier name */}
                                        <td>{item.low_stock_at}</td>
                                        <td>{item.suffix}</td>
                                        <td id='item-dots'><span class="material-symbols-outlined">
                                            more_horiz
                                        </span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemsPage;
