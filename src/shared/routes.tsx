import * as React from "react";
import {Route} from "react-router-dom";

export const RouteWithSubRoutes = (route) => (
    <Route path={route.path}
           exact={route.exact|| false}
           render={props => {
               return ( <route.component {...props} routes={route.routes}/>)
           }}/>
);


export const BelowAppBar = (Component) => (props => (
    <div style={{height:"calc( 100vh - 64px)",marginTop:"64px"}}>
        <Component {...props}/>
    </div>
));
