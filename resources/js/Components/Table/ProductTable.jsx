import { Trash2Icon } from 'lucide-react';
import { IconButton, Input, InputGroup, Table } from 'rsuite';

const ProductTable = (props) => {
    const { Column, HeaderCell, Cell } = Table;

    return (
        <Table data={props?.items} hover bordered cellBordered headerHeight={44} autoHeight={true} rowHeight={55}>
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
                <Cell>
                    {(rowData) => (
                        <InputGroup>
                            <Input
                                value={rowData?.qty}
                                size='sm'
                            />
                        </InputGroup>
                    )}
                </Cell>
            </Column>
            <Column flexGrow={1}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">P.Price</span></HeaderCell>
                <Cell>
                    {(rowData) => (
                        <InputGroup>
                            <Input
                                value={rowData?.purchase_price}
                                size='sm'
                            />
                        </InputGroup>
                    )}
                </Cell>
            </Column>
            <Column flexGrow={1}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">S.Price</span></HeaderCell>
                <Cell>
                    {(rowData) => (
                        <InputGroup>
                            <Input
                                value={rowData?.price}
                                size='sm'
                            />
                        </InputGroup>
                    )}
                </Cell>
            </Column>
            <Column flexGrow={1}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">Total</span></HeaderCell>
                <Cell>
                    {(rowData) => (
                        <span>{rowData?.purchase_price * rowData?.qty}</span>
                    )}
                </Cell>
            </Column>
            <Column width={80}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">Action</span></HeaderCell>
                <Cell>
                    {(rowData) => (
                        <IconButton
                            appearance="subtle"
                            size='xs'
                            icon={<Trash2Icon size={16} />}
                        // onClick={() => props?.actions?.deleteAction(rowData.id)}
                        />
                    )}
                </Cell>
            </Column>
        </Table>
    )
}

export default ProductTable