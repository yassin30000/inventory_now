import React, { useState, useEffect } from 'react';
import './UpdateSupplierModal.css'; // You can create a new CSS file for styling this modal
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleSupplier, fetchUserSuppliers, updateUserSupplierById } from '../../store/supplier';

function UpdateSupplierForm({ supplierId, initialName }) {
    const allSuppliers = useSelector(state => state.suppliers.suppliers)
    const supplier = allSuppliers.find(sup => sup.id === supplierId);

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [supplierName, setSupplierName] = useState(supplier?.name);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedSupplier = {
            name: supplierName,
        };

        await dispatch(updateUserSupplierById(supplierId, updatedSupplier)); // You need to implement the action to update the supplier

        closeModal();
    };

    useEffect(() => {
        dispatch(fetchSingleSupplier(supplierId))
        dispatch(fetchUserSuppliers())

    }, [dispatch, supplierId]);

    return (
        <div className="new-item-modal-container" id='new-cat-modal'>
            <div className="new-item-modal-content">
                <div className="new-item-modal-top-container">
                    <div className='new-item-modal-heading'>update supplier <span>{supplierName.length < 40 ? supplierName + '.': supplierName.slice(0,40) + '...'}</span></div>

                    <span class="material-symbols-outlined" onClick={closeModal}>close</span>

                </div>
                <div className="new-item-modal-bottom-container">

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            required
                            placeholder='Name'

                        />

                        <button id='create-cat-btn' type="submit">Save Supplier</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default UpdateSupplierForm;
