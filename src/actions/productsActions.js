import * as constants from '../const/actionTypes';
import {fetchWrapper, getOpt} from '../utils/actionsHelper';

function getProducts(data) {
  return {
    type: constants.GET_PRODUCTS,
    payload: data
  };
}

function createProduct(data) {
  return {
    type: constants.CREATE_PRODUCT,
    payload: data
  };
}

function editProduct(data) {
  return {
    type: constants.EDIT_PRODUCT,
    payload: data
  };
}

function deleteProduct(data) {
  return {
    type: constants.DELETE_PRODUCT,
    payload: data
  };
}

export function showModalNew() {
  return {
    type: constants.OPEN_PRODUCT_MODAL_NEW,
    payload: true
  };
}

export function closeModalNew() {
  return {
    type: constants.CLOSE_PRODUCT_MODAL_NEW,
    payload: false
  };
}

export function showModalEdit() {
  return {
    type: constants.OPEN_PRODUCT_MODAL_EDIT,
    payload: true
  };
}

export function closeModalEdit() {
  return {
    type: constants.CLOSE_PRODUCT_MODAL_EDIT,
    payload: false
  };
}

export function showModalDelete() {
  return {
    type: constants.OPEN_PRODUCT_MODAL_DELETE,
    payload: true
  };
}

export function closeModalDelete() {
  return {
    type: constants.CLOSE_PRODUCT_MODAL_DELETE,
    payload: false
  };
}

export function setCreateProductData(data) {
  return {
    type: constants.SET_CREATE_PRODUCT_DATA,
    payload: data
  };
}

export function clearCreateProductData() {
  return {
    type: constants.CLEAR_CREATE_PRODUCT_DATA
  };
}

export function setDeleteProductData(data) {
  return {
    type: constants.SET_DELETE_PRODUCT_DATA,
    payload: data
  };
}

export function clearDeleteProductData() {
  return {
    type: constants.CLEAR_DELETE_PRODUCT_DATA
  };
}

export function setEditProductData(data) {
  return {
    type: constants.SET_EDIT_PRODUCT_DATA,
    payload: data
  };
}

export function clearEditProductData() {
  return {
    type: constants.CLEAR_EDIT_PRODUCT_DATA
  };
}

export function getProductsAsync() {
  return (dispatch) => {
    return fetchWrapper('products', getOpt('get'))
      .then(success => {
        dispatch(getProducts(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function createProductAsync(data) {
  return (dispatch) => {
    return fetchWrapper('products', getOpt('post', data))
      .then(success => {
        dispatch(createProduct(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function editProductAsync(data) {
  return (dispatch) => {
    return fetchWrapper('products/' + data.id, getOpt('put', data))
      .then(success => {
        dispatch(editProduct(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function deleteProductAsync(data) {
  return (dispatch) => {
    return fetchWrapper('products/' + data.id, getOpt('delete'))
      .then(success => {
        dispatch(deleteProduct(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}
