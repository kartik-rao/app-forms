import * as React from "react";
import * as ReactDOM from "react-dom";
import './app.css';
import "antd/dist/antd.css"

import 'airbnb-browser-shims';
import {Row, Col, Layout} from "antd";
import {Creator} from "./components/creator/creator";
import {Header} from "./components/common/header";
import {Footer} from "./components/common/footer";
import { connect } from "react-redux";
import Logout from "./components/partials/Logout";
// import Header from "./components/partials/Header";
// import Footer from "./components/partials/Footer";
import AuthCallback from "./components/auth/AuthCallback";
import Index from "./components/partials/Index";
// import NotFound from "./components/partials/NotFound";
import {withRouter, Switch, Route} from 'react-router-dom';

export class App extends React.Component <any, any> {
    props : any = {};
    state : any = {};

    constructor(props: any) {
        super(props);
    }

    render() {
        console.log("FormsApp.render");
        const { initialState, ...rest } = this.props
        return (
            <Layout style={{height:"100vh"}}>
                <Row justify="space-around">
                    <Col span={20} offset={2}>
                        <Row><Col span={24}><Header/></Col></Row>
                        <Switch>
                            <Route path="/auth" render={(props) => {
                                return <AuthCallback history={history} {...props} />
                            }}/>
                            <Route exact={true} path="/home" component={App}/>
                            <Route exact={true} path="/" component={Index}/>
                            <Route path="/logout" render={(props) => <Logout history={history} location={location} {...props} />} />
                        </Switch>
                        <Row><Col span={24}><Creator/></Col></Row>
                        <Row><Col span={24}><Footer/></Col></Row>
                    </Col>
                </Row>
            </Layout>
        );
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
    return { auth: state.auth, constants: state.constants, canvas: state.canvas, history: ownProps.history, location: ownProps.location, path: ownProps.location.pathname};
};

const ConnectedApp = connect<{},{}, any>(mapStateToProps)(withRouter(App))

export default ConnectedApp;