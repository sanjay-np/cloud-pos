import { Checkbox, Table } from "rsuite"

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