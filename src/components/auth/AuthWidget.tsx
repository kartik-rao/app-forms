import * as React from 'react';
import { connect } from "react-redux";
import { startLogin, startLogout } from "../../actions/Auth";

export interface IAuthWidgetProps  extends React.Props<any>{
    auth: any,
    handleLogin?: () => void,
    handleLogout?: () => void
}

class AuthWidget extends React.Component<IAuthWidgetProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <span>
                {
                    !this.props.auth.is_valid && (
                        <a className="nav-link nav-link--rounded ml-lg-2" href="#" onClick={this.props.handleLogin}>
                            Log In
                </a>
                    )
                }
                {
                    this.props.auth.is_valid && (
                        <a className="nav-link nav-link--rounded ml-lg-2" href="#" onClick={this.props.handleLogout}>
                            Log Out
                        </a>
                    )
                }
            </span>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        'handleLogin': () => { dispatch(startLogin()) },
        'handleLogout': () => { dispatch(startLogout()) }
    }
}

const mapStateToProps = (state: any): IAuthWidgetProps => {
    return { auth: state.auth};
};

const ConnectedAuthWidget = connect(mapStateToProps, mapDispatchToProps)(AuthWidget)

export default ConnectedAuthWidget;