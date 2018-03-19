import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse, NavLink} from 'reactstrap';

import './TransparentNav.css';

export default class TransparentNav extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        return (
            <Navbar className={'toTheTop transparentNav navbar navbar-expand-lg navbar-dark sticky-top'}>
                <NavbarBrand href="/" className={'navbar-brand'}>Parkd.US</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />

                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className={'navbar-item'}>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem className={'navbar-item'}>
                            <NavLink href="/about">About</NavLink>
                        </NavItem>
                        <NavItem className={'navbar-item'}>
                            <NavLink href="/photos">Photos</NavLink>
                        </NavItem>
                        <NavItem className={'navbar-item'}>
                            <NavLink href="/trucks">Trucks</NavLink>
                        </NavItem>
                        <NavItem className={'navbar-item'}>
                            <NavLink href="/parks">Parks</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}
