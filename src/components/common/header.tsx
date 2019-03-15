import * as React from "react";

import {Affix} from "antd";
import {AppMenu} from "./appmenu";

export class Header extends React.Component<any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        return <Affix><AppMenu store={this.props.store}/></Affix>
    }
}