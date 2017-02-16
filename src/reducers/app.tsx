import {handleActions} from "redux-actions";
import {
    SET_APP_BAR_MENU_ACTION_NAME,
    SET_ACTIVE_TAB_ACTION_NAME,
    SET_INSERT_PROGRESS_ACTION_NAME,
    SET_LOGIN_PROGRESS_ACTION_NAME,
    TOOGLE_EDIT_MODAL_ACTION_NAME,
    SET_EDITING_USER_ACTION_NAME,
    CLOSE_EDIT_MODAL_ACTION_NAME,
    OPEN_EDIT_MODAL_ACTION_NAME
} from "../actions/app";


export const AppReducer = handleActions({
    [SET_APP_BAR_MENU_ACTION_NAME]: (state, action: Action<APP_OBJECT>) => {
        return {...state, component: action.payload.component};
    },
    [SET_ACTIVE_TAB_ACTION_NAME]: (state, action: Action<APP_OBJECT>) => {
        return {...state, selectedTab: action.payload.selectedTab};
    },
    [SET_INSERT_PROGRESS_ACTION_NAME]: (state, action: Action<APP_OBJECT>) => {
        return {...state, insertProgress: action.payload.insertProgress};
    },
    [SET_LOGIN_PROGRESS_ACTION_NAME]: (state, action: Action<APP_OBJECT>) => {
        return {...state, loginProgress: action.payload.loginProgress};
    },
    [TOOGLE_EDIT_MODAL_ACTION_NAME]: (state, action: Action<APP_OBJECT>) => {
        return {...state, editModal: !state.editModal};
    },
    [SET_EDITING_USER_ACTION_NAME]: (state, action: Action<APP_OBJECT>) => {
        return {...state, editing: action.payload.editing};
    },
    [CLOSE_EDIT_MODAL_ACTION_NAME]: (state, action: Action<APP_OBJECT>) => {
        return {...state, editModal: false};
    },
    [OPEN_EDIT_MODAL_ACTION_NAME]: (state, action: Action<APP_OBJECT>) => {
        return {...state, editModal: true};
    },
}, {});


