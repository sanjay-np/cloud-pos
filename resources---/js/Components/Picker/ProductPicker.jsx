import { SearchIcon } from 'lucide-react';
import { useRef, useState } from 'react'
import { Input, InputGroup } from 'rsuite';

export default function ProductPicker(props) {

    const searchRef = useRef(null)
    const [productItems, setProductItems] = useState([])


    const handleProductSearch = async (value) => {
        if (value.length >= 3) {
            try {
                const res = await axios.get(route('products.search', { search_qry: value }));
                setProductItems(res.data.length ? res.data : []);
            } catch (error) {
                console.error("Search error:", error);
                setProductItems([]);
            }
        } else {
            setProductItems([])
        }
    }

    const handleOnProductClick = (item) => {
        props.handleProductClick(item)
        setProductItems([])
        if (!searchRef.current) return
        searchRef.current.value = ''

    }

    return (
        <div className='relative'>
            <InputGroup>
                <Input
                    placeholder='Search Product by name or code...'
                    size='md'
                    ref={searchRef}
                    onChange={(val) => handleProductSearch(val)}
                />
                <InputGroup.Addon>
                    <SearchIcon color="gray" strokeWidth={1.5} />
                </InputGroup.Addon>
            </InputGroup>
            {productItems.length > 0 && (
                <div className="search-result absolute z-10 w-full bg-white top-11 border-x px-2">
                    <ul>
                        {productItems.map((item, index) => (
                            <li className="item border-b py-2 cursor-pointer" key={index}>
                                <div className='flex items-center justify-between' onClick={() => handleOnProductClick(item)}>
                                    <p>{item.title}</p>
                                    <p>{item.sku}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
