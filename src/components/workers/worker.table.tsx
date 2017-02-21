import * as React from "react";
import {connect as REFETCH, PromiseState} from "react-refetch";
import SizeMe from "react-sizeme";
import {connect as REDUX} from "react-redux";
import ReactTable from "react-table";
import Utils from "../../shared/utils";
import {reduxForm, Field} from "redux-form";
import {DatePicker, SelectField, TextField} from "redux-form-material-ui";
import {EditModal} from "../workerForm/worker.modal";
import {getColumns} from "./worker.table.config";
import {AppActions} from "../../redux/actions";
const Infinite = require('react-infinite');

@REFETCH(props => {
    const url = Utils.API_URL("/sheet");
    return {
        sheet: url,
        refreshSheet: () => ({
            sheet: {
                url,
                force: true,
                refreshing: true
            },
        })
    }
})
@SizeMe({monitorHeight: true})
@REDUX(state => ({app: state.app}), AppActions)
export class List extends React.Component<any, any> {

    componentDidMount() {
        this.props.SET_ACTIVE_TAB(1);
    }

    Edit(state, rowInfo, column, instance) {
        return {
            onClick: e => {
                let worker = JSON.parse(JSON.stringify(rowInfo.row));
                worker.birthdate = new Date(worker.birthdate);
                this.props.SET_EDITING_USER(worker);
                this.props.TOOGLE_EDIT_MODAL();
            }
        }
    }

    componentWillUnmount() {
        this.props.CLOSE_EDIT_MODAL();
    }

    hey() {
        console.log("hello");
        console.log(this.props);
        this.props.PING();
    }

    render() {
        const {height} = this.props.size;
        const scroll = height - 48;
        const {sheet} = this.props;
        const columns = getColumns();
        if (sheet.pending) {
            return <h2>loaidng</h2>
        } else if (sheet.rejected) {
            return <h2>error</h2>
        } else if (sheet.fulfilled) {
            return (<div style={{height:"calc( 100vh - 64px)"}}>
                <EditModal refreshSheet={this.props.refreshSheet}/>

                <button onClick={this.hey.bind(this)}>HELLO
                </button>
                <Infinite containerHeight={scroll}
                          elementHeight={[scroll]}>
                    <ReactTable
                        data={sheet.value}
                        getTdProps={this.Edit.bind(this)}
                        columns={columns}/>
                </Infinite>
            </div>);
        }
    }

}

