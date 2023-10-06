import React, { useEffect, useState } from "react";
import { fetchInventorySheet, updateInventoryItem } from "../../store/inventory_sheet";
import { useDispatch, useSelector } from "react-redux";

function InventorySheetForm() {
    const dispatch = useDispatch();
    const inventorySheetData = useSelector((state) => state.inventorySheets);
    const inventorySheet = inventorySheetData ? inventorySheetData.inventorySheet : [];

    console.log('INVENTORY SHEET', inventorySheet)

    useEffect(() => {
        dispatch(fetchInventorySheet(2));
    }, [dispatch]);

    const [quantityUpdates, setQuantityUpdates] = useState({});

    const handleQuantityChange = (itemId, newQuantity) => {
        setQuantityUpdates({ ...quantityUpdates, [itemId]: newQuantity });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dispatch actions to update inventory item quantities
        if (inventorySheet) {
            for (const itemId in quantityUpdates) {
                const newQuantity = quantityUpdates[itemId];
                await dispatch(updateInventoryItem(itemId, inventorySheet.id, newQuantity));
            }
        }

        // Clear the local state
        // setQuantityUpdates({});
    };

    return (
        <div>
            <h1>Inventory Sheet Form</h1>
            {inventorySheet && (
                <form onSubmit={handleSubmit}>
                    {inventorySheet.inventory_items.map((item) => (
                        <div key={item.id}>
                            <label htmlFor={`quantity-${item.id}`}>{item.item.name}</label>
                            <input
                                type="number"
                                id={`quantity-${item.id}`}
                                name={`quantity-${item.id}`}
                                value={quantityUpdates[item.id] || item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default InventorySheetForm;
