import * as types from '../const/actionTypes';

const initialState = {
  invoicesList: [],
  showModalDelete: false,
  invoiceFormData: {
    id: '',
    customer_id: '',
    discount: 0,
    total: ''
  },
  invoiceItemsList: [],
  itemsToDelete: [],
  invoiceItemFormData: {
    id: '',
    invoice_id: '',
    product_id: '',
    quantity: 1,
    state: ''
  }
};

export default function invoices(state = initialState, action) {
  switch (action.type) {

    case types.GET_INVOICES:
      return {
        ...state,
        ...{
          invoicesList: action.payload
        }
      };

    case types.CREATE_INVOICE:
      let newInvoice = action.payload;
      let newList = state.invoicesList.slice();
      newList.push(newInvoice);
      return {
        ...state,
        ...{
          invoicesList: newList
        }
      };

    case types.EDIT_INVOICE:
      let editInvoice = action.payload;
      let editList = state.invoicesList.map(item => {
        if(item.id == editInvoice.id) {
          return editInvoice;
        }
        return item;
      });
      return {
        ...state,
        ...{
          invoicesList: editList
        }
      };

    case types.DELETE_INVOICE:
      let deleteInvoice = action.payload;
      let deleteList = state.invoicesList.filter(item => {
        if(item.id == deleteInvoice.id) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        ...{
          invoicesList: deleteList
        }
      };

    case types.OPEN_INVOICE_MODAL_DELETE:
      return {
        ...state,
        ...{
          showModalDelete: action.payload
        }
      };

    case types.CLOSE_INVOICE_MODAL_DELETE:
      return {
        ...state,
        ...{
          showModalDelete: action.payload
        }
      };

    case types.SET_INVOICE_DATA:
      return {
        ...state,
        ...{
          invoiceFormData: action.payload
        }
      };

    case types.CLEAR_INVOICE_DATA:
      return {
        ...state,
        ...{
          invoiceFormData: {
            id: '',
            customer_id: '',
            discount: 0,
            total: ''
          }
        }
      };

    case types.SET_INVOICE_ITEMS_LIST:
      return {
        ...state,
        ...{
          invoiceItemsList: action.payload
        }
      };

    case types.CLEAR_INVOICE_ITEMS_LIST:
      return {
        ...state,
        ...{
          invoiceItemsList: []
        }
      };

    case types.SET_INVOICE_ITEM_DATA:
      return {
        ...state,
        ...{
          invoiceItemFormData: action.payload
        }
      };

    case types.CLEAR_INVOICE_ITEM_DATA:
      return {
        ...state,
        ...{
          invoiceItemFormData: {
            id: '',
            invoice_id: '',
            product_id: '',
            quantity: 1,
            state: ''
          }
        }
      };

    case types.SET_INVOICE_ITEMS_TO_DELETE:
      let delItems = state.itemsToDelete.slice();
      delItems.push(action.payload);
      return {
        ...state,
        ...{
          itemsToDelete: delItems
        }
      };

    case types.CLEAR_INVOICE_ITEMS_TO_DELETE:
      return {
        ...state,
        ...{
          itemsToDelete: []
        }
      };

    default:
      return state;
  }
}
