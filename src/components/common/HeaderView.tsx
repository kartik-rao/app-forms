import * as React from "react";

import {AppMenu} from "./NavigationView";

export class Header extends React.Component<any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        return <AppMenu store={this.props.store}/>
    }
}