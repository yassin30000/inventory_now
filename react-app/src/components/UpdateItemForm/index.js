import React, { useState, useEffect } from 'react';
import './UpdateItemForm.css'; // You can create a new CSS file for styling this modal
import { useModal } from '../../context/Modal';
import { fetchUserItems, updateUserItemById } from '../../store/item'; // Assuming you have an action to update items
import { useDispatch, useSelector } from 'react-redux';


function UpdateItemForm({ itemId }) {
    const items = useSelector(state => state.items.userItems)
    const item = items.find(item => item.id === itemId)

    const [itemName, setItemName] = useState(item.name);
    const [categoryId, setCategoryId] = useState(item.category_id);
    const [supplierId, setSupplierId] = useState(item.supplier_id);
    const [lowStock, setLowStock] = useState(item.low_stock_at);
    const [suffix, setSuffix] = useState(item.suffix);

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const suppliers = useSelector((state) => state.suppliers.suppliers);

    useEffect(() => {
        dispatch(fetchUserItems())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedItem = {
            name: itemName,
            category_id: categoryId,
            supplier_id: supplierId,
            low_stock_at: lowStock,
            suffix: suffix,
        };
        console.log(itemId, updatedItem)

        await dispatch(updateUserItemById(itemId, updatedItem)); // You need to implement the action to update the item

        closeModal();
    };

    return (

        <div className="new-item-modal-container">
            <div className="new-item-modal-content">
                <div className="new-item-modal-top-container">
                    <div className='new-item-modal-heading'>update an item.</div>
                    <span class="material-symbols-outlined" onClick={closeModal}>close</span>
                </div>
                <div className="new-item-modal-bottom-container">
                    <form onSubmit={handleSubmit}>

                        <div className="inp-grid">

                            <input
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                placeholder='Name'
                                required
                            />

                            <input
                                type="text"
                                value={suffix}
                                onChange={(e) => setSuffix(e.target.value)}
                                required
                                placeholder='Suffix (containers, bags, etc.)'

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
                                {console.log('SUPPLIER ID', supplierId)}
                                <option value="" disabled>
                                    No Suppliers
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

                            <button type="submit">Update Item</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default UpdateItemForm;
