export const purchaseFormTableHeader = [
    { title: "Product Name", dataKey: "title", flexGrow: 1 },
    { title: "Qty", dataKey: "sku" },
    { title: "P.Price", dataKey: "bar_code" },
    { title: "S.Price", dataKey: "price" },
    { title: "Total", dataKey: "total" },
]

export const purchaseStatus = [
    { label: 'Pending', value: "pending" },
    { label: 'Ordered', value: "ordered" },
    { label: 'Completed', value: "completed" },
]

export const purchaseTableHeader = [
    { title: 'Date', dataKey: 'date', width: 100 },
    { title: 'Reference', dataKey: 'reference', width: 150 },
    { title: 'Supplier', dataKey: 'supplier.name', flexGrow: 1 },
    { title: 'Total', dataKey: 'total_amount', width: 150 },
    { title: 'Payment Status', dataKey: 'payment_status', width: 150 },
    { title: 'Status', dataKey: 'status', width: 150 }
]
