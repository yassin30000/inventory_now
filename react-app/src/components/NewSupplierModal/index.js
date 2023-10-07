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
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>
                    Close
                </button>
                <h2>New Supplier</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Supplier Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit">Create Supplier</button>
                </form>
            </div>
        </div>
    );
}

export default NewSupplierModal;