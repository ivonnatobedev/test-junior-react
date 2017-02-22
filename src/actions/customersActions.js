import * as constants from '../const/actionTypes';
import {fetchWrapper, getOpt} from '../utils/actionsHelper';

function getCustomers(data) {
  return {
    type: constants.GET_CUSTOMERS,
    payload: data
  };
}

function createCustomer(data) {
  return {
    type: constants.CREATE_CUSTOMER,
    payload: data
  };
}

function editCustomer(data) {
  return {
    type: constants.EDIT_CUSTOMER,
    payload: data
  };
}

function deleteCustomer(data) {
  return {
    type: constants.DELETE_CUSTOMER,
    payload: data
  };
}

export function showModalNew() {
  return {
    type: constants.OPEN_CUSTOMER_MODAL_NEW,
    payload: true
  };
}

export function closeModalNew() {
  return {
    type: constants.CLOSE_CUSTOMER_MODAL_NEW,
    payload: false
  };
}

export function showModalEdit() {
  return {
    type: constants.OPEN_CUSTOMER_MODAL_EDIT,
    payload: true
  };
}

export function closeModalEdit() {
  return {
    type: constants.CLOSE_CUSTOMER_MODAL_EDIT,
    payload: false
  };
}

export function showModalDelete() {
  return {
    type: constants.OPEN_CUSTOMER_MODAL_DELETE,
    payload: true
  };
}

export function closeModalDelete() {
  return {
    type: constants.CLOSE_CUSTOMER_MODAL_DELETE,
    payload: false
  };
}

export function setCreateCustomerData(data) {
  return {
    type: constants.SET_CREATE_CUSTOMER_DATA,
    payload: data
  };
}

export function clearCreateCustomerData() {
  return {
    type: constants.CLEAR_CREATE_CUSTOMER_DATA
  };
}

export function setDeleteCustomerData(data) {
  return {
    type: constants.SET_DELETE_CUSTOMER_DATA,
    payload: data
  };
}

export function clearDeleteCustomerData() {
  return {
    type: constants.CLEAR_DELETE_CUSTOMER_DATA
  };
}

export function setEditCustomerData(data) {
  return {
    type: constants.SET_EDIT_CUSTOMER_DATA,
    payload: data
  };
}

export function clearEditCustomerData() {
  return {
    type: constants.CLEAR_EDIT_CUSTOMER_DATA
  };
}

export function getCustomersAsync() {
  return (dispatch) => {
    return fetchWrapper('customers', getOpt('get'))
      .then(success => {
        dispatch(getCustomers(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function createCustomerAsync(data) {
  return (dispatch) => {
    return fetchWrapper('customers', getOpt('post', data))
      .then(success => {
        dispatch(createCustomer(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function editCustomerAsync(data) {
  return (dispatch) => {
    return fetchWrapper('customers/' + data.id, getOpt('put', data))
      .then(success => {
        dispatch(editCustomer(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function deleteCustomerAsync(data) {
  return (dispatch) => {
    return fetchWrapper('customers/' + data.id, getOpt('delete'))
      .then(success => {
        dispatch(deleteCustomer(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}
