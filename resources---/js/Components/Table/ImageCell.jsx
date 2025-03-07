import { Table } from "rsuite"

/**
 * ImageCell component renders an image inside a table cell.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.rowData - The data for the current row.
 * @param {string} props.dataKey - The key to access the image URL in the rowData.
 * @param {Object} [props] - Additional properties passed to the Cell component.
 * @returns {JSX.Element} The rendered ImageCell component.
 */
const ImageCell = ({ rowData, dataKey, ...props }) => {
    const { Cell } = Table
    return (
        <Cell {...props}>
            <div className="imageWrapper">
                <img src={rowData[dataKey] ?? 'https://placehold.co/100X80'} />
            </div>
        </Cell>
    )
}

export default ImageCell