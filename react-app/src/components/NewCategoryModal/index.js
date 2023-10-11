import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewCategoryModal.css'
import { useModal } from '../../context/Modal';
import { createNewCategory } from '../../store/category';

function NewCategoryModal() {
    const [name, setName] = useState('');

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCategory = {
            name: name
        };

        await dispatch(createNewCategory(newCategory));

        closeModal();
    };

    return (
        <div className="new-item-modal-container" id='new-cat-modal'>
            <div className="new-item-modal-content">

                <div className="new-item-modal-top-container">
                    <div className='new-item-modal-heading'>create a new category.</div>

                    <span class="material-symbols-outlined" onClick={closeModal}>close</span>

                </div>

                <div className="new-item-modal-bottom-container">

                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder='Name'
                            />
                        </label>

                        <button id='create-cat-btn'type="submit">Create Category</button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default NewCategoryModal;
