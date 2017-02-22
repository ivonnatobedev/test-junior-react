import React, { Component, PropTypes } from 'react';

class NotFoundPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        404: page not found :(
      </div>
    );
  }
}

export default NotFoundPage;