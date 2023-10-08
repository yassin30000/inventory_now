import React, { useEffect, useState } from 'react';
import './InventoryPage.css'
import { fetchAllInventorySheets } from '../../store/inventory_sheet';
import { useDispatch, useSelector, useStore } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import InventorySheetForm from '../InventorySheetForm'
import ConfirmDeleteSheet from '../ConfirmDeleteSheet';

function InventoryPage() {

    const dispatch = useDispatch();

    const allSheetsData = useSelector(state => state.inventorySheets.inventorySheets);

    const allSheets = allSheetsData ? allSheetsData.inventory_sheets : [];

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    const isLowStock = (itemObj, quantity) => {
        if (itemObj.item.low_stock_at >= quantity) return true;
        else return false;
    }

    const lowStockTotal = (sheet) => {
        const sheetItems = sheet.inventory_items;
        let total = 0;
        sheetItems.forEach(item => {
            if (isLowStock(item, item.quantity)) total += 1;
        });
        return total;
    }

    const getLatestItemUpdatedAt = (sheet) => {
        let latestUpdatedAt = null;
        sheet.inventory_items.forEach((item) => {
            const itemUpdatedAt = new Date(item.updated_at);
            if (!latestUpdatedAt || itemUpdatedAt > latestUpdatedAt) {
                latestUpdatedAt = itemUpdatedAt;
            }
        });
        return latestUpdatedAt;
    };

    useEffect(() => {
        dispatch(fetchAllInventorySheets());
    }, [dispatch]);

    return (
        <>
            <div className="inventory-page-container">

                <div className="inventories">
                    {allSheets && allSheets.map((sheet) => (
                        <div className="inventory" key={sheet.id}>
                            <div className="inventory-content">
                                <div className="inventory-left">
                                    <div className="inventory-date">{formatDate(sheet.created_at)}</div>
                                    <div className="last-updated">last updated: {formatDate(getLatestItemUpdatedAt(sheet))}</div>
                                    <ul className="inventory-left-align">
                                        {sheet.inventory_items.slice(0, 4).map((item, index) => (
                                            <div className="inventory-row" key={item.id} id={"inventoryRow" + index}>
                                                <li className="inventory-item-name">{item.item.name}</li>
                                                <span className="inventory-item-quantity">{`x${item.quantity} ${item.item.suffix}`}</span>
                                            </div>
                                        ))}
                                    </ul>
                                </div>

                                <div className="inventory-right">
                                    <div className="inventory-low-stock-container">
                                        <div className="inventory-low-stock-heading">{lowStockTotal(sheet)}</div>
                                        <div className="inventory-low-stock-content">
                                            low stock items
                                        </div>
                                    </div>
                                    <div className="inventory-buttons">
                                        {/* <button
                                            className="edit-button"
                                            onClick={() => handleEditSheet(sheet.id)}
                                        >
                                            Edit
                                        </button> */}

                                        <OpenModalButton
                                            modalComponent={< InventorySheetForm sheetId={sheet.id} />}
                                            buttonText='edit'
                                        />
                                        <OpenModalButton
                                            modalComponent={< ConfirmDeleteSheet sheetId={sheet.id} />}
                                            buttonText='delete'
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    )).reverse()}
                </div>
            </div>
        </>
    )
}

export default InventoryPage;


