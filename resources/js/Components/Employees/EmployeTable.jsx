import { Edit2Icon } from 'lucide-react';
import React from 'react'
import { Divider, IconButton, Table } from 'rsuite'

export default function EmployeTable({ data }) {
    const { Column, HeaderCell, Cell } = Table;

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        function handleAction() {
            alert(`id:${rowData[dataKey]}`);
        }
        return (
            <Cell {...props} className="link-group">
                <IconButton appearance="subtle" onClick={handleAction} icon={<Edit2Icon />} />
                <Divider vertical />
            </Cell>
        );
    }
        ;
    return (
        <React.Fragment>
            <Table
                data={data}
                bordered
                hover
                headerHeight={50}
                rowHeight={100}
            >
                <Column width={60} align="center" fixed>
                    <HeaderCell><span className="text-base">Id</span></HeaderCell>
                    <Cell dataKey="id" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className='text-base'>Employee Name</span></HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className="text-base">Phone No.</span></HeaderCell>
                    <Cell dataKey="phone" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className="text-base">Department</span></HeaderCell>
                    <Cell dataKey="department" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className="text-base">Position</span></HeaderCell>
                    <Cell dataKey="position" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className="text-base">Actions</span></HeaderCell>
                    <ActionCell dataKey="id" />
                </Column>
            </Table>
        </React.Fragment>
    )
}
