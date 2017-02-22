import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions/customersActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {CustomersListItem, CustomersNew, CustomersDelete, CustomersEdit} from './components'
import Table from 'react-bootstrap/lib/Table';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';


class CustomersList extends Component {
  constructor(props, context) {
    super(props, context);
    this.toggleModalNew = this.toggleModalNew.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.toggleModalEdit = this.toggleModalEdit.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentWillMount() {
    const { customersActions } = this.props;
    customersActions.getCustomersAsync()
  }

  toggleModalNew() {
    const { customersActions, showModalNew } = this.props;
    if(showModalNew) {
      customersActions.closeModalNew();
    } else {
      customersActions.showModalNew();
    }
  }

  toggleModalDelete(data) {
    const { customersActions, showModalDelete } = this.props;
    if(showModalDelete) {
      customersActions.closeModalDelete();
      customersActions.clearDeleteCustomerData();
    } else {
      customersActions.showModalDelete();
      customersActions.setDeleteCustomerData(data);
    }
  }

  toggleModalEdit(data) {
    const { customersActions, showModalEdit } = this.props;
    if(showModalEdit) {
      customersActions.closeModalEdit();
      customersActions.clearEditCustomerData();
    } else {
      customersActions.showModalEdit();
      customersActions.setEditCustomerData(data);
    }
  }

  onCreate() {
    const { customersActions, formData } = this.props;
    customersActions.createCustomerAsync(formData)
      .then(() => {
        this.toggleModalNew();
        customersActions.clearCreateCustomerData();
      })
      .catch(e => {
        console.log(e);
        customersActions.clearCreateCustomerData();
      })
  }

  onEdit() {
    const { customersActions, formData } = this.props;
    customersActions.editCustomerAsync(formData)
      .then(() => {
        this.toggleModalEdit();
        customersActions.clearEditCustomerData();
      })
      .catch(e => {
        console.log(e);
        customersActions.clearEditCustomerData();
      })
  }

  onDelete() {
    const { customersActions, formData } = this.props;
    customersActions.deleteCustomerAsync(formData)
      .then(() => {
        this.toggleModalDelete(formData);
      })
      .catch(e => {
        console.log(e);
        this.toggleModalDelete(formData);
      })
  }

  render() {
    const { customersList, showModalNew, formData, customersActions, showModalDelete, showModalEdit } = this.props;
    return (
      <div>
        <PageHeader>
          Customer list
            <Button onClick={this.toggleModalNew}>
              Create
            </Button>
        </PageHeader>
        <Table striped condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              customersList.map((item, key) => {
                return(
                  <CustomersListItem
                    key={key}
                    index={key + 1}
                    item={item}
                    onShowModalDelete={this.toggleModalDelete}
                    onShowModalEdit={this.toggleModalEdit}  />
                );
              })
            }
          </tbody>
        </Table>
        <CustomersNew
          showModal={showModalNew}
          toggleModal={this.toggleModalNew}
          item={formData}
          onCreate={this.onCreate}
          changeModel={customersActions.setCreateCustomerData}
        />
        <CustomersDelete
          showModal={showModalDelete}
          toggleModal={this.toggleModalDelete}
          item={formData}
          onDelete={this.onDelete}
        />
        <CustomersEdit
          showModal={showModalEdit}
          toggleModal={this.toggleModalEdit}
          item={formData}
          onEdit={this.onEdit}
          changeModel={customersActions.setEditCustomerData}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    customersList: state.customers.customersList,
    showModalNew: state.customers.showModalNew,
    showModalEdit: state.customers.showModalEdit,
    showModalDelete: state.customers.showModalDelete,
    formData: state.customers.formData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    customersActions: bindActionCreators(actions, dispatch)
  }
}


CustomersList.PropTypes = {
  customersActions: PropTypes.obj,
  customersList: PropTypes.array,
  showModalNew: PropTypes.bool,
  showModalEdit: PropTypes.bool,
  showModalDelete: PropTypes.bool,
  formData: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomersList);