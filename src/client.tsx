import * as React from "react";
import FlagApp from "./app";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import {Provider} from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {BrowserRouter, Route, Link} from "react-router-dom";
import {StyleRoot} from "radium";
import {withAsyncComponents} from "react-async-component";
import {ConnectedRouter} from "connected-react-router";
import {unmountComponentAtNode} from "react-dom";
import {renderApp} from "./render";
declare const NODE_ENV, module, require, window: any;
require('isomorphic-fetch');
injectTapEventPlugin();

console.log("Booting up Client Side")


renderApp(FlagApp({userAgent: navigator.userAgent}));
console.log("Finished rendering app");

if (module.hot) {
    module.hot.accept(["./app.tsx","./redux/store.tsx","./render.tsx"], () => {
        console.log("attempting to reload the app");
        unmountComponentAtNode(document.getElementById("container"));
        const NextApp = require("./app.tsx").default;
        const newREnderapp = require("./render.tsx").renderApp;
        newREnderapp(NextApp({userAgent: navigator.userAgent}));
    });

}
