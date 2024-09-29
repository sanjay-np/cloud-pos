import React from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';

export default function AddButton({handleOnClick}) {
    return (
        <ButtonToolbar>
            <IconButton size='lg' color='green' icon={<AddOutlineIcon />} appearance='primary' onClick={handleOnClick}>
                <span className='font-semibold'>Add New</span>
            </IconButton>
        </ButtonToolbar>
    )
}
