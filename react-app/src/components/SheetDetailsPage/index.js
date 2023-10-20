import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventorySheet } from "../../store/inventory_sheet";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './SheetDetailsPage.css'
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteSheet from "../ConfirmDeleteSheet";
import InventorySheetForm from "../InventorySheetForm";

function SheetDetailsPage() {
    const { sheetId } = useParams();
    const dispatch = useDispatch();
    const sheet = useSelector(state => state.inventorySheets.inventorySheet);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    console.log(sheet)

    const checkLow = (item) => {
        if (item.quantity <= item.item.low_stock_at) {
            return true
        }
        return false
    }

    useEffect(() => {
        dispatch(fetchInventorySheet(sheetId));
    }, [dispatch, sheetId]);

    return (
        <>
            {sheet && sheet.inventory_items && (


                <div className="sheet-details-container">

                    <div className="sheet-details-heading-container">
                        <div className="sheet-details-heading">Inventory Sheet For {formatDate(sheet.created_at)}</div>
                        <div className="edit-del-btns-details">
                        </div>
                    </div>

                    <div className="sheet-details-content-container">
                        {sheet.inventory_items.map(item => (
                            <div className={checkLow(item) ? "details-item-card-low" : "details-item-card"}>
                                <div id="details-item-quantiy">{item.quantity}</div>
                                <div id="details-item-name">{item.item.name}</div>
                                <div id="details-item-suffix">{item.item.suffix}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default SheetDetailsPage;