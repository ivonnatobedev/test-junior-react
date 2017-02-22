import React, {PropTypes} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import {types, invoices} from '../../../const/formErrors';
import Select from 'react-select';
import {calcTotal} from '../../../utils/calcTotal';


class InvoicesForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChangeDiscount = this.onChangeDiscount.bind(this);
    this.onChangeCustomer = this.onChangeCustomer.bind(this);
    this.validateDiscount = this.validateDiscount.bind(this);
  }

  validateDiscount() {
    const { discount } = this.props.invoiceFormData;
    if(discount.length == 0) {
      return types.normal;
    } else if(parseInt(discount) >= 0 && parseInt(discount) < 101) {
      return types.success;
    } else {
      return types.error;
    }
  }

  onChangeDiscount(e) {
    const { invoiceFormData, invoicesActions, invoiceItemsList, productsList } = this.props;
    let newDiscount = e.target.value == null ? '' : e.target.value;
    let total = calcTotal(invoiceItemsList, productsList);
    let dscTotal = total - newDiscount / 100 * total;
    invoicesActions.setInvoiceData({...invoiceFormData, ...{discount: newDiscount, total: dscTotal}});
  }

  onChangeCustomer(val) {
    const { invoiceFormData, invoicesActions } = this.props;
    let data = val == null ? '' : val.id;
    invoicesActions.setInvoiceData({...invoiceFormData, ...{customer_id: data}});
  }

  render() {
    const { invoiceFormData, customersList } = this.props;
    return(
      <Form>

        <FormGroup controlId="discount" validationState={this.validateDiscount()}>
          <ControlLabel>{invoices.discount.label}</ControlLabel>
          <FormControl
            type="number"
            value={invoiceFormData.discount}
            placeholder={invoices.discount.placeHolder}
            onChange={this.onChangeDiscount}
          />
          <FormControl.Feedback />
          <HelpBlock>{invoices.discount.helpBlock}</HelpBlock>
        </FormGroup>

        <FormGroup controlId="customer">
          <ControlLabel>{invoices.customer.label}</ControlLabel>
          <Select
            isLoading={!customersList.length}
            valueKey="id"
            labelKey="name"
            onChange={this.onChangeCustomer}
            value={invoiceFormData.customer_id}
            options={customersList}
          />
        </FormGroup>

      </Form>
    );
  }
}

InvoicesForm.propTypes = {
  invoicesActions: PropTypes.object,
  changeInvoiceModel: PropTypes.func,
  invoiceFormData: PropTypes.object,
  customersList: PropTypes.array,
  invoiceItemsList: PropTypes.array,
  productsList: PropTypes.array
};

export default InvoicesForm;
