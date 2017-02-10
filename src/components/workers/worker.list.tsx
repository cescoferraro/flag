import * as React from "react";
import { connect, PromiseState } from "react-refetch";
import Utils from "../../shared/utils";
import SizeMe from 'react-sizeme';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class ListComponent extends React.Component<any, any> {
    render() {
        const { width, height } = this.props.size;
        const { sheet } = this.props
        if (sheet.pending) {
            return <h2>loaidng</h2>
        } else if (sheet.rejected) {
            return <h2>error</h2>
        } else if (sheet.fulfilled) {

            console.log(sheet.value[0])
            return <div>
                <ReactTable
                    data={sheet.value}
                    columns={columns} />
            </div>
        }
    }

};


const columns = [{
    header: 'Name',
    accessor: 'Name' // String-based value accessors !
}, {
    header: 'CPF',
    accessor: 'ID',
    render: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
    header: 'Race',
    accessor: 'Race' // Custom value accessors!
}, {
    header: "Birthdate", // Custom header components!
    accessor: 'Birthdate'
}, {
    header: "Job", // Custom header components!
    accessor: 'Job'
}, {
    header: "Company", // Custom header components!
    accessor: 'Company'
}, {
    header: "Salary", // Custom header components!
    accessor: 'Salary'
}


]



export const List = connect(props => ({
    sheet: Utils.API_URL("/sheet")
}))(SizeMe({ monitorHeight: true })(ListComponent));
