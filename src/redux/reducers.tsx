import {combineReducers} from "redux";
import {AppReducer} from "./app/reducers";
import {reducer as formReducer} from "redux-form";
import * as moment from "moment";
declare let window: any;

export const allReducers = combineReducers({
    app: AppReducer,
    form: formReducer
});

export const FlagDefaultStore: AppReducers = {
    app: {
        component: null,
        version: "0.0.0",
        selectedTab: 1,
        insertProgress: 0,
        loginProgress: 0,
        progress: 10,
        editModal: false,
        editing: {
            name: "Novo Funcionário",
            race: "black",
            cpf: "01925411028",
            company: "google.com",
            birthdate: randomDate(),
            job: "Senior Helper",
            salary: 5345,
        }
    }
};

function randomDate() {
    let startDate: any = moment().subtract(50, 'years');
    let endDate: any = moment().subtract(18, 'years');
    let spaces = (endDate - startDate);
    let timestamp = Math.round(Math.random() * spaces);
    timestamp += startDate;
    return new Date(timestamp);
}

