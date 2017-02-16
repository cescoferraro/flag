import {bindActionCreators} from "redux";
import {
    SET_ACTIVE_TAB,
    TOOGLE_EDIT_MODAL,
    SET_EDITING_USER,
    SET_INSERT_PROGRESS,
    SET_APP_BAR_MENU,
    CLOSE_EDIT_MODAL,
    SET_LOGIN_PROGRESS,
    OPEN_EDIT_MODAL
} from "./app";


export const AppActions = (dispatch) => {
    return bindActionCreators({
        SET_APP_BAR_MENU: SET_APP_BAR_MENU,
        SET_ACTIVE_TAB: SET_ACTIVE_TAB,
        SET_INSERT_PROGRESS: SET_INSERT_PROGRESS,
        SET_LOGIN_PROGRESS: SET_LOGIN_PROGRESS,
        TOOGLE_EDIT_MODAL: TOOGLE_EDIT_MODAL,
        CLOSE_EDIT_MODAL: CLOSE_EDIT_MODAL,
        OPEN_EDIT_MODAL: OPEN_EDIT_MODAL,
        SET_EDITING_USER: SET_EDITING_USER
    }, dispatch);
};
