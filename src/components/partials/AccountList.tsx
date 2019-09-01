import API, { graphqlOperation } from "@aws-amplify/api";
import { Form, Select } from "antd";
import { FormComponentProps } from 'antd/lib/form/Form';
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import * as queries from '../../graphql/queries';
import { appStoreContext } from "../../stores/AppStoreProvider";

const AccountList: React.FC<FormComponentProps> = (props) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        loading: true,
        errors: [] as any[],
        context: null as string,
        accounts: [] as any[],
        setContext: function(c: string) {
            console.log("setContext", c);
            this.context = c;
            store.auth.setContext(this.context);
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
        return localStore.loading ? <></> : <Form layout="inline">
            <Form.Item required={false} label="">
                {props.form.getFieldDecorator('_context')(
                    <Select
                        size="large"
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