import React, {PropTypes} from 'react';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

class CustomersListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { item, index, onShowModalDelete, onShowModalEdit } = this.props;
    return(
      <tr>
        <td>{index}</td>
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>{item.phone}</td>
        <td>
          <ButtonGroup>
            <Button bsStyle="primary" bsSize="small" onClick={function(){return onShowModalEdit(item)}}>
              Edit
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={function(){return onShowModalDelete(item)}}>
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}

CustomersListItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  onShowModalDelete: PropTypes.func,
  onShowModalEdit: PropTypes.func
};

export default CustomersListItem;
