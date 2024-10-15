import { Table } from 'rsuite';
import ActionCell from './ActionCell';

const ProductTable = (props) => {
    const { Column, HeaderCell, Cell } = Table;

    return (
        <Table data={props?.items} hover bordered cellBordered headerHeight={50}>
            <Column width={50}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                <Cell>{(rowData, rowIndex) => rowIndex + 1}</Cell>
            </Column>
            <Column flexGrow={2}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">Product Name</span></HeaderCell>
                <Cell dataKey='title' />
            </Column>
            <Column width={120}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">Qty</span></HeaderCell>
                <Cell dataKey='qty' />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">P.Price</span></HeaderCell>
                <Cell dataKey='purchase_price' />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">S.Price</span></HeaderCell>
                <Cell dataKey='price' />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">Total</span></HeaderCell>
                <Cell dataKey='name' />
            </Column>
            <Column width={80}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">Action</span></HeaderCell>
                <Cell />
            </Column>
        </Table>
    )
}

export default ProductTable