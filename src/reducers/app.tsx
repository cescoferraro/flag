import {handleActions} from "redux-actions";
import {
    SET_APP_BAR_MENU_ACTION_NAME, SET_ACTIVE_TAB_ACTION_NAME,
    SET_INSERT_PROGRESS_ACTION_NAME
} from "../actions/app";


export const APP_DEFAULT_VALUES: APP_OBJECT = {
    component: null,
    version: "0.0.0",
    selectedTab: 1,
    insertProgress: 33
};

const componentReducer = (state, action: Action<APP_OBJECT>) => {
    return {...state, component: action.payload.component};
};

const selectedTabReducer = (state, action: Action<APP_OBJECT>) => {
    return {...state, selectedTab: action.payload.selectedTab};
};


const InsertprogressReducer = (state, action: Action<APP_OBJECT>) => {
    return {...state, insertProgress: action.payload.insertProgress};
};


export const AppActions = handleActions({
    [SET_APP_BAR_MENU_ACTION_NAME]: componentReducer,
    [SET_ACTIVE_TAB_ACTION_NAME]: selectedTabReducer,
    [SET_INSERT_PROGRESS_ACTION_NAME]: InsertprogressReducer
}, {});


