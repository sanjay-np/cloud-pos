export const salesTableHeader = [
    { title: 'Sales Date', dataKey: 'date' },
    { title: 'Reference', dataKey: 'reference' },
    { title: 'Customer', dataKey: 'customer.name' },
    { title: 'Total', dataKey: 'total_amount' },
    { title: 'Payment Status', dataKey: 'payment_status' },
    { title: 'Status', dataKey: 'status' }
]

export const saleStatus = [
    { label: 'Pending', value: "pending" },
    { label: 'Ordered', value: "ordered" },
    { label: 'Completed', value: "completed" },
]