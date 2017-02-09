import * as React from "react";
import AppBar from "material-ui/AppBar";
import {APP_OBJECT} from "../../reducers/app";
import {connect} from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
declare let NODE_ENV: any;
declare let require: any;

interface StateProps {
    app: APP_OBJECT
}

const mapStateToProps = (state) => ({
    app: state.app
});
let css = require("./shell.pcss");

@connect<StateProps,any,any>(mapStateToProps, null)
class Bar extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <AppBar

            style={{position:"fixed",top:'0px', width:'100vw'}}
            title={"flag API"}
            iconElementLeft={<div></div>}
            iconElementRight={this.props.app.component}
        />;
    }

}


export default withStyles(css)(Bar)
