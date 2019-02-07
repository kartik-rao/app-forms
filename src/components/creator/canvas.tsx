import * as React from "react";
import {FormWrapper, FormFactory} from "@adinfinity/ai-lib-forms";

export class Canvas extends React.Component<any, any> {
    props: any;
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {formData : FormFactory.createForm(props.formData)};
    }

    render() {
        console.log("Wrapper state", this.state.formData);
        return <div><div id="canvas-preview"></div>
            <FormWrapper target="canvas-preview" form={this.state.formData}/>
        </div>
    }
}