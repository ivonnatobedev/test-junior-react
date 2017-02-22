import React, { Component, PropTypes } from 'react';
import * as actions from '../../actions/productsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {ProductsListItem, ProductsDelete, ProductsNew, ProductsEdit} from './components'
import Table from 'react-bootstrap/lib/Table';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';


class ProductsList extends Component {
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
    const { productsActions } = this.props;
    productsActions.getProductsAsync()
  }

  toggleModalNew() {
    const { productsActions, showModalNew } = this.props;
    if(showModalNew) {
      productsActions.closeModalNew();
    } else {
      productsActions.showModalNew();
    }
  }

  toggleModalDelete(data) {
    const { productsActions, showModalDelete } = this.props;
    if(showModalDelete) {
      productsActions.closeModalDelete();
      productsActions.clearDeleteProductData();
    } else {
      productsActions.showModalDelete();
      productsActions.setDeleteProductData(data);
    }
  }

  toggleModalEdit(data) {
    const { productsActions, showModalEdit } = this.props;
    if(showModalEdit) {
      productsActions.closeModalEdit();
      productsActions.clearEditProductData();
    } else {
      productsActions.showModalEdit();
      productsActions.setEditProductData(data);
    }
  }

  onCreate() {
    const { productsActions, formData } = this.props;
    productsActions.createProductAsync(formData)
      .then(() => {
        this.toggleModalNew();
        productsActions.clearCreateProductData();
      })
      .catch(e => {
        console.log(e);
        productsActions.clearCreateProductData();
      })
  }

  onEdit() {
    const { productsActions, formData } = this.props;
    productsActions.editProductAsync(formData)
      .then(() => {
        this.toggleModalEdit();
        productsActions.clearEditProductData();
      })
      .catch(e => {
        console.log(e);
        productsActions.clearEditProductData();
      })
  }

  onDelete() {
    const { productsActions, formData } = this.props;
    productsActions.deleteProductAsync(formData)
      .then(() => {
        this.toggleModalDelete(formData);
      })
      .catch(e => {
        console.log(e);
        this.toggleModalDelete(formData);
      })
  }

  render() {
    const { productsList, showModalNew, formData, productsActions, showModalDelete, showModalEdit } = this.props;
    return (
      <div>
        <PageHeader>
          Product list
          <Button onClick={this.toggleModalNew}>
            Create
          </Button>
        </PageHeader>
        <Table striped condensed hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            productsList.map((item, key) => {
              return(
                <ProductsListItem
                  key={key}
                  index={key+1}
                  item={item}
                  onShowModalDelete={this.toggleModalDelete}
                  onShowModalEdit={this.toggleModalEdit}
                />
              );
            })
          }
          </tbody>
        </Table>
        <ProductsNew
          showModal={showModalNew}
          toggleModal={this.toggleModalNew}
          item={formData}
          onCreate={this.onCreate}
          changeModel={productsActions.setCreateProductData}
        />
        <ProductsDelete
          showModal={showModalDelete}
          toggleModal={this.toggleModalDelete}
          item={formData}
          onDelete={this.onDelete}
        />
        <ProductsEdit
          showModal={showModalEdit}
          toggleModal={this.toggleModalEdit}
          item={formData}
          onEdit={this.onEdit}
          changeModel={productsActions.setEditProductData}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productsList: state.products.productsList,
    showModalNew: state.products.showModalNew,
    showModalEdit: state.products.showModalEdit,
    showModalDelete: state.products.showModalDelete,
    formData: state.products.formData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    productsActions: bindActionCreators(actions, dispatch)
  }
}


ProductsList.PropTypes = {
  productsActions: PropTypes.obj,
  productsList: PropTypes.array,
  showModalNew: PropTypes.bool,
  showModalEdit: PropTypes.bool,
  showModalDelete: PropTypes.bool,
  formData: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);