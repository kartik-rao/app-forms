import * as React from "react";
import {Affix, Menu, Icon} from "antd";

export class Footer extends React.Component<any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        let {viewStore, authStore} = this.props.store;
        let selected = viewStore.currentView ? [viewStore.currentView.name] : ["home"];

        return (
        <Menu selectedKeys={selected} mode="horizontal" theme="light">
            <Menu.Item key="privacy" style={{float: 'right'}}>
                <Icon type="lock" />Privacy
            </Menu.Item>
            <Menu.Item key="terms"  style={{float: 'right'}}>
                <Icon type="lock" />Terms Conditions
            </Menu.Item>
            <Menu.Item key="Docs"  style={{float: 'right'}}>
                <Icon type="book" />Docs
            </Menu.Item>
            <Menu.Item key="Support"  style={{float: 'right'}}>
                <Icon type="customer-service"/>Support
            </Menu.Item>
        </Menu>
        );
    }
}


