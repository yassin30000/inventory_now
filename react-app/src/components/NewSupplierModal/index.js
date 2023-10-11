import './NewSupplierModal.css'
import { useModal } from '../../context/Modal';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewSupplier } from '../../store/supplier';

function NewSupplierModal() {
    const [name, setName] = useState('');

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSupplier = {
            name: name
        };

        await dispatch(createNewSupplier(newSupplier));

        closeModal();
    };

    return (
        <div className="new-item-modal-container" id='new-cat-modal'>
            <div className="new-item-modal-content">

                <div className="new-item-modal-top-container">
                    <div className='new-item-modal-heading'>create a new supplier.</div>

                    <span class="material-symbols-outlined" onClick={closeModal}>close</span>

                </div>
                <div className="new-item-modal-bottom-container">

                    <form onSubmit={handleSubmit}>
                        <label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                                required
                            />
                        </label>

                        <button id='create-cat-btn' type="submit">Create Supplier</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default NewSupplierModal;