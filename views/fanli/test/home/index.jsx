import {isNode} from './../../../common/modules/consts';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    AppContainer
} from 'react-hot-loader';


import App from './components/app';
if (isNode) {
    module.exports = App;
} else {
    //通过服务端注入的全局变量得到初始 state
    const initialState = window.__INITIAL_STATE__;
    
    ReactDOM.hydrate(
        <AppContainer>
            <App data={initialState} />
        </AppContainer>,
        document.getElementById('react-html-container')
    );
    if (module.hot) {
        module.hot.accept('./components/app', () => {
            require('./components/app');
            ReactDOM.hydrate(
                <AppContainer>
                    <App data={initialState}/>
                </AppContainer>,
                document.getElementById('react-html-container')
            );
        });
    }
}