import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalTitle from 'react-bootstrap/lib/ModalTitle'
import ModalBody from 'react-bootstrap/lib/ModalBody'
import ModalFooter from 'react-bootstrap/lib/ModalFooter'
import ProductsForm from './ProductsForm';

class ProductsEdit extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { toggleModal, showModal, item, changeModel, onEdit } = this.props;
    return(
      <Modal show={showModal} onHide={toggleModal}>
        <ModalHeader closeButton>
          <ModalTitle>Edit product</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ProductsForm item={item} changeModel={changeModel} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal}>
            Cancel
          </Button>
          <Button onClick={onEdit}>
            Edit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ProductsEdit.propTypes = {
  toggleModal: PropTypes.func,
  showModal: PropTypes.bool,
  item: PropTypes.object,
  changeModel: PropTypes.func,
  onEdit: PropTypes.func
};

export default ProductsEdit;
