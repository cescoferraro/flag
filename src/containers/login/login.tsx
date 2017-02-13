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
declare let require, window: any;
let css = require('./login.pcss');
let GoogleDrive = require("-!babel-loader!svg-react-loader!../../shared/svg/drive.svg");

class LoginComponent extends React.Component<any, any> {
    sheetLink: string = "https://docs.google" +
        ".com/spreadsheets/d/1qqIcuAco_VzgvwOOehq" +
        "7P6my2ppZbyWUFW2Z8GQJ6MQ/edit?usp=sharing";

    Submit(form) {
        Rx.DOM.post({
            url: Utils.API_URL("/login"),
            body: Serialize({
                email: form.email,
                password: form.password
            })
        }).subscribe(() => {
            this.props.replace("/dashboard/workers")
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
            <form onSubmit={this.props.handleSubmit(this.Submit.bind(this))}>
                <Field name="email"
                       type="email"
                       floatingLabelText="Email"
                       required
                       component={TextField}
                       fullWidth={true}
                       floatingLabelFixed={true}
                       hintText="Email"/>
                <Field name="password"
                       type="password"
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
            </form>)
    }
}

// Decorate with redux-form
export default reduxForm({
    form: 'loginForm'
})(withStyles(css)(BelowAppBar(LoginComponent)));
