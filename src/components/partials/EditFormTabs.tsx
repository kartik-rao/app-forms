import { IUpdateFormMutation, UpdateForm } from "@kartikrao/lib-forms-api";
import { Button, DatePicker, Form, Input, notification, Tabs } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, useObserver } from "mobx-react-lite";
import moment from "moment";
import * as React from "react";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from '../../stores/AppStoreProvider';

export interface EditFormViewProps extends FormComponentProps {
    editForm: any;
    onUpdate: (data: IUpdateFormMutation["updateForm"]) => void;
}


const EditFormTabs : React.FC<EditFormViewProps> = (props: EditFormViewProps) => { 
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    let {editForm} = props;
    const localStore = useLocalStore(() => ({
        handleBaseValues: function() {},
        handleDates : function(){

        }
    }))

    return useObserver(()=>{
        return <Tabs>
            <Tabs.TabPane key="form-base">

            </Tabs.TabPane>
            <Tabs.TabPane  key="form-dates">
                
            </Tabs.TabPane>
            <Tabs.TabPane key="form-redirects">
                
            </Tabs.TabPane>
        </Tabs>
    })
}