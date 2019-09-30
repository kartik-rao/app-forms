import { IListAccountsQuery, ListAccounts } from "@kartikrao/lib-forms-api";
import { Form, Select, Skeleton } from "antd";
import { FormComponentProps } from 'antd/lib/form/Form';
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { withGraphQl } from "../../ApiHelper";
import { appStoreContext } from "../../stores/AppStoreProvider";

const AccountListView: React.FC<FormComponentProps> = (props) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        loading: true,
        errors: [] as any[],
        context: null as string,
        accounts: [] as IListAccountsQuery["listAccounts"],
        setContext: function(contextId: string) {
            this.context = contextId;
            let contextName = localStore.accounts.filter((a) => {return a.id == contextId})[0].name
            store.auth.setContextId(this.context);
            store.auth.setContextName(contextName);
        }
    }));

    React.useEffect(() => {
        let fetch  = async () => {
            localStore.loading = true;
            store.view.setLoading({show: true, message: "Loading accounts", status: "active", type : "line", percent: 100});
            try {
                let allAccounts = await withGraphQl<IListAccountsQuery>(ListAccounts);
                localStore.accounts = allAccounts.data.listAccounts;
            } catch (errorResponse) {
                console.error(errorResponse);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.accounts) {
                localStore.accounts = [];
            }
            localStore.loading = false;
            store.view.resetLoading();
        }
        fetch();
    }, []);

    return useObserver(() => {
        return localStore.loading ? <Skeleton active /> : <Form layout="inline">
            <Form.Item required={false} label="">
                {props.form.getFieldDecorator('_context')(
                    <Select
                        size="small"
                        showSearch
                        style={{ width: 280 }}
                        placeholder="Account Context"
                        optionFilterProp="title"
                        onChange={localStore.setContext}
                        filterOption={(input, option) => {
                            return option.props.title.toString().toLowerCase().indexOf(input.toLowerCase()) > -1
                        }}>
                    {localStore.accounts.map((a) => {
                        return <Select.Option key={a.id} value={a.id} title={a.name}>{a.name}</Select.Option>
                    })}
                </Select>
                )}
            </Form.Item>
        </Form>
    })
}

export default Form.create()(AccountListView)