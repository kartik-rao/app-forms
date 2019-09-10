import * as React from "react";

import {NavigationView} from "./NavigationView";
import { Card } from "antd";
import { appStoreContext } from "../../stores/AppStoreProvider";
import { useObserver } from "mobx-react-lite";
import { withRouter, RouteComponentProps } from "react-router";

const Header : React.FC<RouteComponentProps<any>> = ({location}) => {
    const store = React.useContext(appStoreContext);
    if(!store) throw new Error("Store is null");

    if(location && location.pathname)
    return useObserver(() => {
        return <NavigationView />
    })
}

export default withRouter(Header);