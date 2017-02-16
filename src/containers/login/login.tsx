import * as React from "react";
import * as Rx from "rx-lite-dom";
import {Observable} from "rx-lite-dom";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {createAsyncComponent} from "react-async-component";
import {reduxForm, Field} from "redux-form";
import {Checkbox, RadioButtonGroup, SelectField, TextField, Toggle} from "redux-form-material-ui";
import {RadioButton} from "material-ui/RadioButton";
import Utils from "../../shared/utils";
import {Serialize} from "../../shared/serializer";
import IconButton from "material-ui/IconButton";
import {connect} from "react-redux";
import {AppActions} from "../../actions/index";
import * as hoistStatics from "hoist-non-react-statics";
declare let require, window: any;
let css = require('./login.pcss');
let GoogleDrive = require("-!babel-loader!svg-react-loader!../../shared/svg/drive.svg");


let BellowAppShell = () => {
    return (ComposedComponent) => {
        class WithStyles extends React.Component<any,any> {
            render() {
                return <div style={{height:"calc( 100vh - 64px)",marginTop:"64px"}}>
                    <ComposedComponent {...this.props} />
                </div>;
            }
        }
        return hoistStatics(WithStyles, ComposedComponent);

    };
};

@reduxForm({form: 'loginForm'})
@connect((state) => ({app: state.app}), AppActions)
@withStyles(css)
@BellowAppShell()
export class LoginComponent extends React.Component<any, any> {
    sheetLink: string = "https://docs.google" +
        ".com/spreadsheets/d/1qqIcuAco_VzgvwOOehq" +
        "7P6my2ppZbyWUFW2Z8GQJ6MQ/edit?usp=sharing";

    Submit(form) {
        console.log(form);
        const progressObserver = Rx.Observer.create(
            (x: ProgressEvent) => {
                let percentage = (x.loaded / x.total) * 100;
            },
            (err) => {
                console.log('observerError: ' + err);
            },
            () => {
                console.log('Login request completed');
            }
        );

        let body = Serialize({
            email: form.email,
            password: form.password
        });
        console.log(body);
        Rx.DOM.post({
            url: Utils.API_URL("/login"),
            progressObserver: progressObserver,
            body: body
        }).subscribe(() => {
            console.log("actualy pushing /dashboard/workers");
            this.props.push("/dashboard/workers");
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
        const {SET_PROGRESS, handleSubmit}= this.props;
        return (
            <div>
                {/*<button onClick={SET_PROGRESS.bind(this,66)}>HELLO*/}
                {/*</button>*/}
                <form onSubmit={handleSubmit(this.Submit.bind(this))}>
                    <h2><a href={this.sheetLink}>Sheet</a></h2>
                    <br/>
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
            </div>)
    }
}

