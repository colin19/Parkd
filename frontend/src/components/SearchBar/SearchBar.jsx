import React, {Component} from 'react';
import { Row, Col, Button} from 'reactstrap';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './SearchBar.css';

/**
 * Customized SearchBar which can be used as filter bar for each model
 * The user need to specify the number of "react-select" and the properties of each
 * select. The props.config is the list of configuration for each react-select,
 * each config should contain the same attributes as the attributes shown in their
 * official documentations
 */
export default class SearchBar extends Component{
    constructor(props) {
        super(props);

        this.state = {
            hasApplyButton: props.hasApplyButton,
            nSelect: props.nSelect,
            config: props.config,
            handleApplyFilterClick: props.handleApplyFilterClick,
        };
    }

    /* render different type of react-select*/
    renderSelectItem(id) {
        let config = this.props.config[id];

        if(config.createTable){
            return (
                <Col key={id}>
                    <Select.Creatable
                        multi
                        options={config.options}
                        onChange={config.handleSelect}
                        placeholder={config.placeholder}
                        value={config.value}
                    />
                </Col>
            );
        } else if(config.isMulti){
            return (
                <Col key={id}>
                    <Select
                        closeOnSelect={!config.stayOpen}
                        disabled={config.disabled}
                        multi
                        onChange={config.handleSelect}
                        placeholder={config.placeholder}
                        removeSelected={config.removeSelected}
                        rtl={config.rtl}
                        simpleValue
                        value={config.value}
                        options={config.options}
                    />
                </Col>
            );
        } else{
            return (
                <Col  key={id}>
                    <Select
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        autoFocus
                        value={config.value}
                        options={config.options}
                        simpleValue
                        clearable={true}
                        disabled={config.disabled}
                        onChange={config.handleSelect}
                        rtl={config.rtl}
                        searchable={false}
                        placeholder={config.placeholder}
                    />
                </Col>
            );
        }

    }

    renderSelects() {
        let nSelect = this.props.nSelect;
        let selects = [];

        for(let i=0; i<nSelect; i++){
            selects.push(this.renderSelectItem(i));
        }
        return selects;
    }


    render () {
        // generate the search bar with an apply button
        if(this.state.hasApplyButton){
            return (
                <div className="search-bar">
                    <Row>
                        {this.renderSelects()}
                        <Col sm={"1"} key={0}>
                            <Button color="primary" onClick={() => this.state.handleApplyFilterClick()}>Apply</Button>
                        </Col>
                    </Row>
                </div>
            );
        }else{
            // generate the search bar without an apply button
            return (
                <div className="search-bar">
                    <Row>
                        {this.renderSelects()}
                    </Row>
                </div>
            );
        }

    }
}