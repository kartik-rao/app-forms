import * as React from "react";

import {NavigationView} from "./NavigationView";

export class Header extends React.Component<any, any> {
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        console.log("HeaderView");
        return <NavigationView />
    }
}