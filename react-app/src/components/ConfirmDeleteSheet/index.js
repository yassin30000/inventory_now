import { useDispatch } from "react-redux";
import { deleteInventorySheet, fetchAllInventorySheets } from "../../store/inventory_sheet";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function ConfirmDeleteSheet({ sheetId }) {
    const { closeModal } = useModal();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = async (sheetId) => {
        const deletedSheet = await dispatch(deleteInventorySheet(sheetId))

        if (!deletedSheet) {
            await dispatch(fetchAllInventorySheets())
        }
        closeModal();
    }


    return (
        <>
            <div className="confirm-delete-sheet-container">
                Are you sure you want to delete this sheet?

                <div className="confirm-delete-sheet-btn-container">

                    <button onClick={() => handleDelete(sheetId)}>yes</button>
                    <button onClick={() => closeModal()}>no</button>
                </div>
            </div>
        </>
    )
}

export default ConfirmDeleteSheet;