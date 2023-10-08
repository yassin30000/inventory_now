import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../../store/item';
import { fetchSingleSupplier, fetchUserSuppliers } from '../../store/supplier';
import { fetchUserCategories } from '../../store/category';
import NewCategoryModal from '../NewCategoryModal';
import OpenModalButton from '../OpenModalButton';
import ConfirmDeleteCategory from '../ConfirmDeleteCategory';


function CategoriesTab() {
    const [activeTab, setActiveTab] = useState('items');
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userCategories = useSelector((state) => state.categories.categories.reverse());
    const [showDropdown, setShowDropdown] = useState(null);

    const handleEditDropDown = (index) => {
        if (showDropdown === index) {
            setShowDropdown(null);
        } else {
            setShowDropdown(index);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

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
                        <th><div className="new-item-btn-container">
                            <OpenModalButton
                                modalComponent={<NewCategoryModal />}
                                buttonText='new category'
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
                            <td id='item-dots'><span class="material-symbols-outlined" onClick={() => handleEditDropDown(index)}>more_horiz</span>
                                {showDropdown === index && (
                                    <div className="item-edit-dropdown">

                                        <button className="edit-supplier-option">edit</button>
                                        <OpenModalButton
                                            modalComponent={<ConfirmDeleteCategory />}
                                            buttonText='delete'
                                        />

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
