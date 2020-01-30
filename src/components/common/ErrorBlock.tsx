import { List, Result } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import * as React from "react";
import { appStoreContext } from "../../stores/AppStoreProvider";

export interface IErrorBlockProps {
    errors: any[];
    debug: boolean;
}

export const ErrorBlock : React.FC<IErrorBlockProps> = (props: IErrorBlockProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    const local = useLocalStore(() => ({
        errors : props.errors ? props.errors : [],
        debug: props.debug != null ? props.debug : false,
        get hasErrors() {
            return this.errors && this.errors.length > 0;
        }
    }));

    const ErrorList = (
        local.debug && local.errors ? <List>
            {local.errors.map((e, i) => {
                return <List.Item key={e.errorType}>{e.message}</List.Item>
            })}
        </List> : <></>
    );

    return useObserver(() => {
        return <div className="fl-error-display">
        {local.hasErrors &&
            <Result
            status="error"
            title="There was an error running this operation."
            extra={ErrorList}
          />
        }
    </div>
    })
}