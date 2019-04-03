import * as React from "react";
import {Row, Col, Layout} from "antd";
import {Canvas} from "./canvas";
import {Properties} from "./PropertiesView";
import {Toolbar} from "./ControlsView";
import {DragDropContext} from "react-beautiful-dnd";
import {observable, action} from "mobx";

import FormStore from "@adinfinity/ai-core-forms/lib/state/FormStore";
import {Factory} from "@adinfinity/ai-core-forms/lib/models/factory";
import Page, {IPage} from "@adinfinity/ai-core-forms/lib/models/page";
import Column from "@adinfinity/ai-core-forms/lib/models/column";
import Section from "@adinfinity/ai-core-forms/lib/models/section";
import Form from "@adinfinity/ai-core-forms/lib/models/form";
import { DragDropContainer } from "./DragDropContainer";

const items = [{
        id: "s1",
        name: "sec1",
        content: "sec1",
        columns: [ {
            id: "s1c1",
            name: "sec1col1",
            content: "sec1col1",
            fields: [{
                id: "s1c1f1",
                name: "col1field1",
                content: "col1field1"
            },{
                id: "s1c1f2",
                name: "col1field2",
                content: "col1field2"
            }]
        }, {
            id: "s1c2",
            name: "sec1col2",
            content: "sec1col2",
            fields: [{
                id: "s1c2f1",
                name: "sec1col2field1",
                content: "sec1col2field1"
            },{
                id: "s1c2f2",
                name: "sec1col2field2",
                content: "sec1col2field2"
            }]
        } ]
    }, {
        id: "s2",
        name: "sec2",
        content: "sec2",
        columns: [ {
            id: "s2c1",
            name: "sec2col1",
            content: "sec2col1",
            fields: [{
                id: "s2c1f1",
                name: "col1field1",
                content: "col1field1"
            },{
                id: "s2c1f2",
                name: "col1field2",
                content: "col1field2"
            }]
        }, {
            id: "s2c2",
            name: "sec2col2",
            content: "sec2col2",
            fields: [{
                id: "s2c2f1",
                name: "sec2col2field1",
                content: "sec2col2field1"
            },{
                id: "s2c2f2",
                name: "sec2col2field2",
                content: "sec2col2field2"
            }]
        } ]
}]

export class CanvasView extends React.Component <any, any> {
    props : any;
    state : any;

    store: FormStore;
    factory: Factory;
    form: Form;

    constructor(props: any) {
        super(props);
        this.store = new FormStore({});
        this.factory = new Factory(this.store);
        this.form = this.factory.makeForm(this.props.formData || {});
    }

    @action addPage() {

    }

    render() {
        const { initialState, ...rest } = this.props
        return <Row justify="space-around">
            <Col span={24}>
                <DragDropContainer items={items}></DragDropContainer>
            </Col>
        </Row>
  }
}