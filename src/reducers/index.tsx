import {combineReducers} from "redux";
import {AppActions, APP_DEFAULT_VALUES} from "./app";

import { reducer as formReducer } from 'redux-form'

export const allReducers = combineReducers({
    app: AppActions,
    form: formReducer
});

export const FlagDefaultStore: AppReducers = {
    app: APP_DEFAULT_VALUES
};

