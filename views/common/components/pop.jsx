import React from 'react';

import './styles/pop.scss';

import ReactModal from 'react-modal';

let inStyles = {
    overlay : {
        backgroundColor : 'rgba(0, 0, 0, 0.2)',
        zIndex: 9999,
        animation: 'pop-fade-in 1s'
    },
    content : {
        top : 'auto',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: 0,
        padding: 0,
        border: 'none',
        borderRadius: 0,
        backgroundColor: 'transparent',
        WebkitBoxSizing: 'border-box',
        animation: 'pop-in .3s'
    }
};

let outStyles = {
    overlay : {
        backgroundColor : 'rgba(0, 0, 0, 0.2)',
        zIndex: 9,
        animation: 'pop-fade-out .3s'
    },
    content : {
        top : 'auto',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: 0,
        padding: 0,
        border: 'none',
        borderRadius: 0,
        backgroundColor: 'transparent',
        WebkitBoxSizing: 'border-box',
        animation: 'pop-out .3s'
    }
};

export default class Pop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        };

        this.onRequestClose = this.onRequestClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen
        });
        return true;
    }

    componentWillMount() {
        if (typeof window !== 'undefined') {
            ReactModal.setAppElement(window.document.body);
        }
    }

    onRequestClose() {
        this.setState({
            isOpen: false
        });
        this.props.onClose && this.props.onClose();
    }
    
    render() {
        return (
            <ReactModal
                isOpen={this.state.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.onRequestClose}
                closeTimeoutMS={280}
                style={this.state.isOpen ? inStyles : outStyles}
                contentLabel="Pop"
                portalClassName="ReactModalPortalPop"
                >
                {this.props.children}
            </ReactModal>
        );
    }
}
