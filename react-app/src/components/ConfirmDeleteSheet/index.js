import { useDispatch } from "react-redux";
import { deleteInventorySheet, fetchAllInventorySheets } from "../../store/inventory_sheet";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";



function ConfirmDeleteSheet({ sheetId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = (sheetId) => {
        dispatch(deleteInventorySheet(sheetId))
        dispatch(fetchAllInventorySheets())

        closeModal();
    }

    // useEffect(() => {
    //     dispatch(fetchAllInventorySheets())

    // }, [dispatch])

    return (
        <>
            <div className="confirm-delete-sheet-container">
                Are you sure you want to delete this sheet?

                <div className="confirm-delete-sheet-btn-container">

                    <button onClick={() => handleDelete(sheetId)}>yes</button>
                    <button>no</button>
                </div>
            </div>
        </>
    )
}

export default ConfirmDeleteSheet;