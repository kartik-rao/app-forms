import { Skeleton } from "antd";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { appStoreContext } from "../../stores/AppStoreProvider";

export interface IErrorBlockProps {
    loading: boolean;
}

export const LoadingBlock : React.FC<IErrorBlockProps> = (props: IErrorBlockProps) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    return useObserver(() => {
        return <div className="fl-loading-display">
            {props.loading && <Skeleton active />}
        </div>
    })
}