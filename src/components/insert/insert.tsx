import {connect} from "react-redux";
import * as React from "react";
import * as Rx from "rx-lite-dom";
import {Observable} from "rx-lite-dom";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {Button} from "rebass";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {createAsyncComponent} from "react-async-component";
import Utils from "../../shared/utils";
import {Serialize} from "../../shared/serializer";
import {bindActionCreators} from "redux";
import {SET_ACTIVE_TAB, SET_INSERT_PROGRESS} from "../../actions/app";
import RaisedButton from "material-ui/RaisedButton";
import * as Progress from "react-progress";
declare let require, window: any;
let css = require('./insert.pcss');
const Infinite = require('react-infinite');

export const mapDispatchToPmapStaterops = (dispatch) => {
    return bindActionCreators({
        SET_ACTIVE_TAB: SET_ACTIVE_TAB,
        SET_INSERT_PROGRESS: SET_INSERT_PROGRESS,
    }, dispatch);
};

//
// let GraphComponent = ({size, sheet, app, SET_ACTIVE_TAB}) => {
@connect((state) => ({app: state.app}), mapDispatchToPmapStaterops)
export class InsertComponent extends React.Component<any,any> {
    state = {race: 1, company: 1};
    showProgress: boolean = true;
    refs: {
        race: any;
    };


    componentDidMount() {
        this.props.SET_ACTIVE_TAB(3);
    }

    raceChange(event, index, value) {

        this.setState({...this.state, race: value})

    }

    companyChange(event, index, value) {
        this.setState({...this.state, company: value})
    }

    Insert(event) {
        this.props.SET_INSERT_PROGRESS(0);
        this.props.SET_INSERT_PROGRESS(20);
        event.preventDefault();
        let race;
        switch (this.state.race) {
            case 1:
                race = "black";
                break;
            case 2:
                race = "white";
                break;
            case 3:
                race = "asian";
                break;
        }
        let company;
        switch (this.state.company) {
            case 1:
                company = "google.com";
                break;
            case 2:
                company = "apple.com";
                break;
        }


        const body = {
            name: event.target.elements.name.value,
            cpf: parseInt(event.target.elements.cpf.value),
            race: race,
            birthdate: new Date(event.target.elements.birthdate.value),
            job: event.target.elements.job.value,
            company: company,
            salary: parseInt(event.target.elements.salary.value)
        };

        const progressObserver = Rx.Observer.create(
            (x: ProgressEvent) => {
                console.log(x);
                console.log('Next: ' + x.total);
                let percentage = (x.loaded / x.total) * 100;
                console.log(percentage);
                this.props.SET_INSERT_PROGRESS(percentage)
            },
            (err) => {
                console.log('observerError: ' + err);
            },
            () => {
                this.props.SET_INSERT_PROGRESS(100);
                console.log('Completed');
            }
        );
        Rx.DOM.post({
            url: Utils.API_URL("/add"),
            body: Serialize(body),
            progressObserver: progressObserver
        }).subscribe(
            (xhr: XMLHttpRequest) => {
                let me: User = JSON.parse(xhr.response);
                this.showProgress = false;
                setTimeout(() => {
                    console.log("here");
                    this.props.SET_INSERT_PROGRESS(0);
                    this.showProgress = true;
                }, 500);

            });
    }


    render() {
        console.log(this.props);
        const {height, width} = this.props.size;
        const scroll = height - 48;
        const display = this.showProgress ? "grid" : "none";
        console.log(this.showProgress);
        console.log(display);
        return <div >
            <Progress id="progress" speed={0.2}
                      style={{marginTop:"64px",display:display
                      }} color="red"
                      height={4} percent={this.props.app.insertProgress}/>
            <Infinite containerHeight={scroll}
                      elementHeight={[scroll]}>

                <form onSubmit={this.Insert.bind(this)} className={css.form}>
                    <Card>
                        <TextField
                            defaultValue={"Rivaldo"}
                            type="text"
                            id="name"
                            name="name"
                            floatingLabelText="name"
                            fullWidth={true}
                            hintText="Brad / Julia"
                        /><br />

                        <TextField
                            fullWidth={true}
                            defaultValue={Math.floor(Math.random() * 8999999999 + 1000000000)}
                            type="number"
                            floatingLabelText="CPF"
                            id="cpf"
                            name="cpf"
                            hintText="00000000000"
                        />


                        <SelectField
                            ref="race"
                            fullWidth={true}
                            type="text"
                            floatingLabelText="Race"
                            id="race"
                            name="race"
                            onChange={this.raceChange.bind(this)}
                            value={this.state.race}>
                            <MenuItem value={1} primaryText="black"/>
                            <MenuItem value={2} primaryText="white"/>
                            <MenuItem value={3} primaryText="asian"/>

                        </SelectField>


                        <TextField
                            fullWidth={true}
                            defaultValue={"1966-12-30"}
                            type="date"
                            required
                            floatingLabelText="birthdate"
                            id="birthdate"
                            name="birthdate"
                            hintText="18/12/1966"
                        />


                        <TextField
                            fullWidth={true}
                            defaultValue={"Designer"}
                            type="text"
                            floatingLabelText="Job"
                            id="job"
                            name="job"
                            hintText="Designer/Coder"
                        />


                        <SelectField
                            fullWidth={true}
                            type="text"
                            floatingLabelText="Company"
                            id="company"
                            name="company"
                            onChange={this.companyChange.bind(this)}
                            value={this.state.company}>
                            <MenuItem value={1}
                                      label="google.com"
                                      primaryText="google.com"/>
                            <MenuItem value={2}
                                      label="apple.com"
                                      primaryText="apple.com"/>

                        </SelectField>


                        <TextField
                            fullWidth={true}
                            defaultValue={3000}
                            type="number"
                            floatingLabelText="Salary"
                            id="salary"
                            name="salary"
                            hintText="4000"
                        />
                        <br/>
                        <br />
                        <CardActions>

                            <RaisedButton type="submit"
                                          buttonStyle={{backgroundColor:"#43A047"}}
                                          fullWidth={true}
                                          primary={true}>
                                ADD WORKER
                            </RaisedButton>
                        </CardActions>




                    </Card>

                </form>

            </Infinite>

        </div>
    }
}


false
