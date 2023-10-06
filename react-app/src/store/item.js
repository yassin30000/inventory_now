// GET ALL USER ITEMS
const SET_USER_ITEMS = 'item/SET_USER_ITEMS';

const setUserItems = (items) => ({
    type: SET_USER_ITEMS,
    payload: items,
});

export const fetchUserItems = () => async (dispatch) => {
    const res = await fetch('/api/items/');

    if (res.ok) {
        const data = await res.json();
        dispatch(setUserItems(data.items));
    }
};

const initialState = {
    userItems: [],
};

const itemReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_ITEMS:
            return { ...state, userItems: action.payload };

        default:
            return state;
    }
};

export default itemReducer;

