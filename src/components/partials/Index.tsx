import * as React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


export interface IIndexProps {
    auth: any,
    constants: any,
    history: any,
    location: any
}

class Index extends React.Component<IIndexProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {

    }

    public render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {this.props.auth.is_valid && (<h1>Is Logged In</h1>)}
                        {!this.props.auth.is_valid && (<h1>Is NOT Logged In {this.props.auth.error}</h1>)}
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state: any, ownProps: any): IIndexProps => {
    return { auth: state.auth, constants: state.constants, history: ownProps.history, location: ownProps.location };
};

const ConnectedIndex = connect<{},{}, any>(mapStateToProps)(withRouter(Index))

export default ConnectedIndex;