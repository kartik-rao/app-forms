import * as React from "react";

export class Canvas extends React.Component<any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        return <div><h1>Canvas</h1></div>
    }
}