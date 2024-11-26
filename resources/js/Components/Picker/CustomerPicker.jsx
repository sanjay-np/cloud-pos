import { useEffect, useState } from 'react'
import { SelectPicker } from 'rsuite'

export default function CustomerPicker(props) {
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(route('customers.search'), {
                params: {
                    count: 10,
                    type: 'picker'
                }
            });
            if (res?.data?.length > 0) {
                setCustomers(res?.data)
            }
        }
        fetchItems()
    }, [])

    const handleCustomerSearch = async (searchTerm) => {
        if (searchTerm.length >= 2) {
            try {
                const res = await axios.get(route('customers.search'), {
                    params: {
                        search_qry: searchTerm,
                        type: 'picker'
                    }
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
            placeholder='Select Customer...'
            data={customers}
            onSearch={handleCustomerSearch}
            block
            onChange={(value) => props.onChange(value)}
            className='w-full'
            size={props.size ?? 'md'}
        />
    )
}
