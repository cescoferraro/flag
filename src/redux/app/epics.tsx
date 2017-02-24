import {combineEpics} from "redux-observable";
import {Observable, Subscriber} from "rxjs";
import "rxjs";
import Utils from "../../shared/utils";
import {Serialize} from "../../shared/serializer";
import {push} from "connected-react-router";
import {LOGIN_ACTION_NAME, SET_WORKER_ACTION_NAME, EDIT_MODAL_STATE, SET_PROGRESS_BAR} from "./actions";
import * as moment from "moment";
import {dispatch} from "react-redux";


const loginEpic = action$ =>
        action$.ofType(LOGIN_ACTION_NAME)
            .mergeMap(action => (
                Observable.ajax({
                    method: "post",
                    url: Utils.API_URL("/login"),
                    body: Serialize({
                            email: action.payload.email,
                            password: action.payload.password
                        }
                    )
                }).mapTo(push("/dashboard/workers"))
                    .catch(error => Observable.of({
                        type: "PONG",
                        payload: error.xhr.response,
                        error: true
                    }))
            ))
    ;

const SerializeWorker = (form) => {
    let hey = JSON.parse(JSON.stringify(form));
    hey.birthdate = moment(form.birthdate);
    hey.salary = parseInt(form.salary);
    return hey
};


const setWorker = action$ =>
    action$.ofType(SET_WORKER_ACTION_NAME)
        .mergeMap(action => {
                let sub: Subscriber<any> = Subscriber.create(
                    (x: any) => {
                        action.payload.dispatch(SET_PROGRESS_BAR({progress: (x.loaded / x.total) * 100}))
                    },
                    null,
                    () => {
                        action.payload.dispatch(SET_PROGRESS_BAR({progress: 100}));
                        setTimeout(() => {
                            action.payload.dispatch(SET_PROGRESS_BAR({progress: 0, loading: false}))
                        }, 500)
                    }
                );
                return Observable.concat(
                    Observable.of(SET_PROGRESS_BAR({progress: 15})),
                    Observable.ajax(
                        {
                            method: "post",
                            progressSubscriber: sub,
                            url: Utils.API_URL("/" + action.payload.kind),
                            body: Serialize(SerializeWorker(action.payload.form))
                        }
                    ))
                    .flatMap(value => {
                        console.log("here====")
                        if (action.payload.kind === "add") {
                            return Observable.concat(
                                Observable.of(push("/dashboard/workers"))
                            )
                        }
                        if (action.payload.kind === "update" ||
                            action.payload.kind === "delete"
                        ) {
                            action.payload.refresh();
                            return Observable.concat(
                                Observable.of(EDIT_MODAL_STATE(false))
                            )

                        }

                        return
                    }).catch(error => Observable.of({
                        type: "PONG",
                        payload: error.xhr.response,
                        error: true
                    }))
            }
        );


export const AppEpics = combineEpics(
    loginEpic,
    setWorker
);
