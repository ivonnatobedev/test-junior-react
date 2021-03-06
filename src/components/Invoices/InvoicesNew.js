import React, { Component, PropTypes } from 'react';
import * as invoiceActions from '../../actions/invoicesActions';
import * as customersActions from '../../actions/customersActions';
import * as productsActions from '../../actions/productsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router';
import {routes} from '../../const/routes';
import {InvoicesForm, InvoiceItemForm, InvoiceItemsListItem} from './components';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';

class InvoicesNew extends Component {
  constructor(props, context) {
    super(props, context);
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    const { customersList, customersActions, productsList, productsActions } = this.props;
    if(!customersList.length) {
      customersActions.getCustomersAsync();
    }
    if(!productsList.length) {
      productsActions.getProductsAsync();
    }
  }

  componentWillUnmount() {
    const { invoicesActions } = this.props;
    invoicesActions.clearInvoiceData();
    invoicesActions.clearInvoiceItemsList();
    invoicesActions.clearInvoiceItemData();
  }

  onCreate() {
    const { invoiceFormData, invoicesActions, invoiceItemsList, router } = this.props;
    invoicesActions.createInvoiceAsync(invoiceFormData)
      .then(success => {
        if(invoiceItemsList.length > 0) {
          let itemsList = invoiceItemsList.map(item => {
            return {...item, ...{invoice_id: success.id}}
          });
          invoicesActions.createInvoiceItemsAsync(itemsList)
            .then(() => {
              router.push('/' + routes.invoices.home);
            })
            .catch(e => {
              console.log(e);
              router.push('/' + routes.invoices.home);
            })
        } else {
          router.push('/' + routes.invoices.home);
        }
      })
      .catch(e => {
        console.log(e);
        router.push('/' + routes.invoices.home);
      });
  }

  render() {
    const { invoiceFormData, invoicesActions, customersList, invoiceItemFormData, productsList, invoiceItemsList } = this.props;
    return (
      <div>
        <PageHeader>
          Create new invoice
        </PageHeader>

        <Row>
          <Col md={4}>
            <InvoicesForm
              invoiceFormData={invoiceFormData}
              invoicesActions={invoicesActions}
              customersList={customersList}
              invoiceItemsList={invoiceItemsList}
              productsList={productsList}
            />
            <InvoiceItemForm
              invoiceItemsList={invoiceItemsList}
              invoiceItemFormData={invoiceItemFormData}
              invoicesActions={invoicesActions}
              productsList={productsList}
              invoiceFormData={invoiceFormData}
            />
          </Col>
        </Row>

        <Table striped condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            invoiceItemsList.map((item, key) => {
              return (
                <InvoiceItemsListItem
                  key={key}
                  item={item}
                  index={key}
                  invoiceItemFormData={invoiceItemFormData}
                  invoicesActions={invoicesActions}
                  invoiceFormData={invoiceFormData}
                  productsList={productsList}
                  invoiceItemsList={invoiceItemsList}
                />
              );
            })
          }
          </tbody>
        </Table>
        <PageHeader>
          {'Total: ' + parseFloat(invoiceFormData.total).toFixed(3)}
        </PageHeader>
        <ButtonToolbar>
          <Link to={'/' + routes.invoices.home}>
            <Button>
              Cancel
            </Button>
          </Link>
          <Button onClick={this.onCreate}>
            Create
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    invoiceFormData: state.invoices.invoiceFormData,
    customersList: state.customers.customersList,
    productsList: state.products.productsList,
    invoiceItemsList: state.invoices.invoiceItemsList,
    invoiceItemFormData: state.invoices.invoiceItemFormData,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    invoicesActions: bindActionCreators(invoiceActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
    customersActions: bindActionCreators(customersActions, dispatch)
  }
}


InvoicesNew.PropTypes = {
  invoicesActions: PropTypes.object,
  invoicesList: PropTypes.array,
  showModalDelete: PropTypes.bool,
  invoiceFormData: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoicesNew);