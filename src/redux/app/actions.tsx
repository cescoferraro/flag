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


export const SET_PROGRESS_BAR_ACTION_NAME = "SET_PROGRESS_BAR";
export function SET_PROGRESS_BAR({progress, loading = true}:
    {progress: number, loading?: boolean}): Action<APP_OBJECT> {
    return {
        type: SET_PROGRESS_BAR_ACTION_NAME,
        payload: {
            progressBar: {
                progress: progress,
                loading: loading
            }
        }
    }
}


export const EDIT_MODAL_STATE_ACTION_NAME = "EDIT_MODAL_STATE";
export function EDIT_MODAL_STATE(state: boolean): Action<APP_OBJECT> {
    return {
        type: EDIT_MODAL_STATE_ACTION_NAME,
        payload: {editModal: state}
    }
}


export const LOGIN_ACTION_NAME = "LOGIN";
export function LOGIN(form): Action<APP_OBJECT> {
    return {
        type: LOGIN_ACTION_NAME,
        payload: form
    }
}

export const SET_WORKER_ACTION_NAME = "SET_WORKER";
export function SET_WORKER(form): Action<APP_OBJECT> {
    return {
        type: SET_WORKER_ACTION_NAME,
        payload: form
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
