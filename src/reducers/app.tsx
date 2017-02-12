import {handleActions} from "redux-actions";
import {SET_APP_BAR_MENU_ACTION_NAME} from "../actions/app";


export const APP_DEFAULT_VALUES: APP_OBJECT = {
    component: null,
    version: "0.0.0"
};

const componentReducer = (state: APP_OBJECT, action: Action<APP_OBJECT>): APP_OBJECT => {
    return {
        version: state.version,
        component: action.payload.component
    };
};


const app = handleActions({
    [SET_APP_BAR_MENU_ACTION_NAME]: componentReducer
}, {});


export default app;
