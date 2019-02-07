import * as React from "react";

export class Properties extends React.Component<any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        return <div><h1>Properties</h1></div>
    }
}