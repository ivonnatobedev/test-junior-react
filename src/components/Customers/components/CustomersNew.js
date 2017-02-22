import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal'
import ModalHeader from 'react-bootstrap/lib/ModalHeader'
import ModalTitle from 'react-bootstrap/lib/ModalTitle'
import ModalBody from 'react-bootstrap/lib/ModalBody'
import ModalFooter from 'react-bootstrap/lib/ModalFooter'
import CustomersForm from './CustomersForm';

class CustomersNew extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {toggleModal, showModal, item, changeModel, onCreate} = this.props;
    return(
        <Modal show={showModal} onHide={toggleModal}>
          <ModalHeader closeButton>
            <ModalTitle>Create new customer</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <CustomersForm item={item} changeModel={changeModel} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={toggleModal}>
              Cancel
            </Button>
            <Button onClick={onCreate}>
              Create
            </Button>
          </ModalFooter>
        </Modal>
    );
  }
}

CustomersNew.propTypes = {
  toggleModal: PropTypes.func,
  showModal: PropTypes.bool,
  item: PropTypes.object,
  changeModel: PropTypes.func,
  onCreate: PropTypes.func
};

export default CustomersNew;
