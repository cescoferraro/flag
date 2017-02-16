import {connect} from "react-redux";
import * as React from "react";
import {Observable} from "rx-lite-dom";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {Button} from "rebass";
import {DatePicker, SelectField, TextField} from "redux-form-material-ui";
import {createAsyncComponent} from "react-async-component";
import {reduxForm, Field} from "redux-form";
import {FORMCESCO} from "../workerForm/worker.form";
import {AppActions} from "../../actions/index";
import SizeMe from "react-sizeme";
declare let require, window: any;
let css = require('./insert.pcss');
const Infinite = require('react-infinite');

@SizeMe({monitorHeight: true})
@connect((state) => ({app: state.app}), AppActions)
export class InsertComponent extends React.Component<any,any> {


    componentDidMount() {
        this.props.SET_ACTIVE_TAB(3);
    }

    render() {
        const {height, width} = this.props.size;
        const scroll = height - 48;
        return <div style={{height:"calc( 100vh - 64px)"}}>
            <Infinite containerHeight={scroll}
                      elementHeight={[scroll]}>
                <FORMCESCO replace={this.props.replace} kind={"add"}/>
            </Infinite>

        </div>
    }
}


