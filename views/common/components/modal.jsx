import React from 'react';

import './styles/modal.scss';

import ReactModal from 'react-modal';

let inStyles = {
    overlay : {
        backgroundColor : 'rgba(0, 0, 0, 0.5)',
        zIndex: 10000,
        animation: 'modal-fade-in .3s'
    },
    content : {
        top : '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: 0,
        border: 'none',
        borderRadius: 0,
        backgroundColor: 'transparent',
        WebkitTransform: 'translate(-50%, -50%)',
        WebkitTransformOrigin: '0% 100%',
        WebkitBoxSizing: 'border-box',
        animation: 'modal-scale-in 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000)'
    }
};

let outStyles = {
    overlay : {
        backgroundColor : 'rgba(0, 0, 0, 0.5)',
        zIndex: 9,
        animation: 'modal-fade-out .3s'
    },
    content : {
        top : '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: 0,
        border: 'none',
        borderRadius: 0,
        backgroundColor: 'transparent',
        WebkitTransform: 'translate(-50%, -50%)',
        WebkitTransformOrigin: '0% 100%',
        WebkitBoxSizing: 'border-box',
        animation: 'modal-scale-out .3s'
    }
};

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        };

        this.onRequestClose = this.onRequestClose.bind(this);

        if (props.backgroundColor) {
            inStyles.overlay.backgroundColor = props.backgroundColor;
            outStyles.overlay.backgroundColor = props.backgroundColor;
        }
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
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        } else {
            this.setState({
                isOpen: false
            });
            this.props.onClose && this.props.onClose();
        }
    }
    
    render() {
        return (
            <ReactModal
                isOpen={this.state.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.onRequestClose}
                closeTimeoutMS={280}
                style={this.state.isOpen ? inStyles : outStyles}
                contentLabel="Modal"
                portalClassName="ReactModalPortalModal"
                >
                {this.props.children}
            </ReactModal>
        );
    }
}
