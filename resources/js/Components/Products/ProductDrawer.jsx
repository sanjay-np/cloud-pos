import React from 'react'
import { Button, Drawer, HStack, Input, InputGroup, Placeholder } from 'rsuite'
export default function ProductDrawer(props) {

    const { open, setOpen } = props

    return (
        <React.Fragment>
            <Drawer
                placement='right'
                size={'lg'}
                open={open}
                onClose={() => setOpen(false)}
                backdrop={'static'}
            >
                <Drawer.Header className='pe-6 items-center'>
                    <Drawer.Title className='font-semibold text-gray-600'>Add Product</Drawer.Title>
                    <Drawer.Actions>
                        <Button appearance="primary" color='green' onClick={() => setOpen(false)}>
                            <span className='font-semibold'>Submit</span>
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body className='p-6'>
                    <HStack>
                        <div className="left w-2/3">
                            <div className="mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Product Title</label>
                                <InputGroup>
                                    <Input
                                        placeholder='Product Title...'
                                    />
                                </InputGroup>
                            </div>
                            <HStack spacing={12} className='mb-4'>
                                <div className="form-item w-1/2">
                                    <label className='text-gray-600 font-semibold mb-1 block'>SKU</label>
                                    <InputGroup>
                                        <Input
                                            placeholder='SKU...'
                                        />
                                    </InputGroup>
                                </div>
                                <div className="form-item w-1/2">
                                    <label className='text-gray-600 font-semibold mb-1 block'>Code</label>
                                    <InputGroup>
                                        <Input
                                            placeholder='Code...'
                                        />
                                    </InputGroup>
                                </div>
                            </HStack>
                            <div className="form-item mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Short Description</label>
                                <Input as={"textarea"} rows={3} placeholder="Short Description..." />
                            </div>
                            <div className="form-item mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Description</label>
                                <Input as={"textarea"} rows={5} placeholder="Description..." />
                            </div>
                        </div>
                        <div className="left w-1/3">

                        </div>
                    </HStack>
                </Drawer.Body>
            </Drawer>
        </React.Fragment>
    )
}
