import *  as injectTapEventPlugin from "react-tap-event-plugin";
import * as React from "react";
import FlagApp from "./app";
import * as ReactDOMServer from "react-dom/server";
import {HTML} from "./components/universal/html";
import {StaticRouter} from "react-router-dom";
import {Provider} from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import WithStylesContext from "./shared/stylesComponent";
import {StyleRoot} from "radium";
import {withAsyncComponents} from "react-async-component";
import createServerRenderContext from "react-router/createServerRenderContext";
import {store} from "./redux/store";
declare let require: any;
injectTapEventPlugin();

declare let global: any;


export default  () => (request, response) => {
    const context = createServerRenderContext();
    const result = context.getResult();
    if (result.redirect) {
        let url = `${result.redirect.pathname}${result.redirect.followLabelTopN}`;
        response.redirect(302, url);
    } else {

        if (result.missed) {
            response.status(404);
        } else {
            response.status(200);
        }


        let css = []; // CSS fodashboardr all rendered React components
        let userAgent = request.headers['user-agent'];
        let App =
            <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
                <MuiThemeProvider muiTheme={getMuiTheme({userAgent: userAgent})}>
                    <Provider store={store()}>
                        <StaticRouter location={request.url} context={context}>
                            <FlagApp userAgent={userAgent}/>
                        </StaticRouter>
                    </Provider>
                </MuiThemeProvider>
            </WithStylesContext>;


        withAsyncComponents(App)
            .then((result) => {
                response.send("<!DOCTYPE html>" +
                    ReactDOMServer.renderToStaticMarkup(
                        <HTML userAgent={userAgent} css={css} result={result}/>
                    ));
            });


    }
};



