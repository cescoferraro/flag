import * as React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {StyleRoot} from "radium";
import {withAsyncComponents} from "react-async-component";
import {ConnectedRouter} from "connected-react-router";
import {AppContainer} from "react-hot-loader";
import {render} from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import WithStylesContext from "./shared/stylesComponent";
import {store} from "./redux/store";
import {createBrowserHistory} from "history";
import {MyTheme} from "./shared/material.theme";
declare const NODE_ENV, module, require, window: any;


export const renderApp = (NextApp) => {
    const history = createBrowserHistory();
    let app = <AppContainer>
        <WithStylesContext onInsertCss={styles => styles._insertCss()}>
            <MuiThemeProvider muiTheme={MyTheme(navigator.userAgent)}>
                <Provider store={store(history)}>
                    <ConnectedRouter history={history}>
                        {NextApp}
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        </WithStylesContext>
    </AppContainer>;
    render(app, document.getElementById("container"))

};

