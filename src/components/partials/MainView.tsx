import { observer } from 'mobx-react';
import * as React from 'react';
import { IRootStore } from '../../stores/RootStore';
import { Creator } from "../creator/creator";
import { AccountsView } from "./AccountsView";
import { UsersView } from "./UsersView";
import { FormsView } from "./FormsView";
import { AdminView } from './AdminView';
import { AccountAdminView } from './AccountAdminView';

export interface IMainViewProps {
    store: IRootStore
}

@observer
export class MainView extends React.Component<IMainViewProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        let {viewStore} = this.props.store;
        const view = viewStore.currentView ? viewStore.currentView.name : "home";
        const {group} = this.props.store.authStore;
        const isAdmin = group == 'Admin';
        const isAccountAdmin = group == 'AccountAdmin';

        return (
            <div style={{padding: "10px", height: "100%"}}>
                {view == 'canvas'   && <Creator store={this.props.store}/>}
                {view == 'accounts' && isAdmin && <AccountsView store={this.props.store}/>}
                {view == 'forms' && <FormsView store={this.props.store}/>}
                {view == 'admin' && isAdmin && <AdminView store={this.props.store}/>}
                {view == 'admin' && isAccountAdmin && <AccountAdminView store={this.props.store}/>}
            </div>
        );
    }
};