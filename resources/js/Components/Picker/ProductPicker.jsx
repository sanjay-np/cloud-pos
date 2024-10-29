import { useEffect, useState } from 'react'
import { SelectPicker } from 'rsuite';

export default function ProductPicker() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(route('products.picker'), { params: { count: 10 } });
            if (res?.data?.length > 0) {
                setProducts(res?.data)
            }
        }
        fetchItems()
    }, [])

    const handleProductSearch = async (searchTerm) => {
        if (searchTerm.length > 3) {
            try {
                const res = await axios.get(route('products.search'), {
                    params: {
                        search_qry: searchTerm,
                        show_type: "picker"
                    },
                });
                if (res?.data?.length > 0) {
                    setProducts(res?.data)
                }
            } catch (error) {
                console.error("Error fetching products:", error?.data?.message);
            }
        }
    }

    return (
        <SelectPicker
            data={products}
            block
            onSearch={handleProductSearch}
            onChange={value => console.log(value)}
        />
    )
}
