declare const NODE_ENV, module, require, window: any;
import * as React from "react";
import FlagApp from "./app";
import {AppContainer} from "react-hot-loader";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import {render} from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {allReducers, FlagDefaultStore} from "./reducers/index";
import {BrowserRouter, Route, Link} from "react-router-dom";
import WithStylesContext from "./shared/stylesComponent";
import {StyleRoot} from "radium";
import {withAsyncComponents} from "react-async-component";
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const theme = getMuiTheme({}, {userAgent: navigator.userAgent});
const rootEl = document.getElementById("container");
require('isomorphic-fetch');

injectTapEventPlugin();
const store = createStore(allReducers, FlagDefaultStore, reduxDevTools);


const renderApp = NextApp => {
    let app = <AppContainer>
        <WithStylesContext onInsertCss={styles => styles._insertCss()}>
            <MuiThemeProvider muiTheme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        {NextApp}
                    </BrowserRouter>
                </Provider>
            </MuiThemeProvider>
        </WithStylesContext>
    </AppContainer>;
    withAsyncComponents(app).then(({appWithAsyncComponents}) =>
        render(appWithAsyncComponents, rootEl),
    );
};

renderApp(FlagApp({userAgent: navigator.userAgent}));

//
if (module.hot) {
    module.hot.accept("./app.tsx", () => {
        const NextApp = require("./app.tsx").default;
        renderApp(NextApp({userAgent: navigator.userAgent}));
    });
}
