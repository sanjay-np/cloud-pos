import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import SearchBar from '@/Components/Search/Index'
import AddButton from '@/Components/Button/AddButton'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import ProductForm from '../Components/ProductForm'
import { Table } from 'rsuite'
import { DeleteActionButton, EditActionButton } from "@/Components/Table/TableActions"


export default function Index({ auth, products, brands, suppliers }) {
    const { Column, HeaderCell, Cell } = Table;
    const [selected, setSelected] = useState(null);
    const [type, setType] = useState("add")
    const drawerRef = useRef(false)
    const deleteModalRef = useRef(false)

    const editAction = (id) => {
        setType("edit");
        setSelected(id);
        drawerRef.current.open();
    };

    const deleteAction = (id) => {
        setSelected(id);
        deleteModalRef.current.open();
    };

    const handleDelete = () => {
        router.delete(route('products.destroy', selected), {
            onSuccess: () => {
                toast.success('Product deleted successfully');
                setSelected(null);
                deleteModalRef.current.close();
            }
        })
    }
    return (
        <Authenticated user={auth?.user} activeKey={['products']}>
            <Head title='Products' />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Products</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Products'} />
                            </div>
                            <div className='add-product'>
                                <AddButton handleOnClick={() => {
                                    drawerRef.current.open()
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="tableWrapper">
                        <div className="tableContainer">
                            <Table data={products?.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>

                                <Column width={50}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                                    <Cell>{(_, rowIndex) => rowIndex + 1}</Cell>
                                </Column>

                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Product Name</span></HeaderCell>
                                    <Cell dataKey="title" />
                                </Column>

                                <Column width={120}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SKU</span></HeaderCell>
                                    <Cell dataKey="sku" />
                                </Column>

                                <Column>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Stock</span></HeaderCell>
                                    <Cell dataKey="stock_qty" />
                                </Column>

                                <Column>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Purchase Price</span></HeaderCell>
                                    <Cell dataKey="unit_price" />
                                </Column>

                                <Column>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Sale Price</span></HeaderCell>
                                    <Cell dataKey="sale_price" />
                                </Column>

                                <Column>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Status</span></HeaderCell>
                                    <Cell dataKey="status" />
                                </Column>

                                <Column width={100}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Actions</span></HeaderCell>
                                    <Cell className="link-group">
                                        {(rowData) => (
                                            <>
                                                <EditActionButton action={() => editAction(rowData.id)} />
                                                <DeleteActionButton action={() => deleteAction(rowData.id)} />
                                            </>
                                        )}
                                    </Cell>
                                </Column>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <ProductForm drawerRef={drawerRef} type={type} brands={brands} suppliers={suppliers} selected={selected} />
            <DeleteModal ref={deleteModalRef} title={'Product'} deleteAction={handleDelete} />
        </Authenticated>
    )
}
