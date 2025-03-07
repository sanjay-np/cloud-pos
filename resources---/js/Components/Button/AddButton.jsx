import React from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';

/**
 * A button component that renders an <code>IconButton</code> with an "Add New"
 * label and a green background color. When clicked, it calls the given
 * <code>handleOnClick</code> function.
 *
 * @param {object} props - Component props
 * @param {function} props.handleOnClick - Function to call when the button is clicked
 * @returns {JSX.Element} A rendered <code>IconButton</code> component
 */
const AddButton = ({ handleOnClick }) => {
    return (
        <ButtonToolbar>
            <IconButton size='lg' color='green' icon={<AddOutlineIcon />} appearance='primary' onClick={handleOnClick}>
                <span className='font-semibold'>Add New</span>
            </IconButton>
        </ButtonToolbar>
    )
}

export default AddButton