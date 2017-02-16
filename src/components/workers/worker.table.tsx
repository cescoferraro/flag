import * as React from "react";
import {connect as REFETCH, PromiseState} from "react-refetch";
import SizeMe from "react-sizeme";
import {connect as REDUX} from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {ErrorComponent} from "../error/error";
import Utils from "../../shared/utils";
import {reduxForm, Field} from "redux-form";
import {DatePicker, SelectField, TextField} from "redux-form-material-ui";
import {EditModal} from "../workerForm/worker.modal";
import {getColumns} from "./worker.table.config";
import {AppActions} from "../../actions/index";
const Infinite = require('react-infinite');

@REDUX(state => ({app: state.app}), AppActions)
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
export class List extends React.Component<any, any> {

    componentDidMount() {
        this.props.SET_ACTIVE_TAB(1);
    }

    Edit(state, rowInfo, column, instance) {
        return {
            onClick: e => {
                this.props.SET_EDITING_USER(rowInfo.row);
                this.props.TOOGLE_EDIT_MODAL();
                rowInfo.row.birthdate = new Date(rowInfo.row.birthdate);
            }
        }
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        this.props.CLOSE_EDIT_MODAL();
    }

    render() {
        const {height} = this.props.size;
        const scroll = height - 48;
        const {sheet} = this.props;
        const columns = getColumns();
        console.info("height is ", height);
        if (sheet.pending) {
            return <h2>loaidng</h2>
        } else if (sheet.rejected) {
            return <ErrorComponent/>
        } else if (sheet.fulfilled) {
            console.log(this.props);
            return (<div style={{height:"calc( 100vh - 64px)"}}>
                <EditModal refreshSheet={this.props.refreshSheet}/>
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

