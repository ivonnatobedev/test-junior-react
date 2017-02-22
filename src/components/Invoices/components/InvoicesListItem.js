import React, {PropTypes} from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router';
import {routes} from '../../../const/routes';

class InvoicesListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { item, index, customersList, toggleModalDelete } = this.props;
    let customer = customersList.find(cust => cust.id == item.customer_id);
    return(
      <tr>
        <td>{index}</td>
        <td>{customer == undefined ? '' : customer.name}</td>
        <td>{item.discount + '%'}</td>
        <td>{parseFloat(item.total).toFixed(3)}</td>
        <td>
          <ButtonToolbar>
            <Link to={routes.invoices.home + '/' + item.id + '/' + routes.invoices.edit}>
              <Button bsStyle="primary" bsSize="small">
                Edit
              </Button>
            </Link>
            <Button bsStyle="danger" bsSize="small" onClick={() => {toggleModalDelete(item)}}>
              Delete
            </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }
}

InvoicesListItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  customersList: PropTypes.array,
  toggleModalDelete: PropTypes.func
};

export default InvoicesListItem;
