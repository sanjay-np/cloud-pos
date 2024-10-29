import React, { useEffect } from 'react'
import { SelectPicker } from 'rsuite';

export default function SupplierPicker() {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(route('suppliers.picker'), { params: { count: 10 } });
            if (res?.data?.length > 0) {
                setSuppliers(res?.data)
            }
        }
        fetchItems()
    }, [])

    const handleSupplierSearch = async (searchTerm) => {
        if (searchTerm.length > 3) {
            try {
                const res = await axios.get(route('suppliers.search'), {
                    params: {
                        search_qry: searchTerm,
                        show_type: "picker"
                    },
                });
                if (res?.data?.length > 0) {
                    setSuppliers(res?.data)
                }
            } catch (error) {
                console.error("Error fetching suppliers:", error?.data?.message);
            }
        }
    }


    return (
        <SelectPicker
            data={suppliers}
            onSearch={handleSupplierSearch}
            block
            onChange={(value) => console.log(value)}
        />
    )
}
