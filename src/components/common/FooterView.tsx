import * as React from "react";
import {Affix} from "antd";

export class Footer extends React.Component<any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        return <Affix><strong>forms.li</strong></Affix>
    }
}