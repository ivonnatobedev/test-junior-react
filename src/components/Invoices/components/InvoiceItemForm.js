import React, {PropTypes} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import {invoices} from '../../../const/formErrors';
import Select from 'react-select';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {calcTotal} from '../../../utils/calcTotal';

class InvoiceItemForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  onChangeProduct(val) {
    const { invoiceItemFormData, invoicesActions } = this.props;
    let data = val == null ? '' : val.id;
    invoicesActions.setInvoiceItemData({...invoiceItemFormData, ...{product_id: data}});
  }

  addItem() {
    const { invoiceItemFormData, invoicesActions, invoiceItemsList, invoiceFormData, productsList } = this.props;
    let newList = invoiceItemsList.slice();
    newList.push({...invoiceItemFormData, ...{state: 'new'}});
    invoicesActions.setInvoiceItemsList(newList);
    let total = calcTotal(newList, productsList);
    let dscTotal = total - invoiceFormData.discount / 100 * total;
    invoicesActions.setInvoiceData({...invoiceFormData, ...{total: dscTotal}});
    invoicesActions.clearInvoiceItemData();
  }

  render() {
    const {invoiceItemFormData, productsList} = this.props;
    return(
      <Form>
        <Row>
          <Col md={10}>
            <FormGroup controlId="product">
              <ControlLabel>{invoices.product.label}</ControlLabel>
              <Select
                isLoading={!productsList.length}
                valueKey="id"
                labelKey="name"
                onChange={this.onChangeProduct}
                value={invoiceItemFormData.product_id}
                options={productsList}
              />
            </FormGroup>
          </Col>
          <Col md={2} bsClass='col-md-2 add-invoiceItem-btn '>
            <Button onClick={this.addItem} disabled={invoiceItemFormData.product_id == ''}>
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

InvoiceItemForm.propTypes = {
  invoicesActions: PropTypes.object,
  changeInvoiceModel: PropTypes.func,
  invoiceItemFormData: PropTypes.object,
  productsList: PropTypes.array,
  invoiceItemsList: PropTypes.array,
  invoiceFormData: PropTypes.object
};

export default InvoiceItemForm;
