import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Input, InputGroup } from 'rsuite'

/**
 * A search bar component with a search icon and a placeholder that includes the title.
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the search bar.
 * @returns {ReactElement} A search bar component.
 */
const SearchBar = ({ title }) => {
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

export default SearchBar