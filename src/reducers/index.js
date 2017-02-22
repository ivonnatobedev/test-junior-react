import { combineReducers } from 'redux';
import customersReducer from './customersReducer';
import productsReducer from './productsReducer';
import invoicesReducer from './invoicesReducer';

export default combineReducers({
  customers: customersReducer,
  products: productsReducer,
  invoices: invoicesReducer
});