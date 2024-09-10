import { FilePenIcon, FilePenLineIcon, Trash2Icon, UserRoundPenIcon, UserRoundSearchIcon } from 'lucide-react';
import React from 'react'
import { Divider, IconButton, Table } from 'rsuite'

export default function EmployeTable(props) {

    const { data, setSelectedId, setEditModal, setDeleteModal } = props
    const { Column, HeaderCell, Cell } = Table;

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const handleEditAction = () => {
            setSelectedId(rowData[dataKey]);
            setEditModal(true);
        }
        const handleDeleteAction = () => {
            setSelectedId(rowData[dataKey]);
            setDeleteModal(true);
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
            <Table
                data={data}
                bordered
                hover
                headerHeight={50}
                rowHeight={55}
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
