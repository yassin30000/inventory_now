const SET_CATEGORIES = 'category/setCategories';

const setCategories = categories => ({
    type: SET_CATEGORIES,
    payload: categories
});

export const fetchUserCategories = () => async (dispatch) => {
    const response = await fetch('/api/categories/');

    if (response.ok) {
        const data = await response.json();
        dispatch(setCategories(data.categories));
    }
};

const initialState = {
    categories: [],
    singleCategory: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CATEGORIES:
            return { ...state, categories: action.payload };

        default:
            return state;
    }
};

export default categoryReducer;