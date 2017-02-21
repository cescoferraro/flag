import * as React from "react";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/dom/ajax";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {createAsyncComponent} from "react-async-component";
import {reduxForm, Field} from "redux-form";
import {Checkbox, RadioButtonGroup, SelectField, TextField, Toggle} from "redux-form-material-ui";
import {RadioButton} from "material-ui/RadioButton";
import {Serialize} from "../../shared/serializer";
import IconButton from "material-ui/IconButton";
import {connect} from "react-redux";
import {AppActions} from "../../redux/actions";
import Utils from "../../shared/utils";
import {Subscriber} from "rxjs";
import {BellowAppShell} from "../../shared/bellow.decorator";
import {push} from "connected-react-router";
declare let require, window: any;
let css = require('./login.pcss');
let GoogleDrive = require("-!babel-loader!svg-react-loader!../../shared/svg/drive.svg");

@withStyles(css)
@BellowAppShell()
@reduxForm({form: 'loginForm'})
@connect((state) => ({app: state.app}), AppActions)
export class LoginComponent extends React.Component<any, any> {
    sheetLink: string = "https://docs.google" +
        ".com/spreadsheets/d/1qqIcuAco_VzgvwOOehq" +
        "7P6my2ppZbyWUFW2Z8GQJ6MQ/edit?usp=sharing";

    Submit(form) {
        let sub: Subscriber<any> = Subscriber.create(
            (x) => console.log(x),
            null,
            () => console.log("Done"));
        Observable.ajax({
            method: "post",
            progressSubscriber: sub,
            url: Utils.API_URL("/login"),
            body: Serialize({
                email: form.email,
                password: form.password
            })
        }).subscribe(() => {
            console.log("actually pushing /dashboard/workers");

            this.props.push('/dashboard/workers')
        });
    }

    render() {
        let large = {
            width: 120,
            height: 120,
            padding: 30,
        };
        let largeIcon = {
            width: 60,
            height: 60,
        };
        const {handleSubmit}= this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.Submit.bind(this))}>
                    <h2><a href={this.sheetLink}>Sheet</a></h2>
                    <h2>Login to the app</h2>
                    <Field name="email"
                           type="email"
                           floatingLabelText="Email"
                           required
                           id="email"
                           component={TextField}
                           fullWidth={true}
                           floatingLabelFixed={true}
                           hintText="Email"/>
                    <Field name="password"
                           type="password"
                           id="passwd-login"
                           required
                           floatingLabelFixed={true}
                           floatingLabelText="Password"
                           fullWidth={true}
                           component={TextField}
                           hintText="Password"/>

                    <IconButton type="submit"
                                label="lgdkjfn"
                                iconStyle={largeIcon} style={large}>
                        <GoogleDrive style={{height: '20px'}}/>
                    </IconButton>
                </form>

                <button onClick={()=>{
                    this.props.dispatch({
                        type:"PING",
                        payload:{
                            dispatch: this.props.dispatch
                        }
                    })
                }}>HELLO
                </button>
            </div>)
    }
}

