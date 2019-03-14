import * as React from 'react';

import { IRootStore } from '../../stores/RootStore';

export interface ILogoutProps {
    store: IRootStore,
    constants: any,
    history: any,
    location: any
}

class Logout extends React.Component<ILogoutProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {

    }

    public render() {
        let {authStore} = this.props.store;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                       <h1>LOGOUT</h1>
                    </div>
                </div>
            </div>
        ) as React.ReactNode;
    }
};


export default Logout;