import * as React from "react";
import {Menu} from "antd";

export class Toolbar extends React.Component<any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
        console.log("Toolbar props", props);
        console.log(this.props);
    }

    handleClick(context: any) : void {
        this.props.onItemAdd('page');
    }

    render() {
        return <Menu mode="inline">
        <Menu.Item>Form Controls</Menu.Item>
            <Menu.SubMenu key="Layout" title="Layout">
                <Menu.Item key={1} onClick={() => this.handleClick({context:'page'})}>Page</Menu.Item>
                <Menu.Item key={2}>Column</Menu.Item>
                <Menu.Item key={3}>Section</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="Basic" title="Basic">
                <Menu.Item key={1}>Input</Menu.Item>
                <Menu.Item key={2}>Select</Menu.Item>
                <Menu.Item key={3}>Radio Group</Menu.Item>
                <Menu.Item key={4}>Textarea</Menu.Item>
                <Menu.Item key={5}>Column</Menu.Item>
                <Menu.Item key={6}>Section</Menu.Item>
                <Menu.Item key={7}>Textblock</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="Datetime" title="Datetime">
                <Menu.Item key={1}>Datepicker</Menu.Item>
                <Menu.Item key={2}>Monthpicker</Menu.Item>
                <Menu.Item key={3}>Weekpicker</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="Ranged" title="Range">
                <Menu.Item key={1}>Rangepicker</Menu.Item>
                <Menu.Item key={2}>Rate</Menu.Item>
                <Menu.Item key={3}>Slider</Menu.Item>
            </Menu.SubMenu>
      </Menu>
    }
}