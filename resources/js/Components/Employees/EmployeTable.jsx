import { FilePenLineIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
import { Checkbox, Divider, IconButton, Table } from 'rsuite'
import CheckCell from '../Table/CheckCell';

export default function EmployeTable(props) {

    const { data, setTitle, setSelected, setDrawerState, setAlertState } = props
    const { Column, HeaderCell, Cell } = Table;

    const ActionCell = ({ rowData, dataKey, ...props }) => {

    }

    return (
        <React.Fragment>
            <Table data={data} bordered hover headerHeight={50} rowHeight={55} cellBordered autoHeight={true}>
                <Column width={50} align="center">
                    <HeaderCell style={{ padding: 0 }}>
                        <div style={{ lineHeight: '40px' }}>
                            <Checkbox
                                inline
                                // checked={checked}
                                // indeterminate={indeterminate}
                                // onChange={handleCheckAll}
                            />
                        </div>
                    </HeaderCell>
                    <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
                </Column>
                <Column width={60} align="center" fixed>
                    <HeaderCell><span className="text-base text-gray-700">Id</span></HeaderCell>
                    <Cell dataKey="id" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className='text-base text-gray-700'>Employee Name</span></HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className="text-base text-gray-700">Phone No.</span></HeaderCell>
                    <Cell dataKey="phone" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className="text-base text-gray-700">Department</span></HeaderCell>
                    <Cell dataKey="department" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className="text-base text-gray-700">Position</span></HeaderCell>
                    <Cell dataKey="position" />
                </Column>
                <Column>
                    <HeaderCell><span className="text-base text-gray-700">Status</span></HeaderCell>
                    <Cell dataKey="status" />
                </Column>
                <Column width={120}>
                    <HeaderCell><span className="text-base text-gray-700">Actions</span></HeaderCell>
                    <ActionCell dataKey="id" />
                </Column>
            </Table>
        </React.Fragment>
    )
}
