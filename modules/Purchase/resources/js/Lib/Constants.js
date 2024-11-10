export const purchaseFormTableHeader = [
    { title: "Product Name", dataKey: "title", flexGrow: 2 },
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

export const paymentMethods = [
    { label: 'Cash', value: "cash" },
    { label: 'Bank Transfer', value: "bank_transfer" },
    { label: 'Cheque', value: "cheque" },
]

export const purchaseTableHeader = [
    { title: 'Purchase Date', dataKey: 'date' },
    { title: 'Reference', dataKey: 'reference' },
    { title: 'Supplier', dataKey: 'supplier.name' },
    { title: 'Total', dataKey: 'total_amount' },
    { title: 'Payment Status', dataKey: 'payment_status' },
    { title: 'Status', dataKey: 'status' }
]