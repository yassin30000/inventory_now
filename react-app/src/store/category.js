const SET_CATEGORIES = 'category/setCategories';
const SET_NEW_CATEGORY = 'category/setNewCategory'

const setCategories = categories => ({
    type: SET_CATEGORIES,
    payload: categories
});

const setNewCategory = (category) => ({
    type: SET_NEW_CATEGORY,
    payload: category
})

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

const initialState = {
    categories: [],
    singleCategory: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CATEGORIES:
            return { ...state, categories: action.payload };

        case SET_NEW_CATEGORY:
            return { ...state, categories: [...state.categories, action.payload] }

        default:
            return state;
    }
};

export default categoryReducer;