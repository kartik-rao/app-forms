import * as React from "react";
import { Menu, Icon } from "antd";
export class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (React.createElement(Menu, { selectedKeys: null, mode: "horizontal", theme: "light" },
            React.createElement(Menu.Item, { key: "privacy", style: { float: 'right' } },
                React.createElement(Icon, { type: "lock" }),
                "Privacy"),
            React.createElement(Menu.Item, { key: "terms", style: { float: 'right' } },
                React.createElement(Icon, { type: "lock" }),
                "Terms Conditions"),
            React.createElement(Menu.Item, { key: "Docs", style: { float: 'right' } },
                React.createElement(Icon, { type: "book" }),
                "Docs"),
            React.createElement(Menu.Item, { key: "Support", style: { float: 'right' } },
                React.createElement(Icon, { type: "customer-service" }),
                "Support")));
    }
}
//# sourceMappingURL=FooterView.js.map