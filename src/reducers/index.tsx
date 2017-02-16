import {combineReducers} from "redux";
import {AppReducer} from "./app";
import {reducer as formReducer} from "redux-form";

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
            name: "sfsdfds",
            race: "",
            job: "",
            salary: 5345,
        }
    }
};

