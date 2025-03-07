import React, { useEffect } from 'react'
import { SelectPicker } from 'rsuite'

export default function BrandPicker() {
    const [brands, setBrands] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(route('brands.search'), {
                params: {
                    count: 10,
                    type: 'picker'
                }
            });
            if (res?.data?.length > 0) {
                setBrands(res?.data)
            }
        }
        fetchItems()
    }, [])

    const handleBrandSearch = async (searchTerm) => {
        if (searchTerm.length > 3) {
            try {
                const res = await axios.get(route('brands.search'), {
                    params: {
                        search_qry: searchTerm,
                        type: "picker"
                    },
                });
                if (res?.data?.length > 0) {
                    setBrands(res?.data)
                }
            } catch (error) {
                console.error("Error fetching brands:", error?.data?.message);
            }
        }
    }

    return (
        <SelectPicker
            data={brands}
            onSearch={handleBrandSearch}
            block
            onChange={(value) => console.log(value)}
        />
    )
}
