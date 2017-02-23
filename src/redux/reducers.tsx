import {combineReducers} from "redux";
import {AppReducer} from "./app/reducers";
import {reducer as formReducer} from "redux-form";
import * as moment from "moment";
import {RANDOM_USER} from "../shared/random.user";
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
        editModal: false,
        editing: RANDOM_USER(),
        progressBar: {
            loading: false,
            progress: 0
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

