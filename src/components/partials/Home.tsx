import { Col, Row } from 'antd';
import * as React from 'react';
import { IRootStore } from '../../stores/RootStore';
import { Footer } from "../common/footer";
import { Header } from "../common/header";
import { Creator } from "../creator/creator";
import {AccountsView} from "./Accounts";
import { observer } from 'mobx-react';

export interface IHomeProps {
    store: IRootStore
}

@observer
export class Home extends React.Component<IHomeProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        let {authStore, viewStore} = this.props.store;
        const view = viewStore.currentView ? viewStore.currentView.name : "home";
        return (
            <div className="container">
                <Row><Col span={24}><Header store={this.props.store}/></Col></Row>
                <Row justify="space-around" type="flex">
                    {view == 'canvas' && <Creator store={this.props.store}/>}
                    {view == 'accounts' && <AccountsView store={this.props.store}/>}
                </Row>
                <Row><Col span={24}><Footer store={this.props.store}/></Col></Row>
            </div>
        );
    }
};