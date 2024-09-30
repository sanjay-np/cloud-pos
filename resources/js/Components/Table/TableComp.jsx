import { Checkbox, Table } from "rsuite"
import CheckCell from "./CheckCell";
import ActionCell from "./ActionCell";

/**
 * A reusable table component that renders a table based on the provided data and configuration.
 *
 * @param {object} props - The component props.
 * @param {array} props.data - The data to be rendered in the table.
 * @param {boolean} props.checkboxCell - Whether to render a checkbox column.
 * @param {array} props.columns - The columns to be rendered in the table.
 * @param {boolean} props.actionCell - Whether to render an action column.
 * @param {array} props.actionsCell - The actions to be rendered in the action column.
 * @return {JSX.Element} The rendered table component.
 */
const TableComp = (props) => {
    const { Column, HeaderCell, Cell } = Table;
    return (
        <Table data={props.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>
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
                <Column flexGrow={1} key={index}>
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
    )
}
export default TableComp