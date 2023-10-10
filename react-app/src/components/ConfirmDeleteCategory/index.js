import { useDispatch } from 'react-redux';
import { fetchUserCategories, deleteUserCategoryById } from '../../store/category.js'
import { useModal } from '../../context/Modal.js';

function ConfirmDeleteCategory({ categoryId, categoryName }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    console.log(categoryId, categoryName)

    const handleDelete = async (categoryId) => {

        await dispatch(deleteUserCategoryById(categoryId))
        await dispatch(fetchUserCategories())

        closeModal();
    }

    return (
        <>
            <h1>confirm delete {categoryName}?</h1>
            <button onClick={() => handleDelete(categoryId)}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
        </>
    );
}

export default ConfirmDeleteCategory;