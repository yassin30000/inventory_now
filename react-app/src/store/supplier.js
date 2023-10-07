const SET_SINGLE_SUPPLIER = 'supplier/setSingle';
const SET_NEW_SUPPLIER = 'supplier/setNewSupplier'
const SET_SUPPLIERS = 'supplier/setSuppliers';

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

        default:
            return state;
    }
};

export default supplierReducer;