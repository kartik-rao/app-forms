import * as React from 'react';

import { IRootStore } from '../../stores/RootStore';
import { Row, Col } from 'antd';
import {Creator} from "../creator/creator";
import {Header} from "../common/header";
import {Footer} from "../common/footer";

export interface IHomeProps {
    store: IRootStore
}

class Home extends React.Component<IHomeProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        let {authStore} = this.props.store;

        return (
            <div className="container">
                <Row><Col span={24}><Header store={this.props.store}/></Col></Row>
                <Row justify="space-around" type="flex">
                    <Col span={8}>
                        {authStore.user && (<h1>Is Logged In</h1>)}
                        {!authStore.user && (<h1>Is NOT Logged In {authStore.authState}</h1>)}
                    </Col>
                </Row>
                <Row><Col span={24}><Creator store={this.props.store}/></Col></Row>
                <Row><Col span={24}><Footer store={this.props.store}/></Col></Row>
            </div>
        );
    }
};

export default Home;