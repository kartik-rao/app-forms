import 'airbnb-browser-shims';
import "antd/dist/antd.css";
import { observer } from "mobx-react";
import * as React from "react";
import './app.css';
import {Home} from "./components/partials/Home";

import { IRootStore } from "./stores/RootStore";

export interface IAppProps {
    store: IRootStore;
    authState?: string;
    authData?: any;
}

@observer
export class App extends React.Component <IAppProps, any> {
    props : IAppProps;
    _validAuthStates = ['signedIn'];

    constructor(props: IAppProps) {
        super(props);
        this.props = props;
        props.store.authStore.setAuthData(this.props.authData);
    }

    showComponent(theme: any) {
        return <Home store={this.props.store} />
    }

    render() {
        if (this.props.store.authStore.authState == 'signedIn') {
            return this.showComponent(null);
        } else {
            return <span></span>
        }
    }
}

