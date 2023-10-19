import React, { useEffect, useState } from "react";
import { deleteInventorySheet, fetchAllInventorySheets, fetchInventorySheet, updateInventoryItem } from "../../store/inventory_sheet";
import { useDispatch, useSelector } from "react-redux";
import './NewInventorySheet.css'
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewInventorySheet({ sheetId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const inventorySheetData = useSelector((state) => state.inventorySheets);
    const inventorySheet = inventorySheetData ? inventorySheetData.inventorySheet : [];
    const allSheetsData = useSelector(state => state.inventorySheets.inventorySheets);
    const allSheets = allSheetsData ? allSheetsData.inventory_sheets : [];

    const oneSheet = allSheets ? allSheets[allSheets.length - 1] : []

    console.log('ONE SHEET', oneSheet)

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
        await dispatch(fetchAllInventorySheets());
        history.push('/inventory-sheets')
    };



    return (
        <>
            {oneSheet && (
                <div className="i-s-form-container">

                    <h1>Inventory For {oneSheet && formatDate(oneSheet.created_at)}</h1>

                    <form onSubmit={handleSubmit}>
                        {oneSheet.inventory_items && (


                            <div className="i-s-form-content">

                                {oneSheet?.inventory_items.filter(item => item.item.active).map((item) => (

                                    <div id="i-s-item" key={item.id}>
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
                            </div>
                        )}

                        <div className="i-s-btn-container">

                            <button id='i-s-button' type="submit">Save</button>
                        </div>

                    </form>


                </div>
            )}
        </>
    );
}

export default NewInventorySheet;
