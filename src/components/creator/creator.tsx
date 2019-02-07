import * as React from "react";
import {Row, Col, Layout} from "antd";
import {Canvas} from "./canvas";
import {Properties} from "./properties";
import {Toolbar} from "./toolbar";

export class Creator extends React.Component <any, any> {
    props : any;
    state : any;

    constructor(props: any) {
        super(props);
        this.state = {
            formData: {
                content : {title: "foo", subtitle: "bar", pages:[]},
                formLayoutOptions : {}
            }
        };
    }

    render() {
        const { initialState, ...rest } = this.props
        return <Row justify="space-around">
            <Col span={24}>
                <Row><Col span={24}></Col></Row>
                <Row>
                    <Col span={6}><Toolbar/></Col>
                    <Col span={12}><Canvas formData={...this.state.formData}/></Col>
                    <Col span={6}><Properties/></Col>
                </Row>
            </Col>
        </Row>
  }
}