// GET ALL USER ITEMS
const SET_USER_ITEMS = 'item/SET_USER_ITEMS';
const SET_NEW_ITEM = 'item/SET_NEW_ITEM';


const setUserItems = (items) => ({
    type: SET_USER_ITEMS,
    payload: items,
});

const setNewItem = (item) => ({
    type: SET_NEW_ITEM,
    payload: item,
});

export const fetchUserItems = () => async (dispatch) => {
    const res = await fetch('/api/items/');

    if (res.ok) {
        const data = await res.json();
        dispatch(setUserItems(data.items));
    }
};

export const createNewItem = (formData) => async (dispatch) => {
    const response = await fetch('/api/items/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        const newItem = await response.json();
        dispatch(setNewItem(newItem));
        return newItem; // Return the newly created item data
    } else {
        // Handle error cases
        const data = await response.json();
        return data.errors;
    }
};

const initialState = {
    userItems: [],
};

const itemReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_ITEMS:
            return { ...state, userItems: action.payload };
        
        case SET_NEW_ITEM:
            return { ...state, userItems: [...state.userItems, action.payload] };

        default:
            return state;
    }
};

export default itemReducer;

