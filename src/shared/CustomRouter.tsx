import {createBrowserHistory} from "history";
import * as React from "react";
import {Router} from "react-router-dom";

export class CustomRouter extends React.Component<any,any> {

    constructor(props, context) {
        super(props)

    }


    render() {
        console.log(this.props);
        console.log(this.props.children);
        return (<Router
            history={createBrowserHistory()}>
            {this.props.children}</Router>);
    }
}
