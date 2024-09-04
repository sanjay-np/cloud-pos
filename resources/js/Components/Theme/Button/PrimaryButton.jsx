import React from 'react'

export default function PrimaryButton(props) {
    return (
        <button
            {...props}
            className={`primary-btn ${props?.className}`}
        >
            {props?.children}
        </button>
    )
}
