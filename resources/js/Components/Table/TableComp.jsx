import { Checkbox, Table } from "rsuite"
import CheckCell from "@/Components/Table/CheckCell";
import ActionCell from "@/Components/Table/ActionCell";
import Pagination from "@/Components/Table/Pagination";
import ToggleCell from "./ToggleCell";


const TableComp = (props) => {
    const { Column, HeaderCell, Cell } = Table;
    return (
        <div className="table-wrapper">
            <div className="table-container">
                <Table data={props.items?.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>
                    {/* Checkbox */}
                    {props?.checkboxCell && (
                        <Column width={50} align="center">
                            <HeaderCell style={{ padding: 0 }}>
                                <div style={{ lineHeight: '40px' }}>
                                    <Checkbox inline />
                                </div>
                            </HeaderCell>
                            <CheckCell dataKey="id" />
                        </Column>
                    )}

                    {props?.serialize && (
                        <Column width={50}>
                            <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                            <Cell>{(rowData, rowIndex) => rowIndex + 1}</Cell>
                        </Column>
                    )}

                    {/* Columns */}
                    {props?.columns?.map((column, index) => {
                        if (column?.type === 'toggle') {
                            return (
                                <Column
                                    key={index}
                                    {...(column?.flexGrow && { flexGrow: column.flexGrow })}
                                    {...(column?.width && { width: column.width })}
                                >
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">{column.title}</span></HeaderCell>
                                    <ToggleCell dataKey={column.dataKey} />
                                </Column>
                            )
                        }
                        return (
                            <Column
                                key={index}
                                {...(column?.flexGrow && { flexGrow: column.flexGrow })}
                                {...(column?.width && { width: column.width })}
                            >
                                <HeaderCell><span className="text-base font-semibold text-gray-600">{column.title}</span></HeaderCell>
                                <Cell dataKey={column.dataKey} />
                            </Column>
                        )
                    })}
                    {/* Action Cell */}
                    {props?.actions && (
                        <Column width={100}>
                            <HeaderCell><span className="text-base font-semibold text-gray-600">Actions</span></HeaderCell>
                            <ActionCell dataKey="id" actions={props?.actions} />
                        </Column>
                    )}
                </Table>
            </div>
            {
                props?.pagination && props?.items?.links && (
                    <div className="pagination-wrapper">
                        <Pagination
                            links={props?.items?.links}
                            total={props?.items?.total}
                            from={props?.items?.from}
                            to={props?.items?.to}
                        />
                    </div>
                )
            }
        </div>
    )
}
export default TableComp