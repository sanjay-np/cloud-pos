export const BRAND_TABLE_HEADER = [
    { title: "Brand Name", dataKey: "name", flexGrow: 1 },
    { title: "Description", dataKey: "description", flexGrow: 1 }
]

export const SUPPLIER_TABLE_HEADER = [
    { title: "Supplier Name", dataKey: "name", flexGrow: 1 },
    { title: "Phone", dataKey: "phone", width: 150 },
    { title: "Contact Person", dataKey: "contact_person", width: 150 },
    { title: "PAN No.", dataKey: "pan", width: 150 }
]

export const CATEGORY_TABLE_HEADER = [
    { title: "Category Name", dataKey: "name", flexGrow: 1 },
    { title: "Parent Category", dataKey: "parent_id", flexGrow: 1 },
    { title: "Status", dataKey: "status", flexGrow: 1 }
]

export const ATTRIBUTE_TABLE_HEADER = [
    { title: "Attribute Name", dataKey: "name", flexGrow: 1 },
    { title: "Description", dataKey: "description", flexGrow: 1 },
    { title: "Status", dataKey: "status", flexGrow: 1 }
]

export const PRODUCT_TABLE_HEADER = [
    { title: "Product Name", dataKey: "title", flexGrow: 1 },
    { title: "SKU", dataKey: "sku", width: 150 },
    { title: "Stock", dataKey: "stock_qty" },
    { title: "P.Price", dataKey: "unit_price" },
    { title: "S.Price", dataKey: "sale_price" },
    { title: "Status", dataKey: "status" }
]

export const PRODUCT_TYPE = [
    { label: 'Simple', value: "simple" },
    { label: 'Variant', value: "variant" },
    { label: 'Digital', value: "digital" }
]

export const PRODUCT_UNIT = [
    { label: 'KG', value: "kg" },
    { label: 'Piece', value: "pcs" },
]

export const PRODUCT_STATUS = [
    { label: 'Active', value: "active" },
    { label: 'Inactive', value: "inactive" }
]