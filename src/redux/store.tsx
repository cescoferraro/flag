import {createStore, applyMiddleware, compose} from "redux";
import {allReducers, FlagDefaultStore} from "./reducers";
import Utils from "../shared/utils";
import {routerMiddleware, connectRouter} from "connected-react-router";
import {createEpicMiddleware} from "redux-observable";
import {RootEpic} from "./epics";
declare let window, module: any;
const createLogger = require(`redux-logger`);


let ReplacebleEpicMiddleware = createEpicMiddleware(RootEpic);

const middle = () => {
    let mid = applyMiddleware(ReplacebleEpicMiddleware, createLogger({
        collapsed: (getState, action) => true
    }));
    if (Utils.isServer()) {
        return mid;
    } else {
        let DEV_TOOL = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        let composeEnhancers = DEV_TOOL || compose;
        return composeEnhancers(mid);
    }
};


export const store = () => {
    let store = createStore(allReducers, FlagDefaultStore, middle());
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(['./reducers.tsx', "./epics.tsx"], () => {
            const nextRootEpic = require('./epics.tsx').RootEpic;
            const nextRootReducer = require('./reducers.tsx').allReducers;
            store.replaceReducer(nextRootReducer);
            ReplacebleEpicMiddleware.replaceEpic(nextRootEpic);
        });
    }
    return store;
};
