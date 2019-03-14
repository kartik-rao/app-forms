import * as React from "react";
import {FormWrapper} from "@adinfinity/ai-lib-forms";

export class Canvas extends React.Component<any, any> {
    props: any;
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {formData : props.formData};
    }

    render() {
        return <div><div id="canvas-preview"></div>
            <FormWrapper formData={this.state.formData}/>
        </div>
    }
}