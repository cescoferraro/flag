import * as React from "react";
import {ssrBehavior} from "react-md-spinner";

export let HEAD = ({title, css, userAgent}) => {
    return (<head>
        <meta charSet="utf-8"/>
        <link rel="manifest" href="/icons/manifest.json"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{title}</title>
        <Styler rules={css.join('')}/>
        <Styler rules={ssrBehavior.getStylesheetString(userAgent)}/>

    </head>)
};


let Styler = ({rules}) => {
    return <style type="text/css"
                  dangerouslySetInnerHTML={ {__html: rules} }/>
};
