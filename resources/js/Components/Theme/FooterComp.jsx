import React from 'react'

export default function FooterComp() {
    const date = new Date()
    return (
        <div className='main-footer'>
            {date.getFullYear()} © Copyright.
        </div>
    )
}
