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
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>
                    Close
                </button>
                <h2>New Category</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Category Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>




                    <button type="submit">Create Category</button>
                </form>
            </div>
        </div>
    );
}

export default NewCategoryModal;
