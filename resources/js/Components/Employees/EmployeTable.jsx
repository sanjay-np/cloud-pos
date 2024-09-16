import { FilePenLineIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
import { Divider, IconButton, Table } from 'rsuite'

export default function EmployeTable(props) {

    const { data, setTitle, setSelected, setDrawerState, setAlertState } = props
    const { Column, HeaderCell, Cell } = Table;

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const handleEditAction = () => {
            setTitle('Edit')
            setSelected(rowData[dataKey])
            setDrawerState(true)
        }
        const handleDeleteAction = () => {
            setSelected(rowData[dataKey])
            setAlertState(true)
        }
        return (
            <Cell {...props} className="link-group">
                <IconButton appearance="subtle" size='xs' onClick={handleEditAction} icon={<FilePenLineIcon size={18} />} />
                <Divider vertical />
                <IconButton appearance="subtle" size='xs' onClick={handleDeleteAction} icon={<Trash2Icon size={18} />} />
            </Cell>
        );
    }

    return (
        <React.Fragment>
            <Table data={data} bordered hover headerHeight={50} rowHeight={55} cellBordered autoHeight={true}>
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
                <Column flexGrow={1}>
                    <HeaderCell><span className="text-base text-gray-700">Status</span></HeaderCell>
                    <Cell dataKey="status" />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell><span className="text-base text-gray-700">Actions</span></HeaderCell>
                    <ActionCell dataKey="id" />
                </Column>
            </Table>
        </React.Fragment>
    )
}
