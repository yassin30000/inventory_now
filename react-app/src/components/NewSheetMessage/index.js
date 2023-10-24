import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInventorySheets } from "../../store/inventory_sheet";
import NewInventorySheet from "../NewInventorySheet";
import OpenModalButton from "../OpenModalButton";
import './NewSheetMessage.css'

function NewSheetMessage() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // this is here to load sheets if user closes modal by clicking out
    dispatch(fetchAllInventorySheets())

    useEffect(() => {
        dispatch(fetchAllInventorySheets())
    }, [dispatch]);

    return (
        <div className="delete-item-container">

            <div className="delete-item-heading-container">

                <div>sheet created!</div>

            </div>

            <div className="delete-item-btns">

                <OpenModalButton
                    className={'delete-item-yes'}
                    buttonText={'edit now'}
                    modalComponent={<NewInventorySheet />}
                />

                <button id='delete-item-no' onClick={() => closeModal()}>edit later</button>
            </div>
        </div>


    )
}

export default NewSheetMessage;