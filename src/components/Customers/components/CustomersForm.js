import React, {PropTypes} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import {types, customers} from '../../../const/formErrors';


class CustomersForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateAddress = this.validateAddress.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
  }

  validateName() {
    const { item } = this.props;
    if(item.name.length == 0) {
      return types.normal;
    } else if(item.name.length >= 5 && item.name.length < 11) {
      return types.success;
    } else {
      return types.error;
    }
  }

  validateAddress() {
    const { item } = this.props;
    if(item.address.length == 0) {
      return types.normal;
    } else if(item.address.length >= 10 && item.address.length < 16) {
      return types.success;
    } else {
      return types.error;
    }
  }

  validatePhone() {
    const { item } = this.props;
    let reg = /^[0-9]{10}$/;
    if(item.phone.length < 1) {
      return types.normal;
    }
    let result = reg.test(item.phone);
    if(result) {
      return types.success;
    } else {
      return types.error;
    }
  }

  onChangeName(e) {
    const { item, changeModel } = this.props;
    let data = e.target.value == null ? '' : e.target.value;
    changeModel({...item, ...{name: data}});
  }

  onChangeAddress(e) {
    const { item, changeModel } = this.props;
    let data = e.target.value == null ? '' : e.target.value;
    changeModel({...item, ...{address: data}});
  }

  onChangePhone(e) {
    const { item, changeModel } = this.props;
    let data = e.target.value == null ? '' : e.target.value;
    changeModel({...item, ...{phone: data}});
  }

  render() {
    const { item } = this.props;
    return(
      <Form>

        <FormGroup controlId="name" validationState={this.validateName()}>
          <ControlLabel>{customers.name.label}</ControlLabel>
          <FormControl
            type="text"
            value={item.name}
            placeholder={customers.name.placeHolder}
            onChange={this.onChangeName}
          />
          <FormControl.Feedback />
          <HelpBlock>{customers.name.helpBlock}</HelpBlock>
        </FormGroup>

        <FormGroup controlId="address" validationState={this.validateAddress()}>
          <ControlLabel>{customers.address.label}</ControlLabel>
          <FormControl
            type="text"
            value={item.address}
            placeholder={customers.address.placeHolder}
            onChange={this.onChangeAddress}
          />
          <FormControl.Feedback />
          <HelpBlock>{customers.address.helpBlock}</HelpBlock>
        </FormGroup>

        <FormGroup controlId="phone" validationState={this.validatePhone()}>
          <ControlLabel>{customers.phone.label}</ControlLabel>
          <FormControl
            type="text"
            value={item.phone}
            placeholder={customers.phone.placeHolder}
            onChange={this.onChangePhone}
          />
          <FormControl.Feedback />
          <HelpBlock>{customers.phone.helpBlock}</HelpBlock>
        </FormGroup>

      </Form>
    );
  }
}

CustomersForm.propTypes = {
  item: PropTypes.object,
  changeModel: PropTypes.func
};

export default CustomersForm;
