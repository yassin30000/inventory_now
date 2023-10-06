
// get supplier details
const SET_SINGLE_SUPPLIER = 'supplier/setSingle';

const setSingleSupplier = (supplier) => ({
    type: SET_SINGLE_SUPPLIER,
    payload: supplier,
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

//get all suppliers of current user
const SET_SUPPLIERS = 'supplier/setSuppliers';

const setSuppliers = (suppliers) => ({
    type: SET_SUPPLIERS,
    payload: suppliers,
});

export const fetchUserSuppliers = () => async (dispatch) => {
    const response = await fetch('/api/suppliers/');

    if (response.ok) {
        const data = await response.json();
        dispatch(setSuppliers(data.suppliers));
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

        default:
            return state;
    }
};

export default supplierReducer;