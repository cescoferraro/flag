import * as React from "react";
import * as moment from "moment";
import {connect, PromiseState} from "react-refetch";
import {connect as REDUX} from "react-redux";
import {reduxForm, Field} from "redux-form";
import {DatePicker, SelectField, TextField} from "redux-form-material-ui";
import * as Rx from "rx-lite-dom";
import MenuItem from "material-ui/MenuItem";
import Utils from "../../shared/utils";
import {Serialize} from "../../shared/serializer";
import {AppActions} from "../../actions/index";
import RaisedButton from "material-ui/RaisedButton";

const toBRL = value => value && new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
}).format(value)


@REDUX((state) => ({
    app: state.app,
    initialValues: state.app.editing
}), AppActions)
@reduxForm({form: 'editForm'})
export class FORMCESCO extends React.Component<any,any> {
    progress = Rx.Observer.create(
        (x: ProgressEvent) => {
        },
        (err) => {
            console.log('observerError: ' + err);
            console.log('observerError: ' + err);
        },
        () => {
            console.log('CompletSET_INSERT_PROGRESSed');
        }
    );

    componentWillUnmount() {
        console.log("componentWillUnmount")
        this.props.SET_EDITING_USER({
            name: "",
            company: "",
            cpf: 0,
            race: "",
            job: "",
            salary: 0,
            birthdate: new Date()
        });
    }


    Submit(form) {
        const {handleSubmit, kind}= this.props;
        let hey = JSON.parse(JSON.stringify(form));
        hey.birthdate = moment(form.birthdate);
        hey.cpf = parseInt(form.cpf);
        hey.salary = parseInt(form.salary);
        console.log(hey);
        Rx.DOM.post({
            url: Utils.API_URL("/" + this.props.kind),
            progressObserver: this.progress,
            body: Serialize(hey)
        }).subscribe(() => {
            if (kind === "add") {
                console.log("actualy pushing /dashboard/workers!");
                console.log(this.props);

                this.props.replace("/dashboard/workers");
            }
            if (kind === "update") {
                this.props.refreshSheet();
                this.props.CLOSE_EDIT_MODAL();
            }
        })
    }

    render() {
        const {handleSubmit, kind}= this.props;
        console.log(this.props)
        return (
            <form onSubmit={handleSubmit(this.Submit.bind(this))}>
                <RaisedButton
                    fullWidth={true}
                    type="submit">{kind}</RaisedButton>

                <Field name="name"
                       type="text"
                       floatingLabelText="Name"
                       required
                       component={TextField}
                       fullWidth={true}
                       floatingLabelFixed={true}
                       hintText="Name"/>
                <Field name="job"
                       type="text"
                       floatingLabelText="Job"
                       required
                       component={TextField}
                       fullWidth={true}
                       floatingLabelFixed={true}
                       hintText="Designer"/>
                <Field name="cpf"
                       type="number"
                       floatingLabelText="CPF"
                       required
                       component={TextField}
                       fullWidth={true}
                       floatingLabelFixed={true}
                       hintText={Math.floor(Math.random() * 8999999999 + 1000000000)}/>
                <Field name="company"
                       fullWidth={true}
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
                       normalize={toBRL}
                       component={TextField}
                       fullWidth={true}
                       floatingLabelFixed={true}
                       hintText={1000}/>
            </form>)
    }

}

