import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../../store/item';
import { fetchSingleSupplier, fetchUserSuppliers } from '../../store/supplier';
import { fetchUserCategories } from '../../store/category';
import NewSupplierModal from '../NewSupplierModal';
import OpenModalButton from '../OpenModalButton';

function SuppliersTab() {
    const [activeTab, setActiveTab] = useState('items');
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userCategories = useSelector((state) => state.categories.categories);
    const userSuppliers = useSelector((state) => state.suppliers.suppliers);

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
        <div className="items-content">
            <table className="items-table">
                <thead id='items-heading-row'>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Number of items</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th><div className="new-item-btn-container">
                            <OpenModalButton
                                modalComponent={<NewSupplierModal />}
                                buttonText='new supplier'
                            />
                        </div></th>
                    </tr>
                </thead>
                <tbody>
                    {userSuppliers.map((supplier, index) => (
                        <tr key={supplier.id} className={index === userSuppliers.length - 1 ? 'last-row' : ''}>
                            <td id='item-name'>{supplier.name}</td>
                            <td id='item-category'>{supplier.items.length}</td>
                            <td></td> {/* Display supplier name */}
                            <td></td>
                            <td></td>
                            <td id='item-dots'><span class="material-symbols-outlined">
                                more_horiz
                            </span></td>
                        </tr>
                    )).reverse()}
                </tbody>
            </table>
        </div>
    );
}

export default SuppliersTab;
