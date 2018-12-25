import './styles/toast.scss';

import React from 'react';
import ReactModal from 'react-modal';

import storeActions from '../modules/store-actions';

let inStyles = {
    overlay : {
        top: 'auto',
        backgroundColor : 'transparent',
        zIndex: 10000,
    },
    content : {
        top : 'auto',
        left : 'auto',
        right: 'auto',
        bottom: '0',
        width: '100%',
        textAlign: 'center',
        backgroundColor : 'transparent',
        border: 'none',
        marginBottom: '30%',
        boxSizing: 'border-box',
        fontSize: '13px',
        animation: 'scale-in .3s'
    }
};

let outStyles = {
    overlay : {
        top: 'auto',
        backgroundColor : 'transparent',
        zIndex: 10,
    },
    content : {
        top : 'auto',
        left : 'auto',
        right: 'auto',
        bottom: '0',
        width: '100%',
        textAlign: 'center',
        backgroundColor : 'transparent',
        border: 'none',
        marginBottom: '30%',
        fontSize: '13px',
        boxSizing: 'border-box',
        animation: 'scale-out .3s'
    }
};
let toastTimeout = null;

/**
 *  渲染Toast
 *  需要把父组件的this传入并设置相应的展示状态
 */
export default class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    toast = (toastText, toastState = true) => {
        //立即隐藏toast
        if(!toastState) {
            toastTimeout && window.clearTimeout(toastTimeout);
            this.setState({
                show: false
            });
            return;
        }
        if(!toastText) {
            return;
        }
        this.setState({
            toastText: toastText,
            show: true
        });
        //如果toast状态为展示中,清除倒计时并重新执行
        toastTimeout && window.clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            this.setState({
                show: false
            });
        }, 3000);
    }

    componentWillMount() {
        if (typeof window !== 'undefined') {
            ReactModal.setAppElement(window.document.body);
        }
    }

    componentDidMount() {
        storeActions.toast.add(this.toast);
    }

    render() {
        return (
            <ReactModal
                isOpen={this.state.show}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.onRequestClose}
                closeTimeoutMS={280}
                style={this.state.show ? inStyles : outStyles}
                contentLabel="Loading"
                portalClassName="ReactModalPortalToast"
                shouldCloseOnOverlayClick={true}
                >
                <p style={{
                    display: 'inline-block',
                    color: 'white',
                    background: 'rgba(0, 0, 0, 0.75)',
                    borderRadius: 16,
                    padding: '4px 16px'
                    }}>{this.state.toastText}</p>
            </ReactModal>
        );
    }
}