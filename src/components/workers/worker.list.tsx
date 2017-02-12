import * as React from "react";
import {connect, PromiseState} from "react-refetch";
import SizeMe from "react-sizeme";
import {connect as REDUX} from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {ErrorComponent} from "../error/error";
import * as moment from "moment";
import Utils from "../../shared/utils";
import {bindActionCreators} from "redux";
import {SET_ACTIVE_TAB} from "../../actions/app";
const Infinite = require('react-infinite');


export const mapDispatchToPmapStaterops = (dispatch) => {
    return bindActionCreators({SET_ACTIVE_TAB: SET_ACTIVE_TAB}, dispatch);
};

//
// let GraphComponent = ({size, sheet, app, SET_ACTIVE_TAB}) => {
@REDUX((state) => ({app: state.app}), mapDispatchToPmapStaterops)
class ListComponent extends React.Component<any, any> {


    componentDidMount() {
        this.props.SET_ACTIVE_TAB(1);
    }

    render() {
        const {height, width} = this.props.size;
        const scroll = height - 48;
        const {sheet, sheets} = this.props;
        const columns = getColumns();
        if (sheet.pending) {
            return <h2>loaidng</h2>
        } else if (sheet.rejected) {
            return <ErrorComponent/>
        } else if (sheet.fulfilled) {
            return <Infinite containerHeight={scroll}
                             elementHeight={[scroll]}>
                <ReactTable
                    data={sheet.value}
                    columns={columns}/>
            </Infinite>
        }
    }

}
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
});

const getColumns = () => ([{
    header: 'Name',
    accessor: 'name' // String-based value accessors !
}, {
    header: 'CPF',
    accessor: 'cpf',
    render: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
    header: 'Race',
    accessor: 'race' // Custom value accessors!
}, {
    header: "Birthdate", // Custom header components!
    accessor: 'birthdate',
    render: props => <span className='number'>{moment(props.value).format("L")}</span> // Custom cell components!
}, {
    header: "Job", // Custom header components!
    accessor: 'job'
}, {
    header: "Company", // Custom header components!
    accessor: 'company'
}, {
    header: "Salary", // Custom header components!
    accessor: 'salary',
    render: props => <span >{formatter.format(props.value)}</span>
}
]);


export const List = connect(props => ({
    sheet: Utils.API_URL("/sheet")
}))(SizeMe({monitorHeight: true})(ListComponent));
