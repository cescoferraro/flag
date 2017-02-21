import * as React from "react";
import {connect as REDUX} from "react-redux";
import * as Progress from "react-progress";
import {AppActions} from "../../redux/actions";
import compose from "recompose/compose";

const enhance = compose(
    REDUX(state => ({app: state.app}), AppActions)
);

export const ProgressBar = enhance(({app}) => {
    return <Progress id="progress"
                     speed={0.2}
                     style={{marginTop:"64px",zIndex:"29999"}}
                     color="red"
                     height={4} percent={app.progress}/>
});


