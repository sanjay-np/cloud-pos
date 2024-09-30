import { FilePenLineIcon, Trash2Icon } from "lucide-react"
import { Divider, IconButton, Table } from "rsuite"

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
