import {combineReducers} from "redux";
import {AppActions, APP_DEFAULT_VALUES} from "./app";


export const allReducers = combineReducers({
    app: AppActions
});

export const FlagDefaultStore: AppReducers = {
    app: APP_DEFAULT_VALUES
};

