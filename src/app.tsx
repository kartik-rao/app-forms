import * as React from "react";
import * as ReactDOM from "react-dom";
import './app.css';
import "antd/dist/antd.css"

import 'airbnb-browser-shims';
import {Row, Col, Layout} from "antd";
import {Creator} from "./components/creator/creator";
import {Header} from "./components/common/header";
import {Footer} from "./components/common/footer";

class FormsApp extends React.Component <any, any> {
    props : any = {};
    state : any = {};

    constructor(props: any) {
        super(props);
        this.props = {};
    }

    render() {
        const { initialState, ...rest } = this.props
        return (
            <Layout style={{height:"100vh"}}>
                <Row><br/></Row>
                <Row justify="space-around">
                    <Col span={20} offset={2}>
                        <Row><Col span={24}><Header/></Col></Row>
                        <Row><Col span={24}><Creator/></Col></Row>
                        <Row><Col span={24}><Footer/></Col></Row>
                    </Col>
                </Row>
            </Layout>
        );
  }
}

export function render (props: any, target: string) {
    ReactDOM.render(new FormsApp(props).render(), document.querySelector(target));
}
