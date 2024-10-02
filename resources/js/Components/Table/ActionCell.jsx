import { FilePenLineIcon, Trash2Icon } from "lucide-react"
import { Divider, IconButton, Table } from "rsuite"

/**
 * A React component that renders a table cell with edit and delete action buttons.
 *
 * @param {object} rowData - The data for the current row.
 * @param {string} dataKey - The key for the current data.
 * @param {object} props - Additional props to be passed to the Cell component.
 * @return {JSX.Element} The rendered table cell with action buttons.
 */
const ActionCell = ({ rowData, dataKey, ...props }) => {
    const { Cell } = Table
    return (
        <Cell {...props} className="link-group">
            <IconButton
                appearance="subtle"
                size='xs'
                icon={<FilePenLineIcon size={16} />}
                onClick={() => props?.actions?.editAction(rowData[dataKey])}
            />
            <Divider vertical />
            <IconButton
                appearance="subtle"
                size='xs'
                icon={<Trash2Icon size={16} />}
                onClick={() => props?.actions?.deleteAction(rowData[dataKey])}
            />
        </Cell>
    )
}
export default ActionCell
