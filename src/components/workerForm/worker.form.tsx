import * as React from "react";
import * as moment from "moment";
import {connect, PromiseState} from "react-refetch";
import {connect as REDUX} from "react-redux";
import {reduxForm, Field} from "redux-form";
import {DatePicker, SelectField, TextField} from "redux-form-material-ui";
import MenuItem from "material-ui/MenuItem";
import {AppActions} from "../../redux/actions";
import "rxjs/add/observable/dom/ajax";
import LaddaButton, {XL, EXPAND_RIGHT} from "react-ladda";
import {RANDOM_USER} from "../../shared/random.user";
const faker = require('faker/locale/pt_BR');
const required = value => value === "" ? 'Required' : null;


@REDUX((state) => ({
    reduxForm: state.form,
    app: state.app,
    initialValues: state.app.editing
}), AppActions)
@reduxForm({form: 'editForm'})
export class FORMCESCO extends React.Component<any,any> {
    refs: any;
    state = {
        loading: false,
        progress: 0
    };


    componentWillUnmount() {
        this.props.SET_EDITING_USER(RANDOM_USER());
    }

    SerializeWorker(form) {
        let hey = JSON.parse(JSON.stringify(form));
        hey.birthdate = moment(form.birthdate);
        hey.salary = parseInt(form.salary);
        return hey
    }

    Submit(form) {
        this.props.SET_WORKER({
            form: form,
            kind: this.props.kind,
            refresh: this.props.refreshSheet,
            dispatch: this.props.dispatch,
        })
    }

    render() {
        const {handleSubmit, invalid, submitting, kind}= this.props;
        return (
            <div>
                <form ref="hello">

                    <Field ref="firstField"
                           name="name"
                           type="text"
                           floatingLabelText="Name"
                           required
                           component={TextField}
                           fullWidth={true}
                           floatingLabelFixed={true}
                           validate={[ required ]}
                           hintText="Name"/>
                    <Field name="job"
                           type="text"
                           validate={[ required ]}
                           floatingLabelText="Job"
                           component={TextField}
                           fullWidth={true}
                           floatingLabelFixed={true}
                           hintText="Designer"/>
                    <Field name="cpf"
                           type="text"
                           floatingLabelText="CPF"
                           required
                           component={TextField}
                           fullWidth={true}
                           floatingLabelFixed={true}
                           hintText={Math.floor(Math.random() * 8999999999 + 1000000000)}/>
                    <Field name="company"
                           floatingLabelText="Company"
                           fullWidth={true}
                           label="Company"
                           component={SelectField}
                           hintText="Select a company">
                        <MenuItem value="google.com" primaryText="Google.com"/>
                        <MenuItem value="apple.com" primaryText="Apple.com"/>
                        <MenuItem value="xvideos.com" primaryText="Xvideos.com"/>
                    </Field>

                    <Field name="birthdate"
                           format={null}
                           floatingLabelText="Birthdate"
                           fullWidth={true}
                           component={DatePicker}
                           hintText="Date of Birth"
                           label="Birthdate"/>
                    <Field name="race"
                           fullWidth={true}
                           component={SelectField}

                           floatingLabelText="Race"
                           hintText="Select a race">
                        <MenuItem value="asian" primaryText="Asian"/>
                        <MenuItem value="black" primaryText="Black"/>
                        <MenuItem value="white" primaryText="White"/>
                    </Field>
                    <Field name="salary"
                           type="number"
                           floatingLabelText="Salary"
                           required
                           component={TextField}
                           fullWidth={true}
                           floatingLabelFixed={true}
                           hintText={1000}/>

                </form>
                <LaddaButton
                    onClick={handleSubmit(this.Submit.bind(this))}
                    loading={this.props.app.progressBar.loading}
                    progress={this.props.app.progressBar.progress/100}
                    style={{width:"100%"}}
                    data-color="#eee"
                    data-size={XL}
                    disabled={submitting|| invalid}
                    data-style={EXPAND_RIGHT}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                >
                    {kind}
                </LaddaButton>

            </div>)
    }

}









