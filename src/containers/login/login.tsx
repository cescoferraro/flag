import Utils from "../../shared/utils";
import * as React from "react";
import * as Rx from "rx-lite-dom";
import {Observable} from "rx-lite-dom";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import {Button} from "rebass";
import TextField from "material-ui/TextField";
import {createAsyncComponent} from "react-async-component";
import {BelowAppBar} from "../../shared/routes";
declare let require, window: any;
let css = require('./login.pcss');


class LoginComponent extends React.Component<any, any> {
    context: any;
    static contextTypes = {router: React.PropTypes.object};

    catchErrors(err) {
        console.error("error: ", err);
        return Observable.empty();
    }

    login(event) {
        console.log(event.target.elements.email.value);
        event.preventDefault();

        const body = {
            email: event.target.elements.email.value,
            password: event.target.elements.password.value
        };
        console.log(body);
        Rx.DOM.post(Utils.API_URL("/login"), require('serialize-javascript')(body))
            .catch(this.catchErrors)
            .subscribe(
                (xhr: XMLHttpRequest) => {
                    let me: User = JSON.parse(xhr.response);
                    console.log(me);
                    console.log(this.context.router);
                    this.context.router.go("/dashboard/workers");
                    this.context.router.goForward("/dashboard/workers");
                    this.context.router.replace("/dashboard/workers");
                });

    }

    render() {
        return (
            <div className={css.page}>
                <div className={css.container}>
                    <form onSubmit={this.login.bind(this)} className={css.form}>
                        <Card>
                            <TextField
                                defaultValue={"cesco@gmail.com"}
                                type="email"
                                id="email"
                                name="email"
                                floatingLabelText="Email"
                                fullWidth={true}
                                hintText="Hint Text"
                            /><br />

                            <TextField
                                fullWidth={true}
                                defaultValue={"cesco12"}
                                type="password"
                                floatingLabelText="Password"
                                id="password"
                                name="password"
                                hintText="Hint Text"
                            />
                            <br />


                        </Card>
                        <br />
                        <CardActions>
                            <Button>LOGIN </Button>
                        </CardActions>
                    </form>
                </div>
            </div>)
    }
}


export default withStyles(css)(BelowAppBar(LoginComponent));
