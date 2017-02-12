import * as React from "react";
import {connect, PromiseState} from "react-refetch";
import SizeMe from "react-sizeme";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {ErrorComponent} from "../error/error";
import * as moment from "moment";
import Utils from "../../shared/utils";

class ListComponent extends React.Component<any, any> {
    render() {
        const {sheet, sheets} = this.props;
        const columns = getColumns();
        if (sheet.pending) {
            return <h2>loaidng</h2>
        } else if (sheet.rejected) {
            return <ErrorComponent/>
        } else if (sheet.fulfilled) {
            return <div>
                <ReactTable
                    data={sheet.value}
                    columns={columns}/>
            </div>
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
