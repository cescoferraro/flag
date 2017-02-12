import * as React from "react";
import AppBar from "material-ui/AppBar";
import {connect} from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
let css = require("./shell.pcss");


@connect((state) => ({app: state.app}), null)
class Shell extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.app);
        return <AppBar
            style={{position:"fixed",top:'0px', width:'100vw'}}
            title={"Flag HR"}
            iconElementLeft={<div></div>}
            iconElementRight={this.props.app.component}
        />;
    }

}


export default withStyles(css)(Shell)
