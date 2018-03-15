import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';


import './TransparentNav.css';

export default class TransparentNav extends Component{
    render(){
        return (
            <Navbar className={'toTheTop transparentNav navbar navbar-expand-lg navbar-dark sticky-top'}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link className={'navbar-brand'} to="/">Parkd.US</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle className={'navbar-toggle'}/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <IndexLinkContainer to="/">
                            <NavItem className={'navbar-item'} eventKey={1}>Home</NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to="/about">
                            <NavItem className={'navbar-item'} eventKey={2}>About</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
