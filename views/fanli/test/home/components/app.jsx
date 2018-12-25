import React from 'react';

import storeStatics from './../../../../common/modules/store-statics';
import Env from './../../../../common/modules/env';

import './styles/app';

import Loading from './../../../../common/components/loading';
import Toast from './../../../../common/components/toast';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        Object.assign(storeStatics, {
            phead: props.data.phead,
            browser: props.data.browser,
            env: new Env(props.data.phead)
        });
    }

    render() {

        return (
            <div className="app">
                111
                <Toast />
                <Loading />
            </div>
        );
    }

}