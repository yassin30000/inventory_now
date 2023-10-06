
// GET INVENTORY SHEET DETAILS
const SET_INVENTORY_SHEET = 'inventory_sheet/set';

const setInventorySheet = inventorySheet => ({
    type: SET_INVENTORY_SHEET,
    payload: inventorySheet
});

export const fetchInventorySheet = (inventorySheetId) => async dispatch => {
    const res = await fetch(`/api/inventory_sheets/${inventorySheetId}`);

    if (res.ok) {
        const inventorySheet = await res.json();
        dispatch(setInventorySheet(inventorySheet))
    }
};

// UPDATE INVENTORY ITEM
const UPDATE_INVENTORY_ITEM = 'inventoryItem/update';

const updateInventoryItemAction = updatedInventoryItem => ({
    type: UPDATE_INVENTORY_ITEM,
    payload: updatedInventoryItem
});

export const updateInventoryItem = (inventoryItemId, inventorySheetId, updatedInventoryItem) => async (dispatch) => {
    const response = await fetch(`/api/inventory_items/${inventoryItemId}/${inventorySheetId}`, {
        method: 'PATCH', // Use PATCH for updating
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            { 'quantity': updatedInventoryItem },
        ),
    });

    if (response.ok) {
        const updatedItem = await response.json();
        dispatch(updateInventoryItemAction(updatedItem));
        return null;
    } else {
        // Handle error cases
        const data = await response.json();
        return data.errors;
    }
};


const initialState = {};

const inventorySheetReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_INVENTORY_SHEET:
            return { ...state, inventorySheet: action.payload }

        case UPDATE_INVENTORY_ITEM:
            return { ...state, inventoryItem: action.payload }

        default:
            return state
    }
};

export default inventorySheetReducer;