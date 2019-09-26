import * as React from "react";
import {Menu, Icon} from "antd";
import config from "../../config";

export const Footer : React.FC = () => {
    return <Menu selectedKeys={null} mode="horizontal" theme="light">
        <Menu.Item key="version" style={{float: 'left'}} disabled={true}>
            <span>v{config.version}</span>
        </Menu.Item>
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
}