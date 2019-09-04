import API, { graphqlOperation } from "@aws-amplify/api";
import { Form, Select, Spin, Icon } from "antd";
import { FormComponentProps } from 'antd/lib/form/Form';
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";
import { Loading } from "../common/Loading";

const antIcon = <Icon type="loading" style={{ fontSize: 16 }} spin />;

const AccountList: React.FC<FormComponentProps> = (props) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        loading: true,
        errors: [] as any[],
        context: null as string,
        accounts: [] as any[],
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
            try {
                let allAccounts = await API.graphql(graphqlOperation(queries.listAccounts));
                localStore.accounts = allAccounts['data']['listAccounts'];
            } catch (errorResponse) {
                console.error(errorResponse);
                localStore.errors = errorResponse.errors;
            }
            if (!localStore.accounts) {
                localStore.accounts = [];
            }
            localStore.loading = false;
        }
        fetch();
    }, []);

    return useObserver(() => {
        return localStore.loading ? <Spin indicator={antIcon}/> : <Form layout="inline">
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

export default Form.create()(AccountList)