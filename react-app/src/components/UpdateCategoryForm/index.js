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
        <div className="new-item-modal-container" id='new-cat-modal'>
            <div className="new-item-modal-content">

                <div className="new-item-modal-top-container">


                    <div className='new-item-modal-heading'>update category <span>{categoryName.length < 40 ? categoryName + '.' : categoryName.slice(0, 40) + '...'}</span></div>

                    <span class="material-symbols-outlined" onClick={closeModal}>close</span>

                </div>
                <div className="new-item-modal-bottom-container">

                    <form onSubmit={handleSubmit}>
                        <label>

                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                                placeholder='Name'
                            />
                        </label>
                        <button id='create-cat-btn' type="submit">Save Category</button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default UpdateCategoryForm;
