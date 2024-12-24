import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Drawer } from 'rsuite'

/**
 * A reusable drawer component with form submission capabilities
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered inside the drawer body
 * @param {string} [props.drawerTitle] - Title text to display in the drawer header
 * @param {string} [props.size='xs'] - Size of the drawer ('xs', 'sm', 'md', 'lg', 'full')
 * @param {Function} props.onSubmit - Handler function called when submit button is clicked
 * @param {boolean} [props.processing] - Loading state for the submit button
 * @param {Function} props.reset - Function to reset form state when drawer closes
 * @param {React.Ref} ref - Forwarded ref with methods to control drawer
 * @returns {JSX.Element} FormDrawer component
 * 
 * @example
 * const drawerRef = useRef();
 * <FormDrawer
 *   ref={drawerRef}
 *   drawerTitle="Add New Item"
 *   onSubmit={handleSubmit}
 *   processing={isSubmitting}
 *   reset={resetForm}
 * >
 *   <form>...</form>
 * </FormDrawer>
 */
const FormDrawer = forwardRef(({ children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => {
            props?.reset()
            setIsOpen(false)
        }
    }))
    return (
        <Drawer backdrop={'static'} open={isOpen} onClose={ref?.current?.close} size={props?.size ?? 'xs'} keyboard={false}>
            <Drawer.Header className='pe-6 items-center'>
                <Drawer.Title className='font-semibold text-gray-600'>{props?.drawerTitle}</Drawer.Title>
                <Drawer.Actions>
                    <Button appearance="primary" color='green' onClick={props?.onSubmit} loading={props?.processing}>
                        <span className='font-semibold'>Submit</span>
                    </Button>
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body className='p-6'>
                {children}
            </Drawer.Body>
        </Drawer>
    )
})
export default FormDrawer