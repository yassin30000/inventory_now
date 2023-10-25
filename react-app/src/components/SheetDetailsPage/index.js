import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventorySheet } from "../../store/inventory_sheet";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './SheetDetailsPage.css'
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteSheet from "../ConfirmDeleteSheet";
import InventorySheetForm from "../InventorySheetForm";
import { fetchUserCategories } from "../../store/category";
import { fetchUserSuppliers } from "../../store/supplier";

function SheetDetailsPage() {
    const { sheetId } = useParams();
    const dispatch = useDispatch();
    const sheet = useSelector(state => state.inventorySheets.inventorySheet);
    const userCategories = useSelector((state) => state.categories.categories.reverse());
    const userSuppliers = useSelector((state) => state.suppliers.suppliers);

    const [sortingOption, setSortingOption] = useState('category');

    const formatDate = (dateString) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    const checkLow = (item) => {
        if (item.quantity <= item.item.low_stock_at) {
            return true
        }
        return false
    }

    const toggleSort = () => {
        if (sortingOption === 'category') setSortingOption('supplier')
        else setSortingOption('category')
    }

    const majorityLowStock = (category) => {
        let categoryItems = sheet.inventory_items.filter(item => item.item.category_id === category.id);
        let lowStock = [];
        let normalStock = [];
        categoryItems.forEach(item => {
            if (checkLow(item)) lowStock.push(item);
            else normalStock.push(item)
        });
        return lowStock.length > normalStock.length;
    }

    useEffect(() => {
        dispatch(fetchInventorySheet(sheetId));
        dispatch(fetchUserCategories());
        dispatch(fetchUserSuppliers());
    }, [dispatch, sheetId]);

    return (
        <>
            {sheet && sheet.inventory_items && (


                <div className="sheet-details-container">

                    <div className="sheet-details-heading-container">
                        <div className="sheet-details-heading">Inventory Sheet For {formatDate(sheet.created_at)}</div>
                        <div className="toggle-sort-container">
                            <button onClick={toggleSort}>sort by {sortingOption === 'category' ? 'supplier' : 'category'}</button>
                        </div>
                    </div>

                    <div className="sheet-details-full-content">

                        {sortingOption === 'category' ? (
                            <div className="sheet-details-cat-container">
                                {userCategories.map(category => (
                                    <>

                                        <div className={majorityLowStock(category) ? "sheet-details-cat-name-red" : "sheet-details-cat-name-purple"}>{category.name}</div>
                                        <div className={majorityLowStock(category) ? "sheet-details-content-red" : "sheet-details-content-purple"}>
                                            {sheet.inventory_items.filter(item => item.item.category_id === category.id && item.item.active).map(item => (
                                                <>
                                                    {/* <div>{item.item.name}</div> */}
                                                    <div className={checkLow(item) ? "details-item-card-low" : "details-item-card"}>
                                                        <div id="details-item-quantiy">{item.quantity}</div>
                                                        <div id="details-item-name">{item.item.name}</div>
                                                        <div id="details-item-suffix">{item.item.suffix}</div>
                                                    </div>
                                                </>

                                            ))}
                                        </div >
                                    </>
                                ))}
                            </div>
                        ) : (
                            <div className="sheet-details-cat-container">
                                {userSuppliers.map(supplier => (
                                    <>


                                        <div className={majorityLowStock(supplier) ? "sheet-details-cat-name-red" : "sheet-details-cat-name-purple"}>{supplier.name}</div>

                                        <div className={majorityLowStock(supplier) ? "sheet-details-content-red" : "sheet-details-content-purple"}>
                                            {sheet.inventory_items.filter(item => item.item.supplier_id === supplier.id && item.item.active).map(item => (
                                                <>
                                                    {/* <div>{item.item.name}</div> */}
                                                    <div className={checkLow(item) ? "details-item-card-low" : "details-item-card"}>
                                                        <div id="details-item-quantiy">{item.quantity}</div>
                                                        <div id="details-item-name">{item.item.name}</div>
                                                        <div id="details-item-suffix">{item.item.suffix}</div>
                                                    </div>
                                                </>

                                            ))}
                                        </div >
                                    </>
                                ))}
                            </div>
                        )}

                        {/* {sheet.inventory_items.map(item => (
                            <div className={checkLow(item) ? "details-item-card-low" : "details-item-card"}>
                                <div id="details-item-quantiy">{item.quantity}</div>
                                <div id="details-item-name">{item.item.name}</div>
                                <div id="details-item-suffix">{item.item.suffix}</div>
                            </div>
                        ))} */}

                    </div>
                </div>
            )
            }

        </>
    )
}

export default SheetDetailsPage;