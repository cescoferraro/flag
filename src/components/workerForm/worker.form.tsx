import * as React from "react";
import * as moment from "moment";
import {connect, PromiseState} from "react-refetch";
import {connect as REDUX} from "react-redux";
import {reduxForm, Field} from "redux-form";
import {DatePicker, SelectField, TextField} from "redux-form-material-ui";
import MenuItem from "material-ui/MenuItem";
import {AppActions} from "../../redux/actions";
import {Subscriber, Observable} from "rxjs";
import Utils from "../../shared/utils";
import {Serialize} from "../../shared/serializer";
import "rxjs/add/observable/dom/ajax";
import LaddaButton, {XL, EXPAND_RIGHT} from "react-ladda";

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
        this.props.SET_EDITING_USER({
            name: "junior",
            company: "apple.com",
            cpf: "01925411028",
            race: "black",
            job: "Click Here!",
            salary: 0,
            birthdate: new Date()
        });
    }

    SerializeWorker(form) {
        let hey = JSON.parse(JSON.stringify(form));
        hey.birthdate = moment(form.birthdate);
        hey.salary = parseInt(form.salary);
        return hey
    }

    Submit(form) {
        this.setState({...this.state, progress: 0.05, loading: true});
        Observable.ajax({
            method: "post",
            url: Utils.API_URL("/" + this.props.kind),
            progressSubscriber: Subscriber.create(
                (x: any) => {
                    this.setState({
                        ...this.state,
                        progress: x.loaded / x.total
                    });
                },
                null,
                () => {
                    this.setState({
                        loading: false,
                        progress: 0
                    });

                }),
            body: Serialize(this.SerializeWorker(form))
        }).subscribe(() => {
            setTimeout(() => {
                if (this.props.kind === "add") {
                    this.props.replace("/dashboard/workers");
                }
                if (this.props.kind === "update") {
                    this.props.refreshSheet();
                    this.props.CLOSE_EDIT_MODAL();
                }
            }, 300)
        })
    }

    componentWillMount() {

    }

    render() {
        const {handleSubmit, invalid, submitting, kind}= this.props;
        let name, job;
        console.log(this.props);
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
                    loading={this.state.loading}
                    progress={this.state.progress}
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

const dotI = (val) => {
    console.log();
    console.log(val.substr(4, 7));
    return val.substr(0, 3) + "-" + val.substr(3, 3) + "-" + val.substr(6, 3) + "/" + val.substr(10, 3)
};


const cpfNormalizer = (value) => {
    let newstring;
    if (value.length === 11) {
        return value
    } else if (value.length < 11) {
        let zeros = "";
        for (let i = 1; i <= 11 - value.length; i++) {
            zeros = "0" + zeros;
        }
        newstring = zeros + value;
    } else if (value.length > 11) {
        newstring = value.substr(value.length - 11);
    }
    return newstring
};


const TestaCPF = (strCPF) => !TestaCPFFunction(strCPF) ? "No valid CPF" : null;


const validateBirthdate = (date) => moment(date) > moment(date).subtract(18, 'years') ? "Too young to work" : null;


const TestaCPFFunction = (strCPF) => {
    let Soma;
    let Resto;
    Soma = 0;

    if (strCPF == "00000000000") {
        return false
    }
    for (let i = 1; i <= 9; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) {
        Resto = 0
    }
    if (Resto != parseInt(strCPF.substring(9, 10))) {
        return false
    }
    Soma = 0;
    for (let i = 1; i <= 10; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    }
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) {
        Resto = 0
    }
    return Resto == parseInt(strCPF.substring(10, 11));
};



