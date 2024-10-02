import { Checkbox, Table } from "rsuite"

/**
 * A reusable table cell component for rendering checkboxes.
 *
 * @param {object} rowData - The data for the current table row.
 * @param {function} onChange - The callback function for checkbox change events.
 * @param {array} checkedKeys - The array of keys for checked checkboxes.
 * @param {string} dataKey - The key for the checkbox value in the rowData object.
 * @param {object} props - Additional props to be passed to the Cell component.
 * @return {JSX.Element} The rendered checkbox cell.
 */
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => {
    const { Cell } = Table
    return (
        < Cell {...props} style={{ padding: 0 }}>
            <div style={{ lineHeight: '46px' }}>
                <Checkbox
                    value={rowData[dataKey]}
                    inline
                    // onChange={onChange}
                    // checked={checkedKeys.some(item => item === rowData[dataKey])}
                />
            </div>
        </Cell >
    );
}
export default CheckCell