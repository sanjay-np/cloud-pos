import React from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover';

// Define the PopOver component
export function PopOver({ open, setOpen, children, containerClass }) {
    // Extract the trigger and content components from children
    const trigger = React.Children.toArray(children).find(child => child.type === PopOver.Trigger);
    const content = React.Children.toArray(children).find(child => child.type === PopOver.Content);

    return (
        <Popover
            isOpen={open}
            positions={['bottom', 'right']}
            padding={15}
            containerClassName={containerClass}
            onClickOutside={() => setOpen(false)}
            content={({ position, childRect, popoverRect }) => (
                <ArrowContainer
                    position={position}
                    childRect={childRect}
                    popoverRect={popoverRect}
                    arrowColor={'white'}
                    arrowSize={12}
                    className='popover-arrow-container'
                    arrowClassName='popover-arrow'
                >
                    <div className='popover-content'>
                        {content || <></>}
                    </div>
                </ArrowContainer>
            )}
        >
            {trigger ? React.cloneElement(trigger, { onClick: () => setOpen(!open) }) : null}
        </Popover>
    );
}

// Define the Trigger and Content components with forwardRef
PopOver.Trigger = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
));

PopOver.Content = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
));
