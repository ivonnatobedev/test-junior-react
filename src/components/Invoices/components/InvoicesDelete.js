import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalTitle from 'react-bootstrap/lib/ModalTitle'
import ModalBody from 'react-bootstrap/lib/ModalBody'
import ModalFooter from 'react-bootstrap/lib/ModalFooter'

class InvoicesDelete extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {toggleModal, showModal, onDelete} = this.props;
    return(
      <Modal show={showModal} onHide={toggleModal}>
        <ModalHeader closeButton>
          <ModalTitle>Delete invoice</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {'Are you sure delete invoice?'}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal}>
            Cancel
          </Button>
          <Button onClick={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

InvoicesDelete.propTypes = {
  toggleModal: PropTypes.func,
  showModal: PropTypes.bool,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onDelete: PropTypes.func
};

export default InvoicesDelete;
