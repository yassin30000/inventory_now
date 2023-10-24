import { useDispatch } from "react-redux";
import { deleteInventorySheet, fetchAllInventorySheets } from "../../store/inventory_sheet";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


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
        <div className="delete-item-container">


            <div className="delete-item-heading-container">

                <div>confirm delete this sheet?</div>

            </div>



            <div className="delete-item-btns">
                <button id='delete-item-yes' onClick={() => handleDelete(sheetId)}>Yes</button>
                <button id='delete-item-no' onClick={() => closeModal()}>No</button>
            </div>
        </div>


    )
}

export default ConfirmDeleteSheet;