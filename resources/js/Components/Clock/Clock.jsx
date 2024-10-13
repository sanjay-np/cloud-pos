import { useState, useEffect } from 'react'

/**
 * A hook that displays the current local time and date.
 *
 * @returns {JSX.Element}
 */
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