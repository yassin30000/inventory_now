import { useDispatch } from 'react-redux';
import './NoItems.css'

import { createInventorySheet, fetchAllInventorySheets, fetchInventorySheet } from '../../store/inventory_sheet';
import { useEffect, useState } from 'react';
import OpenModalButton from '../OpenModalButton';
import InventorySheetForm from '../InventorySheetForm';
import NewItemModal from '../NewItemModal';
import NewCategoryModal from '../NewCategoryModal';
import NewSupplierModal from '../NewSupplierModal';


function NoItems({ missing, element }) {
    const dispatch = useDispatch();
    const [newSheetId, setNewSheetId] = useState();

    const handleNewSheet = async () => {
        const newSheet = await dispatch(createInventorySheet());
        setNewSheetId(newSheet.inventory_sheet_id);

        await dispatch(fetchInventorySheet(newSheetId))

    }
    useEffect(() => {
        dispatch(fetchInventorySheet(newSheetId))
        dispatch(fetchAllInventorySheets())
    }, [dispatch, newSheetId])

    return (
        <>
            <div className="no-items-container">

                <div className="no-items-content">

                    <h1 id='first-h1'>come on bro.</h1>
                    <h1>u have no <span>{missing}</span>.</h1>
                    {/* <button>create {missing}</button> */}

                    {element === 'item' && (
                        <OpenModalButton
                            buttonText={`create ${missing.slice(0, missing.length - 1)}`}
                            // onButtonClick={handleNewSheet}
                            modalComponent={<NewItemModal />}
                        />
                    )}
                    {element === 'inventorySheet' && (
                        <OpenModalButton
                            buttonText={`create ${missing.slice(0, missing.length - 1)}`}
                            onButtonClick={handleNewSheet}
                            modalComponent={<InventorySheetForm sheetId={newSheetId} />}
                        />
                    )}

                    {element === 'category' && (
                        <OpenModalButton
                            buttonText={`create category`}

                            modalComponent={<NewCategoryModal />}
                        />
                    )}

                    {element === 'supplier' && (
                        <OpenModalButton
                            buttonText={`create ${missing.slice(0, missing.length - 1)}`}

                            modalComponent={<NewSupplierModal />}
                        />
                    )}

                </div>
            </div>
        </>
    )
}

export default NoItems;