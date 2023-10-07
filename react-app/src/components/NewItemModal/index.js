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
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>
                    Close
                </button>
                <h2>New Item</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Item Name:
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Category:
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Supplier:
                        <select
                            value={supplierId}
                            onChange={(e) => setSupplierId(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select a supplier
                            </option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Low Stock:
                        <input
                            type="number"
                            value={lowStock}
                            onChange={(e) => setLowStock(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Suffix:
                        <input
                            type="text"
                            value={suffix}
                            onChange={(e) => setSuffix(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Create Item</button>
                </form>
            </div>
        </div>
    );
}

export default NewItemModal;
