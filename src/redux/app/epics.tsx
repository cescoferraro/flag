import {combineEpics} from "redux-observable";


const pingEpic = action$ =>
    action$
        .filter(action => {
            return action.type === 'PING'
        })
        .map(value => {
            console.log(value);
            console.log(value);
            console.log(value);
            return value
        })
        .mapTo({type: 'PONG'});

export const AppEpics = combineEpics(
    pingEpic
);
