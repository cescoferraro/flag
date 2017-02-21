import * as React from "react";
import {Provider} from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {BrowserRouter} from "react-router-dom";
import {StyleRoot} from "radium";
import {withAsyncComponents} from "react-async-component";
import {ConnectedRouter} from "connected-react-router";
import {AppContainer} from "react-hot-loader";
import {render} from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import WithStylesContext from "./shared/stylesComponent";
import {store} from "./redux/store";
declare const NODE_ENV, module, require, window: any;


const theme = getMuiTheme({}, {userAgent: navigator.userAgent});

export const renderApp = (NextApp) => {
    let AppStore = store();

    let app = <AppContainer>
        <WithStylesContext onInsertCss={styles => styles._insertCss()}>
            <MuiThemeProvider muiTheme={theme}>
                <Provider store={AppStore}>
                    <BrowserRouter >
                        {NextApp}
                    </BrowserRouter>
                </Provider>
            </MuiThemeProvider>
        </WithStylesContext>
    </AppContainer>;
    withAsyncComponents(app).then(({appWithAsyncComponents}) =>
        render(appWithAsyncComponents, document.getElementById("container")),
    );
};

