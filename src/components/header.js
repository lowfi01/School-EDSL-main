import React from 'react';
import {
    Nav,
    NavItem,
    Navbar,
    NavDropdown,
    MenuItem,
    Badge
} from 'react-bootstrap';

class Menu extends React.Component {
    render() {
        return (

                <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">ESL-Main</a> 
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/season">Season Setup</NavItem>
                        <NavItem eventKey={2} href="/contacts">Contact Us</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} >Admin</NavItem>
                        <NavItem eventKey={2} href="/login">Login<span> </span>
                        <Badge className="badge">!</Badge>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Menu;