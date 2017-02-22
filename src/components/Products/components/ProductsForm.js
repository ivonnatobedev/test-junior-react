import React, {PropTypes} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import {types, products} from '../../../const/formErrors';


class ProductsForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validatePrice = this.validatePrice.bind(this);
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

  validatePrice() {
    const { item } = this.props;
    if(item.price.length == 0) {
      return types.normal;
    } else if(!isNaN(item.price) && parseInt(item.price) > 0) {
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

  onChangePrice(e) {
    const { item, changeModel } = this.props;
    let data = e.target.value == null ? '' : e.target.value;
    changeModel({...item, ...{price: data}});
  }

  render() {
    const { item } = this.props;
    return(
      <Form>
        <FormGroup controlId="name" validationState={this.validateName()}>
          <ControlLabel>{products.name.label}</ControlLabel>
          <FormControl
            type="text"
            value={item.name}
            placeholder={products.name.placeHolder}
            onChange={this.onChangeName}
          />
          <FormControl.Feedback />
          <HelpBlock>{products.name.helpBlock}</HelpBlock>
        </FormGroup>

        <FormGroup controlId="price" validationState={this.validatePrice()}>
          <ControlLabel>{products.price.label}</ControlLabel>
          <FormControl
            type="text"
            value={item.price}
            placeholder={products.price.placeHolder}
            onChange={this.onChangePrice}
          />
          <FormControl.Feedback />
          <HelpBlock>{products.price.helpBlock}</HelpBlock>
        </FormGroup>
      </Form>
    );
  }
}

ProductsForm.propTypes = {
  item: PropTypes.object,
  changeModel: PropTypes.func
};

export default ProductsForm;
