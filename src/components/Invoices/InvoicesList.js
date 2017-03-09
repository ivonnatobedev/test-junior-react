import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions/invoicesActions';
import * as customersActions from '../../actions/customersActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {InvoicesListItem, InvoicesDelete} from './components'
import Table from 'react-bootstrap/lib/Table';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router';
import {routes} from '../../const/routes';


class InvoicesList extends Component {
  constructor(props, context) {
    super(props, context);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const { invoicesActions, invoicesList, customersList, customersActions } = this.props;
    if(!invoicesList.length) {
      invoicesActions.getInvoicesAsync();
    }
    if(!customersList.length) {
      customersActions.getCustomersAsync();
    }

  }

  toggleModalDelete(data) {
    const { invoicesActions, showModalDelete } = this.props;
    if(showModalDelete) {
      invoicesActions.closeModalDelete();
      invoicesActions.clearInvoiceData();
    } else {
      invoicesActions.showModalDelete();
      invoicesActions.setInvoiceData(data);
    }
  }

  onDelete() {
    const { invoicesActions, formData } = this.props;
    invoicesActions.deleteInvoiceAsync(formData)
      .then(() => {
        this.toggleModalDelete(formData);
      })
      .catch(e => {
        console.log(e);
        this.toggleModalDelete(formData);
      })
  }

  render() {
    const { invoicesList, customersList, showModalDelete, formData } = this.props;
    return (
      <div>
        <PageHeader>
          Invoices list
          <Link to={routes.invoices.home + '/' + routes.invoices.new}><Button>Create</Button></Link>
        </PageHeader>
        <Table striped condensed hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            invoicesList.map((item, key) => {
              return(
                <InvoicesListItem
                  key={item.id}
                  index={key+1}
                  item={item}
                  customersList={customersList}
                  toggleModalDelete={this.toggleModalDelete}/>
              );
            })
          }
          </tbody>
        </Table>
        <InvoicesDelete
          showModal={showModalDelete}
          toggleModal={this.toggleModalDelete}
          item={formData}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    invoicesList: state.invoices.invoicesList,
    showModalDelete: state.invoices.showModalDelete,
    formData: state.invoices.invoiceFormData,
    customersList: state.customers.customersList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    invoicesActions: bindActionCreators(actions, dispatch),
    customersActions: bindActionCreators(customersActions, dispatch)
  }
}


InvoicesList.PropTypes = {
  invoicesActions: PropTypes.object,
  invoicesList: PropTypes.array,
  showModalDelete: PropTypes.bool,
  formData: PropTypes.object,
  customersList: PropTypes.array,
  customersActions: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoicesList);