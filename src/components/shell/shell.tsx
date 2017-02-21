import * as React from "react";
import AppBar from "material-ui/AppBar";
import {connect} from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
let css = require("./shell.pcss");

let GoogleDrive = require("-!babel-loader!svg-react-loader!../../shared/svg/drive.svg");

@connect((state) => ({app: state.app}), null)
class Shell extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <AppBar
            style={{backgroundColor:"#43A047", position:"fixed",top:'0px', width:'100vw'}}
            title={"Flag cesco"}
            iconElementLeft={<GoogleDrive style={{height: '48px',width: '48px'}}/>}
            iconElementRight={this.props.app.component}
        />;
    }

}


export default withStyles(css)(Shell)
