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
                     hideDelay={0.6 }
                     speed={0.01}
                     style={{
                         marginTop:"64px",
                     display:app.progressBar.loading?"block":"none",
                     zIndex:"29999"}}
                     color="red"
                     height={4} percent={app.progressBar.progress}/>
});


