import React, {Component} from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import './PageIndex.css';

/**
 * Customized page index. In the state, nButton specifies the maximum number
 * of buttons (indices) in the page index bar. The user need to specify the
 * on page button click handler.
 */
export default class PageIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nButton: 5,
            handleOnPageBtnClick: props.handleOnPageBtnClick,
        }
    }

    renderButtonItem(id) {
        return (
            <Button key={id} onClick={() => this.state.handleOnPageBtnClick(id)} active={this.props.page === id}>{id}</Button>
        );
    }

    /* generate button items in the reactstrap ButtonGroup */
    renderButtonGroup() {
        let buttonGroup = [];
        let nButton = this.state.nButton;

        if(this.props.nPage > nButton){
            buttonGroup.push(<Button key={0} onClick={() => this.state.handleOnPageBtnClick(1)}>{'First'}</Button>);
        }

        let startPage = 1;
        if(this.props.nPage > nButton){
            startPage = Math.max(1, this.props.page - Math.trunc(nButton/2));
        }
        let endPage = Math.min(startPage + nButton, this.props.nPage);

        for(let i=startPage; i<=endPage; i++){
            buttonGroup.push(this.renderButtonItem(i));
        }

        if(this.props.nPage > nButton){
            buttonGroup.push(<Button key={this.props.nPage+1} onClick={() => this.state.handleOnPageBtnClick(this.props.nPage)}>{'Last'}</Button>);
        }
        return buttonGroup;
    }

    /* using the reactstrap component ButtonGroup to wrap the index buttons*/
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

