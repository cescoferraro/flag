import * as moment from "moment";
import * as React from "react";

export const getColumns = () => {
    return [{
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
        render: props => <span >{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        }).format(props.value)}</span>
    }
    ]
};


