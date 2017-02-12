export const SET_APP_BAR_MENU_ACTION_NAME = "SET_APP_BAR_MENU";
export function SET_APP_BAR_MENU(component: JSX.Element): Action<APP_OBJECT> {
    return {
        type: SET_APP_BAR_MENU_ACTION_NAME,
        payload: {
            component: component
        }
    }
}

