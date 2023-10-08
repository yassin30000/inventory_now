import React, { useEffect, useState } from "react";
import { deleteInventorySheet, fetchAllInventorySheets, fetchInventorySheet, updateInventoryItem } from "../../store/inventory_sheet";
import { useDispatch, useSelector } from "react-redux";
import './InventorySheetForm.css'
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function InventorySheetForm({ sheetId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const inventorySheetData = useSelector((state) => state.inventorySheets);
    const inventorySheet = inventorySheetData ? inventorySheetData.inventorySheet : [];

    useEffect(() => {
        dispatch(fetchInventorySheet(sheetId));
        dispatch(fetchAllInventorySheets());

    }, [dispatch, sheetId]);

    const [quantityUpdates, setQuantityUpdates] = useState({});
    const handleQuantityChange = (itemId, newQuantity) => {
        setQuantityUpdates({ ...quantityUpdates, [itemId]: newQuantity });
    };

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inventorySheet) {
            for (const itemId in quantityUpdates) {
                const newQuantity = quantityUpdates[itemId];
                await dispatch(updateInventoryItem(itemId, inventorySheet.id, newQuantity));
            }
        }
        closeModal();
        dispatch(fetchAllInventorySheets());
        history.push('/inventory-sheets')
    };

    return (
        <>
            {inventorySheet && (
                <div className="i-s-form-container">

                    <h1>Inventory For {inventorySheet && formatDate(inventorySheet.created_at)}</h1>

                    <form onSubmit={handleSubmit}>
                        {inventorySheet?.inventory_items.map((item) => (
                            <div key={item.id}>
                                <label htmlFor={`quantity-${item.id}`}>{item.item.name}</label>
                                <input
                                    type="number"
                                    id={`quantity-${item.id}`}
                                    name={`quantity-${item.id}`}
                                    value={quantityUpdates[item.id] || item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                />
                                <span>{item.item.suffix}</span>
                            </div>
                        ))}
                        <button type="submit">Save</button>
                        {/* <button onClick={() => handleDelete()}>Delete</button> */}
                    </form>

                </div>
            )}
        </>
    );
}

export default InventorySheetForm;
