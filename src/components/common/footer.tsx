import * as React from "react";
import {Affix} from "antd";

export class Footer extends React.Component<any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        return <Affix offsetBottom={10}><div><h1>Footer</h1></div></Affix>
    }
}