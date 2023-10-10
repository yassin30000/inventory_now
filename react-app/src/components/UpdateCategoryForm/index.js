import React, { useState, useEffect } from 'react';
import './UpdateCategoryModal.css'; // You can create a new CSS file for styling this modal
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCategories, updateUserCategoryById } from '../../store/category';

function UpdateCategoryForm({ categoryId, initialName }) {
    const categories = useSelector(state => state.categories.categories);
    const category = categories.find(cat => cat.id === categoryId);
    const [categoryName, setCategoryName] = useState(category.name);

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCategory = {
            name: categoryName,
        };

        await dispatch(updateUserCategoryById(categoryId, updatedCategory)); // You need to implement the action to update the category

        closeModal();
    };

    useEffect(() => {
        dispatch(fetchUserCategories());
    }, [dispatch])

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>
                    Close
                </button>
                <h2>Update Category</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Category Name:
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Update Category</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCategoryForm;
