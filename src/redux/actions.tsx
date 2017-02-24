import {bindActionCreators} from "redux";
import {
    SET_APP_BAR_MENU,
    SET_ACTIVE_TAB,
    SET_EDITING_USER,
    LOGIN,
    SET_WORKER,
    SET_PROGRESS_BAR,
    EDIT_MODAL_STATE
} from "./app/actions";


export const AppActions = (dispatch) => {
    return bindActionCreators({
        SET_APP_BAR_MENU: SET_APP_BAR_MENU,
        SET_ACTIVE_TAB: SET_ACTIVE_TAB,
        EDIT_MODAL_STATE: EDIT_MODAL_STATE,
        LOGIN: LOGIN,
        SET_WORKER: SET_WORKER,
        SET_PROGRESS_BAR: SET_PROGRESS_BAR,
        SET_EDITING_USER: SET_EDITING_USER
    }, dispatch);
};


