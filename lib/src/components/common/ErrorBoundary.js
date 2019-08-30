import * as React from "react";
import * as Sentry from '@sentry/browser';
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }
    render() {
        if (this.state.error) {
            //render fallback UI
            return (React.createElement("div", { style: { backgroundColor: 'grey', marginTop: "20%", border: "1px solid red", height: 250, width: 250 } },
                React.createElement("p", null,
                    "We're sorry, something went wrong with the previous request, click ",
                    React.createElement("a", { onClick: () => Sentry.showReportDialog() }, "here"),
                    " to report this error")));
        }
        else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}
//# sourceMappingURL=ErrorBoundary.js.map