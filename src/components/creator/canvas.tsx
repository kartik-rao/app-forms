import * as React from "react";

export class Canvas extends React.Component<any, any> {
    props: any;
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {formData : props.formData};
    }

    render() {
        return <div><div id="canvas-preview"></div>
            <h1> PREVIEW </h1>
        </div>
    }
}