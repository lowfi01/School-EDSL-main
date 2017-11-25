import React from 'react';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem, Badge } from 'react-bootstrap';

class Menu extends React.Component {
    render() {
        return (

            <Navbar inverse fixedTop>
              <Navbar.Header>
                <Navbar.Brand>
                  <a>EDSL</a>
                </Navbar.Brand>
                <Navbar.Toggle/>
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={ 1 } href="/">Division Setup</NavItem>
                  <NavItem eventKey={ 2 } href="/season">Season Setup</NavItem>
                  <NavItem eventKey={ 3 } href="/table">View Table</NavItem>
                  <NavItem eventKey={ 4 } href="/round">Process Round</NavItem>
                  <NavItem eventKey={ 5 } href="/ladder">Ladder</NavItem>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={ 1 }>Admin</NavItem>
                  <NavItem eventKey={ 2 } href="/login">Login<span> </span>
                    <Badge className="badge">!</Badge>
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Menu;