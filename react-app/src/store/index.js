import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import inventorySheetReducer from './inventory_sheet.js'
import itemReducer from './item';
import supplierReducer from './supplier';
import categoryReducer from './category';


const rootReducer = combineReducers({
  session,
  inventorySheets: inventorySheetReducer,
  items: itemReducer,
  suppliers: supplierReducer,
  categories: categoryReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
