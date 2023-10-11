import React, { useState, useEffect } from 'react';
import './NewItemModal.css';
import { useModal } from '../../context/Modal';
import { createNewItem } from '../../store/item';
import { useDispatch, useSelector } from 'react-redux';

function NewItemModal() {
    const [itemName, setItemName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [lowStock, setLowStock] = useState('');
    const [suffix, setSuffix] = useState('');

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories); // Get categories from the store
    const suppliers = useSelector((state) => state.suppliers.suppliers); // Get suppliers from the store

    useEffect(() => {
        // Fetch categories and suppliers when the component loads
        // Dispatch actions to fetch categories and suppliers here
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            name: itemName,
            category_id: categoryId, // Use categoryId instead of category
            supplier_id: supplierId, // Use supplierId instead of supplier
            low_stock_at: lowStock,
            suffix,
        };

        await dispatch(createNewItem(newItem));

        closeModal();
    };

    return (
        <div className="new-item-modal-container">
            <div className="new-item-modal-content">

                <div className="new-item-modal-top-container">
                    <div className='new-item-modal-heading'>create a new item.</div>

                    <span class="material-symbols-outlined" onClick={closeModal}>close</span>

                </div>

                <div className="new-item-modal-bottom-container">

                    <form onSubmit={handleSubmit}>

                        <div className="inp-grid">

                            <input
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                required
                                placeholder='Name'
                            />


                            <input
                                type="text"
                                value={suffix}
                                onChange={(e) => setSuffix(e.target.value)}
                                placeholder='Suffix (containers, bags, etc.)'
                                required
                            />

                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}

                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={supplierId}
                                onChange={(e) => setSupplierId(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Supplier
                                </option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            id='lowstock-inp'
                            type="number"
                            value={lowStock}
                            onChange={(e) => setLowStock(e.target.value)}
                            placeholder='Low Stock At'
                            required
                        />


                        <p>this will help us notify you when an item is low stock</p>

                        <div className="submit-btn-container">

                            <button type="submit">Create Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewItemModal;
