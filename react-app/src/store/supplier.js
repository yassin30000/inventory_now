const SET_SINGLE_SUPPLIER = 'supplier/setSingle';
const SET_NEW_SUPPLIER = 'supplier/setNewSupplier'
const SET_SUPPLIERS = 'supplier/setSuppliers';
const DELETE_USER_SUPPLIER = 'supplier/DELETE_USER_SUPPLIER';
const UPDATE_USER_SUPPLIER = 'supplier/UPDATE_USER_SUPPLIER';

const updateUserSupplier = (updatedSupplier) => ({
    type: UPDATE_USER_SUPPLIER,
    payload: updatedSupplier,
});

const setSingleSupplier = (supplier) => ({
    type: SET_SINGLE_SUPPLIER,
    payload: supplier,
});

const setSuppliers = (suppliers) => ({
    type: SET_SUPPLIERS,
    payload: suppliers,
});

const setNewSupplier = (supplier) => ({
    type: SET_NEW_SUPPLIER,
    payload: supplier
});

const deleteUserSupplier = (supplierId) => ({
    type: DELETE_USER_SUPPLIER,
    payload: supplierId,
});

export const updateUserSupplierById = (supplierId, updatedData) => async (dispatch) => {
    const response = await fetch(`/api/suppliers/${supplierId}`, {
        method: 'PATCH', // Use PATCH for updating
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (response.ok) {
        // Supplier updated successfully
        const updatedSupplier = await response.json();
        dispatch(updateUserSupplier(updatedSupplier));
        return updatedSupplier;
    } else {
        // Handle error cases
        const data = await response.json();
        return data.errors;
    }
};

export const fetchSingleSupplier = (supplierId) => async (dispatch) => {
    const response = await fetch(`/api/suppliers/${supplierId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setSingleSupplier(data.supplier));
        return null;
    } else {
        // Handle error cases
        const data = await response.json();
        return data.errors;
    }
};


export const fetchUserSuppliers = () => async (dispatch) => {
    const response = await fetch('/api/suppliers/');

    if (response.ok) {
        const data = await response.json();
        dispatch(setSuppliers(data.suppliers));
    }
};

export const createNewSupplier = (formData) => async (dispatch) => {
    const res = await fetch('/api/suppliers/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (res.ok) {
        const newSupplier = await res.json();
        dispatch(setNewSupplier(newSupplier));
        return newSupplier;
    } else {
        const data = await res.json();
        return data.errors;
    }
}

export const deleteUserSupplierById = (supplierId) => async (dispatch) => {
    const response = await fetch(`/api/suppliers/${supplierId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        // Supplier deleted successfully
        dispatch(deleteUserSupplier(supplierId));
        return null;
    } else {
        // Handle error cases
        const data = await response.json();
        return data.errors;
    }
};

const initialState = {
    suppliers: [],
    singleSupplier: null,
};


const supplierReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SUPPLIERS:
            return { ...state, suppliers: action.payload };

        case SET_SINGLE_SUPPLIER:
            return { ...state, singleSupplier: action.payload };

        case SET_NEW_SUPPLIER:
            return { ...state, suppliers: [...state.suppliers, action.payload] }

        case DELETE_USER_SUPPLIER:
            const updatedSuppliers = state.suppliers.filter(
                (supplier) => supplier.id !== action.payload
            );
            return { ...state, suppliers: updatedSuppliers };

        case UPDATE_USER_SUPPLIER:
            // Find and update the supplier in suppliers array
            const newUpdatedSuppliers = state.suppliers.map((supplier) => {
                if (supplier.id === action.payload.id) {
                    return action.payload;
                } else {
                    return supplier;
                }
            });
            return { ...state, suppliers: newUpdatedSuppliers };

        default:
            return state;
    }
};

export default supplierReducer;