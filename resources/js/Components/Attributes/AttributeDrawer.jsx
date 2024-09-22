import React, { useState } from 'react'
import { Button, Drawer, Input, InputGroup, TagInput } from 'rsuite'
import InputError from '../InputError'
import { useForm } from '@inertiajs/react'

export default function AttributeDrawer(props) {

    const { open, setOpen, title, selected, setSelected } = props
    const [loading, setLoading] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        values: ['test','test2']
    })


    const handleClose = () => {
        reset()
        setOpen(false)
    }

    const onSubmit = () => { }

    return (
        <Drawer open={open} onClose={handleClose} backdrop="static" size={'xs'} keyboard={false}>
            <Drawer.Header className='pe-6 items-center'>
                <Drawer.Title className='font-semibold text-gray-600'>{title} Brand</Drawer.Title>
                <Drawer.Actions>
                    <Button appearance="primary" color='green' onClick={onSubmit} loading={processing}>
                        <span className='font-semibold'>Submit</span>
                    </Button>
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body className='p-6'>
                {loading ? <Loader backdrop content='fetching...' vertical /> :
                    <>
                        <div className="mb-4">
                            <label className='text-gray-600 font-semibold mb-1 block'>Brand Name</label>
                            <InputGroup>
                                <Input
                                    placeholder="Attribute Name..."
                                    value={data.name}
                                    onChange={e => setData('name', e)}
                                />
                            </InputGroup>
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="mb-4">
                            <label className='text-gray-600 font-semibold mb-1 block'>Description</label>
                            <InputGroup>
                                <Input
                                    placeholder="Attribute Description..."
                                    as="textarea"
                                    rows={3}
                                    value={data.description}
                                    onChange={e => setData('description', e)}
                                />
                            </InputGroup>
                        </div>
                        <div className="mb-4">
                            <label className='text-gray-600 font-semibold mb-1 block'>Attribute Values</label>
                            <TagInput
                                trigger={['Enter', 'Space', 'Comma']}
                                placeholder="Attributes Values..."
                                onCreate={(value) => {
                                    setData('values', [...data.values, value])
                                }}
                                style={{ width: '100%', height: 100 }}
                                value={data.values}
                                onClean={() => setData('values', [])}
                            />
                        </div>
                    </>
                }
            </Drawer.Body>
        </Drawer>
    )
}
