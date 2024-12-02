import { getCurrentYear } from '@/Lib/Utils'
import React from 'react'

export default function FooterComp() {
    return (
        <div className='main-footer'>
            {getCurrentYear()} © Copyright.
        </div>
    )
}
