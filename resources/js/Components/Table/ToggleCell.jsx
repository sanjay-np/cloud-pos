import { Table, Toggle } from "rsuite"

const ToggleCell = ({ rowData, dataKey, ...props }) => {

    const { Cell } = Table

    return (
        <Cell {...props}>
            <Toggle
                checked={rowData[dataKey]}
                defaultValue={rowData[dataKey]}
                size={'lg'}
                color='green'
            />
        </Cell>
    )
}
export default ToggleCell
