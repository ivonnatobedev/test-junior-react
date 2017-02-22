import React, {PropTypes} from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import {calcTotal} from '../../../utils/calcTotal';

class InvoiceItemsListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onChangeQty(e) {
    const { invoicesActions, item, invoiceFormData, invoiceItemsList, index, productsList } = this.props;
    let data = e.target.value == null ? 0 : e.target.value;
    let newItem = '';
    if(item.id == '') {
      newItem = {...item, ...{quantity: data}};
    } else {
      newItem = {...item, ...{quantity: data, state: 'changed'}};
    }
    let newItemsList = invoiceItemsList.map((item, i) => {
      if(i == index) return newItem;
      return item;
    });
    let total = calcTotal(newItemsList, productsList);
    let dscTotal = total - invoiceFormData.discount / 100 * total;
    invoicesActions.setInvoiceData({...invoiceFormData, ...{total: dscTotal}});
    invoicesActions.setInvoiceItemsList(newItemsList);
  }

  onDelete() {
    const { invoicesActions, invoiceItemsList, index, invoiceFormData, productsList } = this.props;
    let deleted = invoiceItemsList.find((item, i) => i == index);
    if(deleted.id != '') {
      let deleteItem = invoiceItemsList[index];
      invoicesActions.setDeleteInvoiceItems(deleteItem);
    }
    let list = invoiceItemsList.filter((item, i) => {
      return i != index;
    });
    let total = calcTotal(list, productsList);
    let dscTotal = total - invoiceFormData.discount / 100 * total;
    invoicesActions.setInvoiceData({...invoiceFormData, ...{total: dscTotal}});
    invoicesActions.setInvoiceItemsList(list);
  }

  render() {
    const { productsList, item } = this.props;
    let product = productsList.find(prod => {
      return prod.id == item.product_id;
    });
    return(
      <tr>
        <td>{product.name}</td>
        <td>{product.price.toFixed(2)}</td>
        <td>
          <Form inline>
            <FormGroup>
              <FormControl
                type="number"
                value={item.quantity}
                onChange={this.onChangeQty}
              />
              <FormControl.Feedback />
            </FormGroup>
          </Form>
        </td>
        <td>
          <ButtonGroup>
            <Button bsStyle="danger" bsSize="small" onClick={this.onDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}

InvoiceItemsListItem.propTypes = {
  item: PropTypes.object,
  invoiceItemFormData: PropTypes.object,
  productsList: PropTypes.array,
  invoicesActions: PropTypes.object,
  invoiceFormData: PropTypes.object,
  invoiceItemsList: PropTypes.array,
  index: PropTypes.number
};

export default InvoiceItemsListItem;
