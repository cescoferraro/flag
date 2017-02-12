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
    console.log("fired");
    console.log(index);
    return {
        type: SET_ACTIVE_TAB_ACTION_NAME,
        payload: {
            selectedTab: index
        }
    }
}
