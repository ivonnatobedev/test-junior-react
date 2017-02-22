import * as types from '../const/actionTypes';

const initialState = {
  customersList: [],
  showModalNew: false,
  showModalEdit: false,
  showModalDelete: false,
  formData: {
    id: '',
    name: '',
    address: '',
    phone: ''
  }
};

export default function customers(state = initialState, action) {
  switch (action.type) {

    case types.GET_CUSTOMERS:
      return {
        ...state,
        ...{
          customersList: action.payload
        }
      };

    case types.CREATE_CUSTOMER:
      let newCustomer = action.payload;
      let newList = state.customersList.slice();
      newList.push(newCustomer);
      return {
        ...state,
        ...{
          customersList: newList
        }
      };

    case types.EDIT_CUSTOMER:
      let editCustomer = action.payload;
      let editList = state.customersList.map(item => {
        if(item.id == editCustomer.id) {
          return editCustomer;
        }
        return item;
      });
      return {
        ...state,
        ...{
          customersList: editList
        }
      };

    case types.DELETE_CUSTOMER:
      let deleteCustomer = action.payload;
      let deleteList = state.customersList.filter(item => {
        if(item.id == deleteCustomer.id) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        ...{
          customersList: deleteList
        }
      };

    case types.OPEN_CUSTOMER_MODAL_NEW:
      return {
        ...state,
        ...{
          showModalNew: action.payload
        }
      };

    case types.CLOSE_CUSTOMER_MODAL_NEW:
      return {
        ...state,
        ...{
          showModalNew: action.payload
        }
      };

    case types.OPEN_CUSTOMER_MODAL_EDIT:
      return {
        ...state,
        ...{
          showModalEdit: action.payload
        }
      };

    case types.CLOSE_CUSTOMER_MODAL_EDIT:
      return {
        ...state,
        ...{
          showModalEdit: action.payload
        }
      };

    case types.OPEN_CUSTOMER_MODAL_DELETE:
      return {
        ...state,
        ...{
          showModalDelete: action.payload
        }
      };

    case types.CLOSE_CUSTOMER_MODAL_DELETE:
      return {
        ...state,
        ...{
          showModalDelete: action.payload
        }
      };

    case types.SET_CREATE_CUSTOMER_DATA:
      return {
        ...state,
        ...{
          formData: action.payload
        }
      };

    case types.CLEAR_CREATE_CUSTOMER_DATA:
      return {
        ...state,
        ...{
          formData: {
            id: '',
            name: '',
            address: '',
            phone: ''
          }
        }
      };

    case types.SET_EDIT_CUSTOMER_DATA:
      return {
        ...state,
        ...{
          formData: action.payload
        }
      };

    case types.CLEAR_EDIT_CUSTOMER_DATA:
      return {
        ...state,
        ...{
          formData: {
            id: '',
            name: '',
            address: '',
            phone: ''
          }
        }
      };

    case types.SET_DELETE_CUSTOMER_DATA:
      return {
        ...state,
        ...{
          formData: action.payload
        }
      };

    case types.CLEAR_DELETE_CUSTOMER_DATA:
      return {
        ...state,
        ...{
          formData: {
            id: '',
            name: '',
            address: '',
            phone: ''
          }
        }
      };

    default:
      return state;
  }
}
