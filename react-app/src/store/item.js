// GET ALL USER ITEMS
const SET_USER_ITEMS = 'item/SET_USER_ITEMS';
const SET_NEW_ITEM = 'item/SET_NEW_ITEM';
const DELETE_USER_ITEM = 'item/DELETE_USER_ITEM';
const UPDATE_USER_ITEM = 'item/UPDATE_USER_ITEM';

const updateUserItem = (updatedItem) => ({
    type: UPDATE_USER_ITEM,
    payload: updatedItem,
});

const setUserItems = (items) => ({
    type: SET_USER_ITEMS,
    payload: items,
});

const setNewItem = (item) => ({
    type: SET_NEW_ITEM,
    payload: item,
});

const deleteUserItem = (itemId) => ({
    type: DELETE_USER_ITEM,
    payload: itemId,
});

export const updateUserItemById = (itemId, updatedData) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`, {
        method: 'PATCH', // Use PATCH for updating
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (response.ok) {
        // Item updated successfully
        const updatedItem = await response.json();
        dispatch(updateUserItem(updatedItem));
        return updatedItem;
    } else {
        // Handle error cases
        const data = await response.json();
        console.log(data)

        return data.errors;
    }
};

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

export const deleteUserItemById = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        // Item deleted successfully
        dispatch(deleteUserItem(itemId));
        return null;
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

        case DELETE_USER_ITEM:
            const updatedUserItems = state.userItems.filter(
                (item) => item.id !== action.payload
            );
            return { ...state, userItems: updatedUserItems };

        case UPDATE_USER_ITEM:
            const newUpdatedUserItems = state.userItems.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                } else {
                    return item;
                }
            });
            return { ...state, userItems: newUpdatedUserItems };

        default:
            return state;
    }
};

export default itemReducer;

