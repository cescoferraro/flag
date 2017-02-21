import {combineEpics} from "redux-observable";
import "rxjs";
import {AppEpics} from "./app/epics";
declare let module: any;



export const RootEpic = combineEpics(
    AppEpics
);




