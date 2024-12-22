export const SALES_TABLE_HEADER = [
    { title: 'Date', dataKey: 'date', width: 110 },
    { title: 'Reference', dataKey: 'reference', width: 120 },
    { title: 'Customer', dataKey: 'customer.name', flexGrow: 1 },
    { title: 'Total', dataKey: 'total_amount', width: 80 },
    { title: 'Payment Status', dataKey: 'payment_status', width: 120 },
    { title: 'Status', dataKey: 'status', width: 110 }
]

export const SALE_STATUS = [
    { label: 'Pending', value: "pending" },
    { label: 'Ordered', value: "ordered" },
    { label: 'Completed', value: "completed" },
]