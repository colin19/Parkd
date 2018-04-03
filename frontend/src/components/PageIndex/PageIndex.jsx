import React, {Component} from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import './PageIndex.css';

export default class PageIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: props.page,
            nPage: props.nPage,
            handleOnPageBtnClick: props.handleOnPageBtnClick,
        }
    }

    renderButtonItem(id) {
        return (
            <Button key={id} onClick={() => this.state.handleOnPageBtnClick(id)} active={this.props.page === id}>{id}</Button>
        );
    }

    renderButtonGroup() {
        let buttonGroup = [];

        for(let i=1; i<=this.props.nPage; i++){
            buttonGroup.push(this.renderButtonItem(i));
        }
        return buttonGroup;
    }

    render() {
        return (
            <div className={'page-index'}>
                <ButtonGroup>
                    {this.renderButtonGroup()}
                </ButtonGroup>
            </div>
        );
    }

}

