
// GET INVENTORY SHEET DETAILS
const SET_INVENTORY_SHEET = 'inventory_sheet/set';
const SET_ALL_INVENTORY_SHEETS = 'inventory_sheet/setAll';
const DELETE_INVENTORY_SHEET = 'inventory_sheet/delete';
const CREATE_INVENTORY_SHEET = 'inventory_sheet/create';


const setInventorySheet = inventorySheet => ({
    type: SET_INVENTORY_SHEET,
    payload: inventorySheet
});

const createInventorySheetAction = (inventorySheet) => ({
    type: CREATE_INVENTORY_SHEET,
    payload: inventorySheet,
});

const setAllInventorySheets = (inventorySheets) => ({
    type: SET_ALL_INVENTORY_SHEETS,
    payload: inventorySheets,
});

const deleteInventorySheetAction = (sheetId) => ({
    type: DELETE_INVENTORY_SHEET,
    payload: sheetId,
});


export const deleteInventorySheet = (sheetId) => async (dispatch) => {
    const response = await fetch(`/api/inventory_sheets/${sheetId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteInventorySheetAction(sheetId));
        return null;
    } else {

        const data = await response.json();
        return data.errors;
    }
};


export const fetchInventorySheet = (inventorySheetId) => async dispatch => {
    const res = await fetch(`/api/inventory_sheets/${inventorySheetId}`);

    if (res.ok) {
        const inventorySheet = await res.json();
        dispatch(setInventorySheet(inventorySheet))
    }
};

export const fetchAllInventorySheets = () => async (dispatch) => {
    const res = await fetch('/api/inventory_sheets/');

    if (res.ok) {
        const inventorySheets = await res.json();
        dispatch(setAllInventorySheets(inventorySheets));
    }
};

export const createInventorySheet = () => async (dispatch) => {
    const response = await fetch('/api/inventory_sheets/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const newInventorySheet = await response.json();
        dispatch(createInventorySheetAction(newInventorySheet));

        return newInventorySheet;
    } else {
        // Handle error cases
        const data = await response.json();
        return data.errors;
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

        case SET_ALL_INVENTORY_SHEETS:
            return { ...state, inventorySheets: action.payload }

        case CREATE_INVENTORY_SHEET:
            return { ...state, inventorySheets: [state.inventorySheets, action.payload] }

        case DELETE_INVENTORY_SHEET:
            // Filter out the deleted inventory sheet by sheetId.
            const updatedSheets = state.inventorySheets.inventory_sheets.filter(
                (sheet) => sheet.id !== action.payload
            );
            return {
                ...state,
                inventorySheets: updatedSheets,
            };


        default:
            return state
    }
};

export default inventorySheetReducer;