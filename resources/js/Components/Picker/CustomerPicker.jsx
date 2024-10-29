import { useEffect, useState } from 'react'
import { SelectPicker } from 'rsuite'

export default function CustomerPicker() {
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(route('customers.picker'), { params: { count: 10 } });
            if (res?.data?.length > 0) {
                setCustomers(res?.data)
            }
        }
        fetchItems()
    }, [])

    const handleCustomerSearch = async (searchTerm) => {
        if (searchTerm.length > 3) {
            try {
                const res = await axios.get(route('customers.search'), {
                    params: {
                        search_qry: searchTerm,
                        show_type: "picker"
                    },
                });
                if (res?.data?.length > 0) {
                    setCustomers(res?.data)
                }
            } catch (error) {
                console.error("Error fetching customers:", error?.data?.message);
            }
        }
    }

    return (
        <SelectPicker
            data={customers}
            block
            onSearch={handleCustomerSearch}
        />
    )
}
