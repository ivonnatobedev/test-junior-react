import * as constants from '../const/actionTypes';
import {fetchWrapper, getOpt} from '../utils/actionsHelper';
import {API_ENDPOINT} from '../const/system';

//  INVOICES

function getInvoices(data) {
  return {
    type: constants.GET_INVOICES,
    payload: data
  };
}

function createInvoice(data) {
  return {
    type: constants.CREATE_INVOICE,
    payload: data
  };
}

function editInvoice(data) {
  return {
    type: constants.EDIT_INVOICE,
    payload: data
  };
}

function deleteInvoice(data) {
  return {
    type: constants.DELETE_INVOICE,
    payload: data
  };
}

export function showModalDelete() {
  return {
    type: constants.OPEN_INVOICE_MODAL_DELETE,
    payload: true
  };
}

export function closeModalDelete() {
  return {
    type: constants.CLOSE_INVOICE_MODAL_DELETE,
    payload: false
  };
}

export function setInvoiceData(data) {
  return {
    type: constants.SET_INVOICE_DATA,
    payload: data
  };
}

export function clearInvoiceData() {
  return {
    type: constants.CLEAR_INVOICE_DATA
  };
}

export function getInvoicesAsync() {
  return (dispatch) => {
    return fetchWrapper('invoices', getOpt('get'))
      .then(success => {
        dispatch(getInvoices(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function getInvoiceAsync(id) {
  return (dispatch) => {
    return fetchWrapper('invoices/' + id, getOpt('get'))
      .then(success => {
        dispatch(setInvoiceData(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function createInvoiceAsync(data) {
  return (dispatch) => {
    return fetchWrapper('invoices', getOpt('post', data))
      .then(success => {
        dispatch(createInvoice(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function editInvoiceAsync(invoiceForm, invoiceItems, itemsToDelete) {
  return (dispatch) => {
    let promises = [];
    promises.push(fetch(API_ENDPOINT + 'invoices/' + invoiceForm.id, getOpt('put', invoiceForm)));

    if(itemsToDelete.length) {
      itemsToDelete.map(item => {
        promises.push(fetch(API_ENDPOINT + 'invoices/' + invoiceForm.id + '/items/' + item.id, getOpt('delete')));
      });
    }

    let itemsToCreate = invoiceItems.filter(item => {
      if(item.state == 'new') return true;
      return false;
    });
    if(itemsToCreate.length) {
      itemsToCreate.map(item => {
        promises.push(fetch(API_ENDPOINT + 'invoices/' + invoiceForm.id + '/items', getOpt('post', item)));
      });
    }

    let itemsToEdit = invoiceItems.filter(item => {
      if(item.state == 'changed') return true;
      return false;
    });
    if(itemsToEdit.length) {
      itemsToEdit.map(item => {
        promises.push(fetch(API_ENDPOINT + 'invoices/' + invoiceForm.id + '/items/' + item.id, getOpt('put', item)));
      })
    }

    return Promise.all(promises)
      .then(responses => {
        return Promise.all(responses.map(response => {
          if(response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
          } else if(response === false) {
            return Promise.resolve(response);
          } else {
            return Promise.reject(response);
          }
        }))
          .then(success => {
            return success;
          });
      })
      .then(jsonResponses => {
        return Promise.all(jsonResponses.map(response => response.json ? response.json() : Promise.resolve(response)))
          .then(success => {
            return success;
          });
      })
      .then(result => {
        dispatch(editInvoice(result[0]));
        return result;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function deleteInvoiceAsync(data) {
  return (dispatch) => {
    return fetchWrapper('invoices/' + data.id, getOpt('delete'))
      .then(success => {
        dispatch(deleteInvoice(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

//  ITEMS

export function setInvoiceItemsList(data) {
  return {
    type: constants.SET_INVOICE_ITEMS_LIST,
    payload: data
  };
}

export function clearInvoiceItemsList() {
  return {
    type: constants.CLEAR_INVOICE_ITEMS_LIST
  };
}

export function setInvoiceItemData(data) {
  return {
    type: constants.SET_INVOICE_ITEM_DATA,
    payload: data
  };
}

export function clearInvoiceItemData() {
  return {
    type: constants.CLEAR_INVOICE_ITEM_DATA
  };
}

export function setDeleteInvoiceItems(data) {
  return {
    type: constants.SET_INVOICE_ITEMS_TO_DELETE,
    payload: data
  }
}

export function clearDeleteInvoiceItems() {
  return {
    type: constants.CLEAR_INVOICE_ITEMS_TO_DELETE
  }
}

export function getInvoiceItemsListAsync(id) {
  return (dispatch) => {
    return fetchWrapper('invoices/' + id + '/items', getOpt('get'))
      .then(success => {
        dispatch(setInvoiceItemsList(success));
        return success;
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function createInvoiceItemsAsync(data) {
    return () => {
      let itemPromises = data.map(item => {
        let url = 'invoices/' + item.invoice_id + '/items';
        return fetch(API_ENDPOINT + url, getOpt('post', item));
      });

      return Promise.all(itemPromises)
        .then(responses => {
          return Promise.all(responses.map(response => {
            if(response.status >= 200 && response.status < 300) {
              return Promise.resolve(response);
            } else if(response === false) {
              return Promise.resolve(response);
            } else {
              return Promise.reject(response);
            }
          }))
            .then(success => {
              return success;
            });
        })
        .then(jsonResponses => {
          return Promise.all(jsonResponses.map(response => response.json ? response.json() : Promise.resolve(response)))
            .then(success => {
              return success;
            });
        })
        .then(result => {
          return result;
        })
        .catch(e => {
          console.log(e);
        });
    };

}
