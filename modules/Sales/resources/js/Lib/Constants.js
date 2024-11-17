export const salesTableHeader = [
    { title: 'Date', dataKey: 'date', width: 100 },
    { title: 'Reference', dataKey: 'reference', width: 150 },
    { title: 'Customer', dataKey: 'customer.name', flexGrow: 1 },
    { title: 'Total', dataKey: 'total_amount', width: 150 },
    { title: 'Payment Status', dataKey: 'payment_status', width: 150 },
    { title: 'Status', dataKey: 'status', width: 150 }
]

export const saleStatus = [
    { label: 'Pending', value: "pending" },
    { label: 'Ordered', value: "ordered" },
    { label: 'Completed', value: "completed" },
]