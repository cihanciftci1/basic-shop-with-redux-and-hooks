import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
} from 'reactstrap';
import ShowCart from '../cart/ShowCart';

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar
          color="light"
          expand="md"
          light
        >
          <NavbarBrand href="/">
            Home
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() { }} />
          <Collapse navbar className='justify-content-end'>
            <Nav navbar>
              <ShowCart/>
            </Nav>            
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
