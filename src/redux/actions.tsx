import {bindActionCreators} from "redux";
import {
    SET_APP_BAR_MENU,
    SET_ACTIVE_TAB,
    SET_PROGRESS,
    TOOGLE_EDIT_MODAL,
    CLOSE_EDIT_MODAL,
    OPEN_EDIT_MODAL,
    SET_EDITING_USER, PING
} from "./app/actions";


export const AppActions = (dispatch) => {
    return bindActionCreators({
        SET_APP_BAR_MENU: SET_APP_BAR_MENU,
        SET_ACTIVE_TAB: SET_ACTIVE_TAB,
        SET_PROGRESS: SET_PROGRESS,
        TOOGLE_EDIT_MODAL: TOOGLE_EDIT_MODAL,
        CLOSE_EDIT_MODAL: CLOSE_EDIT_MODAL,
        OPEN_EDIT_MODAL: OPEN_EDIT_MODAL,
        PING: PING,
        SET_EDITING_USER: SET_EDITING_USER
    }, dispatch);
};


