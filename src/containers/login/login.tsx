declare let require, window: any;
import * as React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {reduxForm, Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import IconButton from "material-ui/IconButton";
import {connect} from "react-redux";
import {AppActions} from "../../redux/actions";
import {BellowAppShell} from "../../shared/bellow.decorator";
import {Debug} from "../../shared/debug";

const css = require('./login.pcss');
const GoogleDrive = require("-!babel-loader!svg-react-loader!../../shared/svg/drive.svg");

@withStyles(css)
@BellowAppShell()
@reduxForm({form: 'loginForm'})
@connect((state) => ({app: state.app}), AppActions)
@Debug()
export class LoginComponent extends React.Component<any, any> {
    sheetLink: string = "https://docs.google" +
        ".com/spreadsheets/d/1qqIcuAco_VzgvwOOehq" +
        "7P6my2ppZbyWUFW2Z8GQJ6MQ/edit?usp=sharing";

    Submit(form) {
        this.props.LOGIN(form)
    }

    render() {
        this.props.console("About to render");
        const {handleSubmit}= this.props;
        return (
            <div className={css.container}>
                <form onSubmit={handleSubmit(this.Submit.bind(this))}>
                    <h2><a href={this.sheetLink}>Sheet</a></h2>
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
                                className={css.button}
                    >
                        <GoogleDrive />
                    </IconButton>
                </form>
            </div>)
    }
}

