import { observer } from 'mobx-react';
import * as React from 'react';
import { IRootStore } from '../../stores/RootStore';
import { Creator } from "../creator/creator";
import { AccountsView } from "./AccountsView";
import { UsersView } from "./UsersView";
import { FormsView } from "./FormsView";

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
        return (
            <div style={{marginTop: "25px", padding: "10px"}}>
                {view == 'canvas' && <Creator store={this.props.store}/>}
                {view == 'accounts' && <AccountsView store={this.props.store}/>}
                {view == 'users' && <UsersView store={this.props.store}/>}
                {view == 'forms' && <FormsView store={this.props.store}/>}
            </div>
        );
    }
};