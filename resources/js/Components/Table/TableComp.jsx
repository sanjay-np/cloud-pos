import { Checkbox, Table } from "rsuite"
import CheckCell from "@/Components/Table/CheckCell";
import ActionCell from "@/Components/Table/ActionCell";
import Pagination from "@/Components/Table/Pagination";

/**
 * A reusable table component for rendering data.
 *
 * @param {object} props - The component properties.
 * @param {object[]} props.items - The data to be rendered.
 * @param {boolean} props.checkboxCell - Whether to render a checkbox cell for each row. Default is false.
 * @param {object[]} props.columns - An array of column objects. Each object should have a title and a dataKey.
 * @param {object} props.actions - An object containing the actions to be rendered in the action cell.
 * @param {boolean} props.pagination - Whether to render pagination links. Default is false.
 * @return {JSX.Element} The rendered table component.
 */
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
                    {/* Columns */}
                    {props?.columns?.map((column, index) => (
                        <Column flexGrow={column?.flexGrow ?? 1} key={index}>
                            <HeaderCell><span className="text-base font-semibold text-gray-600">{column.title}</span></HeaderCell>
                            <Cell dataKey={column.dataKey} />
                        </Column>
                    ))}
                    {/* Action Cell */}
                    {props?.actions && (
                        <Column width={120}>
                            <HeaderCell><span className="text-base text-gray-700">Actions</span></HeaderCell>
                            <ActionCell dataKey="id" actions={props?.actions} />
                        </Column>
                    )}
                </Table>
            </div>
            {
                props?.pagination && (
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