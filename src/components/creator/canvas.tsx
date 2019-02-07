import * as React from "react";
import {FormWrapper} from "@adinfinity/ai-lib-forms";

export class Canvas extends React.Component<any, any> {
    props: any;
    state: any;
    constructor(props: any) {
        super(props);
        this.state = {formData : props.formData};
        console.log("Canvas props", props)
    }

    render() {
        console.log("wrapper props", this.state.formData)
        return <div><div id="canvas-preview"></div>
            <FormWrapper target="canvas-preview" {...this.state.formData}/>
        </div>
    }
}