import { useDispatch } from "react-redux";
import { deleteUserItemById, fetchUserItems } from "../../store/item";
import { useModal } from "../../context/Modal";

function ConfirmDeleteItem({ itemId }) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        await dispatch(deleteUserItemById(id));
        await dispatch(fetchUserItems());
        closeModal();
    }

    return (
        <>
            <h1>confirm delete item?</h1>
            <button onClick={() => handleDelete(itemId)}>Yes</button>
            <button onClick={() => closeModal()}>no</button>
        </>
    )
}

export default ConfirmDeleteItem;