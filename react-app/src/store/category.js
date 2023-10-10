const SET_CATEGORIES = 'category/setCategories';
const SET_NEW_CATEGORY = 'category/setNewCategory'
const DELETE_USER_CATEGORY = 'category/DELETE_USER_CATEGORY';
const UPDATE_USER_CATEGORY = 'category/UPDATE_USER_CATEGORY';


const setCategories = categories => ({
    type: SET_CATEGORIES,
    payload: categories
});

const setNewCategory = (category) => ({
    type: SET_NEW_CATEGORY,
    payload: category
});

const deleteUserCategory = (categoryId) => ({
    type: DELETE_USER_CATEGORY,
    payload: categoryId,
});

const updateUserCategory = (updatedCategory) => ({
    type: UPDATE_USER_CATEGORY,
    payload: updatedCategory,
});

export const fetchUserCategories = () => async (dispatch) => {
    const response = await fetch('/api/categories/');

    if (response.ok) {
        const data = await response.json();
        dispatch(setCategories(data.categories));
    }
};

export const createNewCategory = (formData) => async (dispatch) => {
    const res = await fetch('/api/categories/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res.ok) {
        const newCategory = await res.json();
        dispatch(setNewCategory(newCategory));
        return newCategory;
    } else {
        const data = await res.json();
        return data.errors;
    }
}

export const deleteUserCategoryById = (categoryId) => async (dispatch) => {
    const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        // Category deleted successfully
        dispatch(deleteUserCategory(categoryId));
        return null;
    } else {
        // Handle error cases
        const data = await response.json();
        return data.errors;
    }
};

export const updateUserCategoryById = (categoryId, updatedData) => async (dispatch) => {
    const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'PATCH', // Use PATCH for updating
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (response.ok) {
        // Category updated successfully
        const updatedCategory = await response.json();
        dispatch(updateUserCategory(updatedCategory));
        return updatedCategory;
    } else {
        // Handle error cases
        const data = await response.json();
        return data.errors;
    }
};

const initialState = {
    categories: [],
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CATEGORIES:
            return { ...state, categories: action.payload };

        case SET_NEW_CATEGORY:
            return { ...state, categories: [...state.categories, action.payload] }

        case DELETE_USER_CATEGORY:
            // return { ...state, categories: action.payload };
            console.log(state.categories)
            const updatedCategories = state.categories.filter(
                (category) => category.id !== action.payload
            );
            return { ...state, categories: updatedCategories };

        case UPDATE_USER_CATEGORY:
            // Find and update the category in categories array
            const newUpdatedCategories = state.categories.map((category) => {
                if (category.id === action.payload.id) {
                    return action.payload;
                } else {
                    return category;
                }
            });
            return { ...state, categories: newUpdatedCategories };

        default:
            return state;
    }
};

export default categoryReducer;