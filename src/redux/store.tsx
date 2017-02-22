import {createStore, applyMiddleware, compose} from "redux";
import {allReducers, FlagDefaultStore} from "./reducers";
import Utils from "../shared/utils";
import {routerMiddleware, connectRouter} from "connected-react-router";
import {createEpicMiddleware} from "redux-observable";
import {RootEpic} from "./epics";
declare let window, module: any;
const createLogger = require(`redux-logger`);


let ReplacebleEpicMiddleware = createEpicMiddleware(RootEpic);

const middle = (history = {}) => {
    if (Utils.isServer()) {
        return applyMiddleware(
            routerMiddleware(history),
            ReplacebleEpicMiddleware
        );
    } else {
        let DEV_TOOL = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        let composeEnhancers = DEV_TOOL || compose;
        return composeEnhancers(
            applyMiddleware(
                ReplacebleEpicMiddleware,
                createLogger({
                    predicate: (getState, action) => !action.type.startsWith("@@redux-form"),
                    collapsed: (getState, action) => true
                }),
                routerMiddleware(history),
            )
        );
    }
};


export const store = (history = {}) => {
    let store = createStore(
        connectRouter(history)(allReducers),
        FlagDefaultStore,
        middle(history)
    );


    if (module.hot) {

        // Enable Webpack hot module replacement !== AUTH_REMOVE_TOKEN for reducers
        module.hot.accept(['./reducers.tsx', "./epics.tsx"], () => {
            const nextRootEpic = require('./epics.tsx').RootEpic;
            const nextRootReducer = require('./reducers.tsx').allReducers;
            store.replaceReducer(connectRouter(history)(nextRootReducer));
            ReplacebleEpicMiddleware.replaceEpic(nextRootEpic);
        });
    }
    return store;
};
