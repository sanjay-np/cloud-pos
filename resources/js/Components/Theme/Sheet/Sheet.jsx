import { XIcon } from 'lucide-react'
import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

export default function Sheet(props, { children }) {

    const title = React.Children.toArray(children).find(child => child.type === Sheet.Title);
    const content = React.Children.toArray(children).find(child => child.type === Sheet.Content);

    return (
        <Drawer {...props}>
            {props?.children}
            <button className='absolute top-2 right-2' onClick={props?.onClose}><XIcon color='gray' /></button>
            {title || <></>}
            {content || <></>}
        </Drawer>
    )
}
// Define the Trigger and Content components with forwardRef
Sheet.Title = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} {...props} className={`sheet-title ${props?.className}`}>{children}</div>
));

Sheet.Content = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} {...props} className={`sheet-content ${props?.className}`}>{children}</div>
));