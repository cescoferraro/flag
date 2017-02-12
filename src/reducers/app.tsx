import {handleActions} from "redux-actions";
import {SET_APP_BAR_MENU_ACTION_NAME, SET_ACTIVE_TAB_ACTION_NAME} from "../actions/app";


export const APP_DEFAULT_VALUES: APP_OBJECT = {
    component: null,
    version: "0.0.0",
    selectedTab: 1
};

const componentReducer = (state, action: Action<APP_OBJECT>) => {
    console.log(action);
    return {...state, component: action.payload.component};
};

const selectedTabReducer = (state, action: Action<APP_OBJECT>) => {
    console.log("===================");
    console.log(action);
    return {...state, selectedTab: action.payload.selectedTab};
};


export const AppActions = handleActions({
    [SET_APP_BAR_MENU_ACTION_NAME]: componentReducer,
    [SET_ACTIVE_TAB_ACTION_NAME]: selectedTabReducer
}, {});


