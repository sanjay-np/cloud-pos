import { formattedNumber } from '@/Lib/Utils';
import { removePurchaseProduct, setProductPrice, setQty } from '@/Store/Reducers/PurchaseProductSlice';
import { Trash2Icon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { IconButton, Input, InputGroup, Table } from 'rsuite';

const ProductTable = (props) => {
    const { Column, HeaderCell, Cell } = Table;

    const dispatch = useDispatch()

    const removeProduct = (id) => {
        dispatch(removePurchaseProduct(id))
    }

    const handleProductQty = (id, qty) => {
        dispatch(setQty({ id, qty }))
    }

    const handleProductPrice = (id, price, type) => {
        dispatch(setProductPrice({ id, price, type }))
    }

    return (
        <Table
            data={props?.items}
            hover
            bordered
            cellBordered
            headerHeight={44}
            autoHeight={true}
            rowHeight={55}
            renderEmpty={() => <div className='rs-table-body-info'>Products not selected yet..</div>}
        >
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
                                onChange={(qty) => handleProductQty(rowData?.id, qty)}
                            />
                        </InputGroup>
                    )}
                </Cell>
            </Column>
            <Column flexGrow={1}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">Price</span></HeaderCell>
                <Cell>
                    {(rowData) => (
                        <InputGroup>
                            <Input
                                value={rowData?.unit_price}
                                size='sm'
                                onChange={(price) => handleProductPrice(rowData?.id, price, 'purchase')}
                            />
                        </InputGroup>
                    )}
                </Cell>
            </Column>
            <Column flexGrow={1}>
                <HeaderCell><span className="text-base font-semibold text-gray-600">Total</span></HeaderCell>
                <Cell>
                    {(rowData) => (
                        <span>{formattedNumber(rowData?.unit_price * rowData?.qty)}</span>
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
                            onClick={() => removeProduct(rowData?.id)}
                        />
                    )}
                </Cell>
            </Column>
        </Table>
    )
}

export default ProductTable