import { Button, Form, Input, Row, Select, DatePicker } from "antd";
import { FormComponentProps } from 'antd/lib/form/Form';
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { IRootStore } from "../../stores/RootStore";
import moment from "moment";

export interface IAddFormViewProps {
    store: IRootStore;
    onAdd: any;
}

@observer
export class AddFormView extends React.Component<IAddFormViewProps & FormComponentProps, any> {
    props:IAddFormViewProps  & FormComponentProps;
    @observable values: any;
    @observable confirmDirty: boolean = false;

    constructor(props: IAddFormViewProps & FormComponentProps) {
        super(props);
        this.props = props;
    }

    @action handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            if (values.startsAt) {
                values.endsAt = values.startsAt.toISOString ? values.startsAt.toISOString(): values.startsAt.toString();
            }
            if (values.endsAt) {
                values.endsAt = values.endsAt.toISOString ? values.endsAt.toISOString(): values.endsAt.toString();
            }
            this.values = values;
            this.props.onAdd(values);
          }
        });
    }

    @action handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
        return;
    }

    render() {
        let {getFieldDecorator} = this.props.form;

        return (<div>
            <Row type="flex">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item required={true} label="Name" help="A name for this form">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please provide a name' }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item required={true} label="Description" help="A short description for this form">
                        {getFieldDecorator('desc', {
                            rules: [{ required: true, message: 'Please provide a last name' }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Starts At" help="When to start accepting entries (optional)">
                        {getFieldDecorator('startsAt', {
                            rules: [{ type: "object", message: 'Please provide a valid start date' }]
                        })(
                            <DatePicker showTime={true}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Ends At" help="When to stop accepting entries (optional)">
                        {getFieldDecorator('endsAt', {
                            rules: [{ type: "object", message: 'Please provide a valid end date' }]
                        })(
                            <DatePicker showTime={true}/>
                        )}
                    </Form.Item>
                    <Form.Item style={{marginTop: "20px"}}>
                        <Button style={{float: "right", marginRight: "10px"}} type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>)
    }
}

export default Form.create<IAddFormViewProps>()(AddFormView);