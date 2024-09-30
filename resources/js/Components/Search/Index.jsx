import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Input, InputGroup } from 'rsuite'

export default function SearchBar({ title }) {
    return (
        <InputGroup inside>
            <Input
                placeholder={`Search ${title}...`}
                className="text-base"
            />
            <InputGroup.Addon>
                <SearchIcon color="gray" strokeWidth={1.5} size={20} />
            </InputGroup.Addon>
        </InputGroup>
    );
}
