import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Input, InputGroup } from 'rsuite'

export default function SearchComp(props) {
    return (
        <InputGroup inside>
            <Input placeholder='Search...' />
            <InputGroup.Addon>
                <SearchIcon color='gray' strokeWidth='1.5' size={20} />
            </InputGroup.Addon>
        </InputGroup>
    )
}
