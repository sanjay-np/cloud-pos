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
    { title: "id", dataKey: "id" },
    { title: "Brand Name", dataKey: "name", flexGrow: 2 },
    { title: "Description", dataKey: "description", flexGrow: 2 }
]

export const supplierTableHeader = [
    { title: "Supplier Name", dataKey: "name", flexGrow: 2 },
    { title: "Phone", dataKey: "phone" },
    { title: "PAN No.", dataKey: "pan" }
]

export const categoryTableHeader = [
    { title: "id", dataKey: "id" },
    { title: "Category Name", dataKey: "name", flexGrow: 2 },
    { title: "Parent Category", dataKey: "parent_id", flexGrow: 2 },
    { title: "Status", dataKey: "status", flexGrow: 2 }
]