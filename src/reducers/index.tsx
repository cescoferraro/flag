import {combineReducers} from "redux";
import app, {APP_DEFAULT_VALUES} from "./app";


export const allReducers = combineReducers({
    app: app
});

export const FlagDefaultStore: AppReducers = {
    app: APP_DEFAULT_VALUES
};

