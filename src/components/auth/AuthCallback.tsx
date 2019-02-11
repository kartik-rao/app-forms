import * as React from 'react';
import { connect } from "react-redux";

import { Redirect } from 'react-router';
let loading = require('./loading.svg');
import {startLogin, parseAuth} from '../../actions/Auth'

export interface AuthCallbackProps extends React.Props<any> {
    parseAuth?: () => void,
    login?: () => void,
    constants: any,
    location: any,
    pending: boolean,
    error: string
}

class AuthCallback extends React.Component<AuthCallbackProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const style: any = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white'
        };
        return (
            <div>
                <span>
                    { this.props.pending &&
                        (<div style={style}><img src={loading} alt="loading" onLoad={this.props.parseAuth} /></div>)
                    }
                </span>
                <span>
                    { !this.props.pending && this.props.error &&
                    (<p>
                        <span> {this.props.error}</span>
                        <a href="#" onClick={this.props.login}>Click here to try again</a>
                    </p>)
                    }
                </span>
                <span>
                    { !this.props.pending && !this.props.error && (<Redirect to='/home'/>) }
                </span>
            </div>
        );
    }

}

const mapStateToProps = (state:any, ownProps:any) : AuthCallbackProps => {
    return { pending: state.auth.pending, error: state.auth.error, constants: ownProps.constants, location: ownProps.location };
};

const mapDispatchToProps = (dispatch:any) => {
    return {
        'parseAuth': () => dispatch(parseAuth()),
        'login': () => dispatch(startLogin())
    }
}

const ConnectedAuthCallback = connect<{}, {}, any>(mapStateToProps, mapDispatchToProps)(AuthCallback)

export default ConnectedAuthCallback;