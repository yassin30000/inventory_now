import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../../store/item';
import { fetchSingleSupplier, fetchUserSuppliers } from '../../store/supplier';
import { fetchUserCategories } from '../../store/category';
import NewCategoryModal from '../NewCategoryModal';
import OpenModalButton from '../OpenModalButton';
import ConfirmDeleteCategory from '../ConfirmDeleteCategory';
import UpdateCategoryForm from '../UpdateCategoryForm';


function CategoriesTab() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userCategories = useSelector((state) => state.categories.categories.reverse());
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

    }, [dispatch]);

    return (

        <div className="items-content">
            <table className="items-table">
                <thead id='items-heading-row'>
                    <tr>
                        <th>Category Name</th>
                        <th>Number of items</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th id='last-heading'><div className="new-item-btn-container">
                            <OpenModalButton
                                modalComponent={<NewCategoryModal />}
                                buttonText=''
                                buttonHTML={<span class="material-symbols-outlined">add</span>}
                            />
                        </div></th>
                    </tr>
                </thead>
                <tbody>
                    {userCategories.reverse().map((category, index) => (
                        <tr key={category.id} className={index === userCategories.length - 1 ? 'last-row' : ''}>
                            <td id='item-name'>{category.name}</td>
                            <td id='item-category'>{category.items.length}</td>
                            <td></td> {/* Display supplier name */}
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
                                                modalComponent={<UpdateCategoryForm categoryId={category.id} categoryName={category.name} />}
                                                buttonText='EDIT'
                                                buttonHTML={<span class="material-symbols-outlined">EDIT</span>}
                                            />

                                            <OpenModalButton
                                                className='delete-item-option'
                                                modalComponent={<ConfirmDeleteCategory categoryId={category.id} categoryName={category.name} />}
                                                buttonText='DELETE'
                                                buttonHTML={<span class="material-symbols-outlined">delete</span>}

                                            />
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriesTab;
