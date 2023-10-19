import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../../store/item';
import { fetchSingleSupplier, fetchUserSuppliers } from '../../store/supplier';
import { fetchUserCategories } from '../../store/category';
import NewSupplierModal from '../NewSupplierModal';
import OpenModalButton from '../OpenModalButton';
import ConfirmDeleteSupplier from '../ConfirmDeleteSupplier';
import UpdateSupplierForm from '../UpdateSupplierForm';
import NoItems from '../NoItems';


function SuppliersTab() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userSuppliers = useSelector((state) => state.suppliers.suppliers);
    const [showDropdown, setShowDropdown] = useState(null);
    const dropdownRef = useRef(null);



    const handleEditDropDown = (index) => {
        if (showDropdown === index) {
            setShowDropdown(null);
        } else {
            setShowDropdown(index);
        }
    };

    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (showDropdown !== null && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(null);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [showDropdown]);

    useEffect(() => {
        if (sessionUser) {

            dispatch(fetchUserSuppliers());
            dispatch(fetchUserCategories());
            dispatch(fetchUserItems());
        }

    }, [dispatch, sessionUser]);

    return (
        <div className="items-content">
            
            <table className="items-table">
                <thead id='items-heading-row'>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Number of items</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th id='last-heading'><div className="new-item-btn-container">
                            <OpenModalButton
                                modalComponent={<NewSupplierModal />}
                                buttonText=''
                                buttonHTML={<span class="material-symbols-outlined">add</span>}

                            />
                        </div></th>
                    </tr>
                </thead>
                
                <tbody>
                    {userSuppliers.map((supplier, index) => (
                        <tr key={supplier.id} className={index === userSuppliers.length - 1 ? 'last-row' : ''}>
                            <td id='item-name'>{supplier.name}</td>
                            <td id='item-category'>{supplier.items.filter(item => item.active).length}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td id='item-dots'>
                                <span class="material-symbols-outlined"
                                    id={showDropdown === index ? 'edit-dd-active' : ''}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Stop event propagation
                                        handleEditDropDown(index);
                                    }}>
                                    more_horiz</span>
                                {showDropdown === index && (
                                    <div className="item-edit-dropdown-container" ref={dropdownRef}>

                                        <div className="item-edit-dropdown">

                                            <OpenModalButton
                                                className='edit-item-option'
                                                buttonHTML={<span class="material-symbols-outlined">EDIT</span>}
                                                modalComponent={<UpdateSupplierForm supplierId={supplier.id} supplierName={supplier.name} />}
                                                buttonText='EDIT'
                                            />
                                            <OpenModalButton
                                                className='delete-item-option'
                                                buttonHTML={<span class="material-symbols-outlined">delete</span>}
                                                modalComponent={<ConfirmDeleteSupplier supplierId={supplier.id} supplierName={supplier.name} />}
                                                buttonText='DELETE'
                                            />
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    )).reverse()}
                </tbody>
            </table>
        </div>
    );
}

export default SuppliersTab;
