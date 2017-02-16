export const SET_APP_BAR_MENU_ACTION_NAME = "SET_APP_BAR_MENU";
export function SET_APP_BAR_MENU(component: JSX.Element): Action<APP_OBJECT> {
    return {
        type: SET_APP_BAR_MENU_ACTION_NAME,
        payload: {
            component: component
        }
    }
}


export const SET_ACTIVE_TAB_ACTION_NAME = "SET_ACTIVE_TAB";
export function SET_ACTIVE_TAB(index: Number): Action<APP_OBJECT> {
    return {
        type: SET_ACTIVE_TAB_ACTION_NAME,
        payload: {
            selectedTab: index
        }
    }
}


export const SET_INSERT_PROGRESS_ACTION_NAME = "SET_INSERT_PROGRESS";
export function SET_INSERT_PROGRESS(index: Number): Action<APP_OBJECT> {
    return {
        type: SET_INSERT_PROGRESS_ACTION_NAME,
        payload: {
            insertProgress: index
        }
    }
}

export const SET_LOGIN_PROGRESS_ACTION_NAME = "SET_LOGIN_PROGRESS";
export function SET_LOGIN_PROGRESS(index: Number): Action<APP_OBJECT> {
    return {
        type: SET_LOGIN_PROGRESS_ACTION_NAME,
        payload: {
            loginProgress: index
        }
    }
}

export const TOOGLE_EDIT_MODAL_ACTION_NAME = "TOOGLE_EDIT_MODAL";
export function TOOGLE_EDIT_MODAL(): Action<APP_OBJECT> {
    return {
        type: TOOGLE_EDIT_MODAL_ACTION_NAME,
        payload: {}
    }
}


export const CLOSE_EDIT_MODAL_ACTION_NAME = "CLOSE_EDIT_MODAL";
export function CLOSE_EDIT_MODAL(): Action<APP_OBJECT> {
    return {
        type: CLOSE_EDIT_MODAL_ACTION_NAME,
        payload: {}
    }
}


export const OPEN_EDIT_MODAL_ACTION_NAME = "OPEN_EDIT_MODAL";
export function OPEN_EDIT_MODAL(): Action<APP_OBJECT> {
    return {
        type: OPEN_EDIT_MODAL_ACTION_NAME,
        payload: {}
    }
}


export const SET_EDITING_USER_ACTION_NAME = "SET_EDITING_USER";
export function SET_EDITING_USER(worker: FlagWorker): Action<APP_OBJECT> {
    return {
        type: SET_EDITING_USER_ACTION_NAME,
        payload: {
            editing: worker
        }
    }
}
