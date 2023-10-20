import React, { useEffect, useRef, useState } from 'react';
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
import UpdateItemForm from '../UpdateItemForm';
import NoItems from '../NoItems';


function ItemsPage() {
    const [activeTab, setActiveTab] = useState('items');
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const userItems = useSelector((state) => state.items.userItems);
    const userSuppliers = useSelector((state) => state.suppliers.suppliers);
    const userCategories = useSelector((state) => state.categories.categories);


    const dropdownRef = useRef(null);

    const activeItems = userItems.filter(item => item.active)


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
        const handleDocumentClick = (e) => {
            if (showDropdown !== null && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(null);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [showDropdown]);

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
                {activeTab === 'categories' && userCategories && userCategories.length === 0 && (
                    <NoItems missing={'categories'} element={'category'} />
                )}

                {activeTab === 'suppliers' && <SuppliersTab />}
                {activeTab === 'suppliers' && userSuppliers && userSuppliers.length === 0 && (
                    <NoItems missing={'suppliers'} element={'supplier'} />
                )}

                

                {activeTab === 'items' && (

                    <div className="items-content">
                        
                        <table className="items-table" cellpadding="0" cellspacing="0" border="0">
                            

                            <thead id='items-heading-row'>

                                <tr>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Supplier</th>
                                    <th>Low Stock At</th>
                                    <th>Suffix</th>
                                    <th id='last-heading'><div className="new-item-btn-container">
                                        <OpenModalButton
                                            modalComponent={<NewItemModal />}
                                            buttonText=''
                                            buttonHTML={<span class="material-symbols-outlined">add</span>}
                                        />
                                    </div>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <div className={activeItems.length === 0 ? 'table-content.no-items' : "table-content"}>
                            {activeTab === 'items' && activeItems && activeItems.length === 0 && (
                                <NoItems missing={'items'} element={'item'} />
                            )}  
                            <table cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                    {itemsWithSupplierAndCategoryNames.map((item, index) => (
                                        <>
                                            {item.active && (

                                                <tr key={item.id} className={index === itemsWithSupplierAndCategoryNames.length - 1 ? 'last-row' : ''}>
                                                    <td id='item-name'>{item.name}</td>
                                                    <td id='item-category'>{item.categoryName}</td>
                                                    <td>{item.supplierName}</td>
                                                    <td>{item.low_stock_at}</td>
                                                    <td>{item.suffix}</td>
                                                    <td id='item-dots'>
                                                        <span class="material-symbols-outlined"
                                                            id={showDropdown === index ? 'edit-dd-active' : ''}
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Stop event propagation
                                                                handleEditDropDown(index);
                                                            }}>
                                                            more_horiz</span>
                                                        {showDropdown === index && (
                                                            <div className="item-edit-dropdown-container" ref={dropdownRef}>
                                                                <div className="item-edit-dropdown">
                                                                    <OpenModalButton
                                                                        className='edit-item-option'
                                                                        modalComponent={<UpdateItemForm itemId={item.id} itemName={item.name} />}
                                                                        buttonText='EDIT'
                                                                        buttonHTML={<span class="material-symbols-outlined">edit</span>}
                                                                    />                                                            <OpenModalButton
                                                                        className='delete-item-option'
                                                                        modalComponent={<ConfirmDeleteItem itemId={item.id} initialData={item} />}
                                                                        buttonText='DELETE'
                                                                        buttonHTML={<span class="material-symbols-outlined">delete</span>}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}

                                        </>
                                    )).reverse()}

                                </tbody>
                            </table>
                        </div>

                    </div>
                )}

            </div>

        </div >
    );
}

export default ItemsPage;
