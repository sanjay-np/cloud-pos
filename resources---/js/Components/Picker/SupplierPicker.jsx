import React, { useEffect, useState } from 'react'
import { SelectPicker } from 'rsuite';

export default function SupplierPicker(props) {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(route('suppliers.search'), {
                params: {
                    count: 10,
                    type: 'picker'
                }
            });
            if (res?.data?.length > 0) {
                setSuppliers(res?.data)
            }
        }
        fetchItems()
    }, [])

    const handleSupplierSearch = async (searchTerm) => {
        if (searchTerm.length >= 2) {
            try {
                const res = await axios.get(route('suppliers.search'), {
                    params: {
                        search_qry: searchTerm,
                        type: 'picker',
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
            onChange={(value) => props.onChange(value)}
        />
    )
}
