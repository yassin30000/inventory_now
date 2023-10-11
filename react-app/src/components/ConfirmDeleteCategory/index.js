import { useDispatch } from 'react-redux';
import { fetchUserCategories, deleteUserCategoryById } from '../../store/category.js'
import { useModal } from '../../context/Modal.js';

function ConfirmDeleteCategory({ categoryId, categoryName }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (categoryId) => {

        await dispatch(deleteUserCategoryById(categoryId))
        await dispatch(fetchUserCategories())

        closeModal();
    }

    return (
        <div className="delete-item-container">
            <div className="delete-item-heading-container">

                <div>confirm delete <span>{categoryName}</span>?</div>

            </div>


            <div className="delete-item-btns">
                <button id='delete-item-yes' onClick={() => handleDelete(categoryId)}>Yes</button>
                <button id='delete-item-no' onClick={() => closeModal()}>No</button>
            </div>

        </div>
    );
}

export default ConfirmDeleteCategory;