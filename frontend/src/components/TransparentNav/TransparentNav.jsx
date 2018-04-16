import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavbarBrand, NavbarToggler
    , Collapse, NavLink, Button, InputGroup, Input} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './TransparentNav.css';

class TransparentNav extends Component{
    constructor(props) {
        super(props);

        this.onMatchSelect = this.onMatchSelect.bind(this);
        this.toggleMatch = this.toggleMatch.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            inputValue: "",
            isOpen: false,
            dropMatchOpen: false,
            isTinted: props.isTinted,
            matchMethod: "OR",
            tipMatchAllOpen: true,
            tipMatchOrOpen: false,
        };
    }

    onMatchSelect(method){
        this.setState({
            matchMethod: method
        });
    }

    toggleMatch() {
        this.setState({
            dropMatchOpen: !this.state.dropMatchOpen
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render(){
        let navClassName = 'toTheTop navbar navbar-expand-lg navbar-dark sticky-top';
        if(this.state.isTinted) {
            navClassName += ' tintNav'
        }else{
            navClassName += 'transparentNav';
        }

        let keywordString = encodeURI(this.state.inputValue);

        let isMatchAll = 1;
        if(this.state.matchMethod === "OR"){
            isMatchAll = 0;
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
                    <Input value={this.state.inputValue} onChange={this.updateInputValue.bind(this)} placeholder="Keywords" />
                </InputGroup>

                <div className={"match-drop-down"}>
                    <Dropdown isOpen={this.state.dropMatchOpen} toggle={this.toggleMatch}>
                        <DropdownToggle className={"main-button"} caret>
                            {this.state.matchMethod}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => this.onMatchSelect("OR")}>OR: Match one or more keywords</DropdownItem>
                            <DropdownItem onClick={() => this.onMatchSelect("AND")}>AND: Match all the keywords</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div className={"search-button"}>
                    <Link to={'/search?isMatchAll=' + isMatchAll + '&keywords=' + keywordString}>
                        <Button onClick={() => window.location.reload()} color="secondary">Search</Button>
                    </Link>
                </div>

            </Navbar>
        )
    }
}

export default TransparentNav;