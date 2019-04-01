import * as React from "react";
import * as Sentry from '@sentry/browser';

export interface IErrorBoundaryProps {
    children: React.ReactChildren;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, any> {
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
            return (
              <div style={{backgroundColor:'grey', marginTop: "20%", border: "1px solid red", height: 250, width: 250}}>
                <p>We're sorry, something went wrong with the previous request, click <a onClick={() => Sentry.showReportDialog()}>here</a> to report this error</p>
              </div>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}