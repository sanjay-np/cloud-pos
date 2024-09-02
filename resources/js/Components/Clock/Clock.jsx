import React, { useState, useEffect } from 'react'

export const Clock = () => {

    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }

    });

    return (
        <div className='clock-section'>
            <span className='time'>{date.toLocaleTimeString()}</span>
            <span className='date'>{date.toLocaleDateString()}</span>
        </div>
    )
}

export default Clock