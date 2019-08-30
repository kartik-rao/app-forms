import * as React from "react";
import { AppMenu } from "./NavigationView";
export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return React.createElement(AppMenu, { store: this.props.store });
    }
}
//# sourceMappingURL=HeaderView.js.map