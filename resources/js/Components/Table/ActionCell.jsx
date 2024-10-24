import { FilePenLineIcon, Trash2Icon } from "lucide-react"
import { IconButton, Table } from "rsuite"

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
    const { actions } = props
    if (actions) {
        return (
            <Cell {...props} className="link-group">
                {actions?.editAction && (
                    <IconButton
                        appearance="subtle"
                        size='xs'
                        icon={<FilePenLineIcon size={17} />}
                        onClick={() => actions?.editAction(rowData[dataKey])}
                    />
                )}
                {actions?.deleteAction && (
                    <IconButton
                        appearance="subtle"
                        size='xs'
                        icon={<Trash2Icon size={17} />}
                        onClick={() => actions?.deleteAction(rowData[dataKey])}
                    />
                )}
            </Cell>
        )
    }
}
export default ActionCell
