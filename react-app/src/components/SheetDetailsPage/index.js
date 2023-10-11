import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventorySheet } from "../../store/inventory_sheet";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './SheetDetailsPage.css'

function SheetDetailsPage() {
    const { sheetId } = useParams();
    const dispatch = useDispatch();
    const sheet = useSelector(state => state.inventorySheets.inventorySheet);

    console.log('SHEET ID:  ', sheetId)
    console.log('SHEET: ', sheet)


    const formatDate = (dateString) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        dispatch(fetchInventorySheet(sheetId));
    }, [dispatch, sheetId]);

    return (
        <>
            {sheet && sheet.inventory_items && (


                <div className="sheet-details-container">

                    <div className="sheet-details-heading-container">
                        <div className="sheet-details-heading">sheet details page for {formatDate(sheet.created_at)}</div>
                    </div>

                    <div className="sheet-details-content-container">
                        {sheet.inventory_items.map(item => (
                            <div>{item.item.name}</div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default SheetDetailsPage;