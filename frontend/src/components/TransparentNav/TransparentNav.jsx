import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavbarBrand, NavbarToggler
    , Collapse, NavLink, Button, InputGroup, InputGroupAddon, Input} from 'reactstrap';

import './TransparentNav.css';

class TransparentNav extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isTinted: props.isTinted,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        let navClassName = 'toTheTop navbar navbar-expand-lg navbar-dark sticky-top';
        if(this.state.isTinted) {
            navClassName += ' tintNav'
        }else{
            navClassName += 'transparentNav';
        }


        return (
            <Navbar className={navClassName}>
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

                <InputGroup className={"nav-search"}>
                    <Input placeholder="Keywords" />
                    <Link to={'/search?isMatchAll=1&keywords=park'}>
                        <InputGroupAddon addonType="append">

                            <Button color="secondary">Search</Button>

                    </InputGroupAddon>
                    </Link>
                </InputGroup>
            </Navbar>
        )
    }
}

export default TransparentNav;