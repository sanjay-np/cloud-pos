import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Input, InputGroup } from 'rsuite'

export default function SearchComp(props) {
    return (
        <InputGroup inside>
            <Input placeholder='Search...' className='text-base' />
            <InputGroup.Addon>
                <SearchIcon color='gray' strokeWidth='1.5' size={20} />
            </InputGroup.Addon>
        </InputGroup>
    )
}
