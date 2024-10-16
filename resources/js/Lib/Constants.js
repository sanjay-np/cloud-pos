export const employeeTableHeader = [
    { title: "Employee Name", dataKey: "name" },
    { title: "Phone No.", dataKey: "phone" },
    { title: "Department", dataKey: "department" },
    { title: "Position", dataKey: "position" },
    { title: "Status", dataKey: "status" }
]

export const department = [
    { label: 'IT', value: "IT" },
    { label: 'HR', value: "HR" },
    { label: 'Finance', value: "Finance" },
    { label: 'Accounting', value: "Accounting" },
    { label: 'Marketing', value: "Marketing" },
    { label: 'Sales', value: "Sales" },
    { label: 'Admin', value: "Admin" },
    { label: 'Other', value: "Other" },
]
export const position = [
    { label: 'Director', value: "Director" },
    { label: 'Accountant', value: "Accountant" },
    { label: 'Clerk', value: "Clerk" },
    { label: 'Receptionist', value: "Receptionist" },
    { label: 'Supervisor', value: "Supervisor" },
    { label: 'Administrator', value: "Administrator" },
    { label: 'Manager', value: "Manager" },
    { label: 'Employee', value: "Employee" },
    { label: 'Other', value: "Other" },
]

export const documentType = [
    { label: 'Citizen Ship', value: "citizen_ship" },
    { label: 'Passport', value: "passport" },
    { label: 'Driving License', value: "driving_license" },
]
export const employeeStatus = [
    { label: 'On Hold', value: "on_hold" },
    { label: 'Active', value: "active" },
    { label: 'Suspended', value: "suspended" },
    { label: 'Resigned', value: "resigned" },
]

export const brandTableHeader = [
    { title: "Brand Name", dataKey: "name", flexGrow: 2 },
    { title: "Description", dataKey: "description", flexGrow: 2 }
]

export const supplierTableHeader = [
    { title: "Supplier Name", dataKey: "name", flexGrow: 1 },
    { title: "Phone", dataKey: "phone" },
    { title: "Contact Person", dataKey: "contact_person" },
    { title: "PAN No.", dataKey: "pan" }
]

export const categoryTableHeader = [
    { title: "Category Name", dataKey: "name", flexGrow: 2 },
    { title: "Parent Category", dataKey: "parent_id", flexGrow: 2 },
    { title: "Status", dataKey: "status", flexGrow: 2 }
]

export const attributeTableHeader = [
    { title: "Attribute Name", dataKey: "name", flexGrow: 2 },
    { title: "Description", dataKey: "description", flexGrow: 2 },
    { title: "Status", dataKey: "status", flexGrow: 2 }
]

export const productTableHeader = [
    { title: "Product Name", dataKey: "title", flexGrow: 2 },
    { title: "SKU", dataKey: "sku" },
    { title: "Barcode", dataKey: "bar_code" },
    { title: "Stock", dataKey: "stock_qty" },
    { title: "Price", dataKey: "price" },
    { title: "Product Type", dataKey: "product_type", flexGrow: 1 },
    { title: "Status", dataKey: "status", flexGrow: 1 }
]


export const productType = [
    { label: 'Simple', value: "simple" },
    { label: 'Variant', value: "variant" },
    { label: 'Digital', value: "digital" }
]

export const productStatus = [
    { label: 'Active', value: "active" },
    { label: 'Inactive', value: "inactive" }
]

export const customerTableHeader = [
    { title: "Customer Name", dataKey: "name", flexGrow: 2 },
    { title: "Phone", dataKey: "phone" },
    { title: "Status", dataKey: "status", flexGrow: 2 }
]

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

export const loadingText = "Loading... Please wait..."