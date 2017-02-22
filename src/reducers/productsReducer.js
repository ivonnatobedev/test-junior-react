import * as types from '../const/actionTypes';

const initialState = {
  productsList: [],
  showModalNew: false,
  showModalEdit: false,
  showModalDelete: false,
  formData: {
    id: '',
    name: '',
    price: ''
  }
};

export default function products(state = initialState, action) {
  switch (action.type) {

    case types.GET_PRODUCTS:
      return {
        ...state,
        ...{
          productsList: action.payload
        }
      };

    case types.CREATE_PRODUCT:
      let newProduct = action.payload;
      let newList = state.productsList.slice();
      newList.push(newProduct);
      return {
        ...state,
        ...{
          productsList: newList
        }
      };

    case types.EDIT_PRODUCT:
      let editProduct = action.payload;
      let editList = state.productsList.map(item => {
        if(item.id == editProduct.id) {
          return editProduct;
        }
        return item;
      });
      return {
        ...state,
        ...{
          productsList: editList
        }
      };

    case types.DELETE_PRODUCT:
      let deleteProduct = action.payload;
      let deleteList = state.productsList.filter(item => {
        if(item.id == deleteProduct.id) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        ...{
          productsList: deleteList
        }
      };

    case types.OPEN_PRODUCT_MODAL_NEW:
      return {
        ...state,
        ...{
          showModalNew: action.payload
        }
      };

    case types.CLOSE_PRODUCT_MODAL_NEW:
      return {
        ...state,
        ...{
          showModalNew: action.payload
        }
      };

    case types.OPEN_PRODUCT_MODAL_EDIT:
      return {
        ...state,
        ...{
          showModalEdit: action.payload
        }
      };

    case types.CLOSE_PRODUCT_MODAL_EDIT:
      return {
        ...state,
        ...{
          showModalEdit: action.payload
        }
      };

    case types.OPEN_PRODUCT_MODAL_DELETE:
      return {
        ...state,
        ...{
          showModalDelete: action.payload
        }
      };

    case types.CLOSE_PRODUCT_MODAL_DELETE:
      return {
        ...state,
        ...{
          showModalDelete: action.payload
        }
      };

    case types.SET_CREATE_PRODUCT_DATA:
      return {
        ...state,
        ...{
          formData: action.payload
        }
      };

    case types.CLEAR_CREATE_PRODUCT_DATA:
      return {
        ...state,
        ...{
          formData: {
            id: '',
            name: '',
            price: ''
          }
        }
      };

    case types.SET_EDIT_PRODUCT_DATA:
      return {
        ...state,
        ...{
          formData: action.payload
        }
      };

    case types.CLEAR_EDIT_PRODUCT_DATA:
      return {
        ...state,
        ...{
          formData: {
            id: '',
            name: '',
            price: ''
          }
        }
      };

    case types.SET_DELETE_PRODUCT_DATA:
      return {
        ...state,
        ...{
          formData: action.payload
        }
      };

    case types.CLEAR_DELETE_PRODUCT_DATA:
      return {
        ...state,
        ...{
          formData: {
            id: '',
            name: '',
            price: ''
          }
        }
      };

    default:
      return state;
  }
}
