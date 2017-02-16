import * as React from "react";
import * as Rx from "rx-lite-dom";
import {Observable} from "rx-lite-dom";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {createAsyncComponent} from "react-async-component";
import {BelowAppBar} from "../../shared/routes";
import {reduxForm, Field} from "redux-form";
import {Checkbox, RadioButtonGroup, SelectField, TextField, Toggle} from "redux-form-material-ui";
import {RadioButton} from "material-ui/RadioButton";
import Utils from "../../shared/utils";
import {Serialize} from "../../shared/serializer";
import IconButton from "material-ui/IconButton";
import {connect} from "react-redux";
import * as Progress from "react-progress";
import {AppActions} from "../../actions/index";
declare let require, window: any;
let css = require('./login.pcss');
let GoogleDrive = require("-!babel-loader!svg-react-loader!../../shared/svg/drive.svg");


@reduxForm({form: 'loginForm'})
@connect((state) => ({app: state.app}), AppActions)
@withStyles(css)
class LoginComponent extends React.Component<any, any> {
    sheetLink: string = "https://docs.google" +
        ".com/spreadsheets/d/1qqIcuAco_VzgvwOOehq" +
        "7P6my2ppZbyWUFW2Z8GQJ6MQ/edit?usp=sharing";


    Submit(form) {
        console.log(form);
        this.props.SET_LOGIN_PROGRESS(5);
        const progressObserver = Rx.Observer.create(
            (x: ProgressEvent) => {
                let percentage = (x.loaded / x.total) * 100;
                this.props.SET_LOGIN_PROGRESS(percentage)
            },
            (err) => {
                console.log('observerError: ' + err);
            },
            () => {

                this.props.SET_LOGIN_PROGRESS(100);
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
        return (
            <div>
                <Progress id="progress"
                          speed={0.2}
                          style={{marginTop:"64px"}}
                          color="red"
                          height={4} percent={this.props.app.loginProgress}/>
                <form onSubmit={this.props.handleSubmit(this.Submit.bind(this))}>
                    <h2>0.0.5</h2>
                    <h2>The actual sheet lives here</h2>
                    <h2><a href={this.sheetLink}>PLANILHA</a></h2>
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

// Decorate with redux-form
export default BelowAppBar(LoginComponent);
