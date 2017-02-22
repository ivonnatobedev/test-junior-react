import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem  from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router';
import {routes} from '../../const/routes';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={routes.home}>Invoice App</Link>
            </Navbar.Brand>
          </Navbar.Header>
            <Nav>
                <NavItem href={routes.home + routes.invoices.home}>Invoices</NavItem>
                <NavItem href={routes.home + routes.products}>Products</NavItem>
                <NavItem href={routes.home + routes.customers}>Customers</NavItem>
            </Nav>
        </Navbar>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default App;