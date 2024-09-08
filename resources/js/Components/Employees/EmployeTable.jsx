import React from 'react'
import { Table } from 'rsuite'

export default function EmployeTable({ data }) {
    const { Column, HeaderCell, Cell } = Table;
    return (
        <React.Fragment>
            <Table
                data={data}
                bordered
                hover
                cellBordered
            >
                <Column width={60} align="center" fixed>
                    <HeaderCell className='text-sm'>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Employee Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Employee Phone No.</HeaderCell>
                    <Cell dataKey="phone" />
                </Column>
            </Table>
        </React.Fragment>
    )
}
