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
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>
                    Close
                </button>
                <h2>Update Supplier</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Supplier Name:
                        <input
                            type="text"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Update Supplier</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateSupplierForm;
