import { useDispatch, useSelector } from "react-redux";
import { deleteUserItemById, fetchUserItems } from "../../store/item";
import { useModal } from "../../context/Modal";
import './ConfirmDeleteItem.css'

function ConfirmDeleteItem({ itemId }) {

    const items = useSelector(state => state.items.userItems);
    const item = items.find(item => item.id === itemId)

    console.log(item)

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        await dispatch(deleteUserItemById(id));
        await dispatch(fetchUserItems());
        closeModal();
    }

    return (
        <>
            {item && (
                <div className="delete-item-container">
                    <div className="delete-item-heading-container">
                        <div>confirm delete <span>{item.name}</span>?</div>
                    </div>
                    <div className="delete-item-btns">
                        <button id='delete-item-yes' onClick={() => handleDelete(itemId)}>Yes</button>
                        <button id='delete-item-no' onClick={() => closeModal()}>No</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConfirmDeleteItem;