import FormDrawer from "@/Components/Overlays/FormDrawer";
import { Input, InputGroup, Loader, TagPicker } from "rsuite";
import InputError from "@/Components/InputError";
import { router, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { loadingText } from "@/Lib/Constants";

export default function SupplierForm(props) {
    const { drawerRef, selected, type, brands } = props

    const [loading, setLoading] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        address: '',
        contact_person: '',
        pan: '',
        brands: [],
    })

    useEffect(() => {
        if (!selected && type !== 'edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('suppliers.find', selected));
                setData(res?.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [selected])

    const onSubmit = () => {
        if (!selected && type === "add") {
            post(route('suppliers.store'), {
                onSuccess: () => {
                    reset()
                    toast.success('Success', {
                        description: 'Supplier added successfully',
                    })
                    drawerRef.current.close()
                },
            })
        }
        if (selected && type === "edit") {
            router.post(route('suppliers.update', selected), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    reset()
                    toast.success('Success', {
                        description: 'Supplier updated successfully',
                    })
                    drawerRef.current.close()
                },
            })
        }
    }

    const formClear = () => {
        reset();
    }

    return (
        <FormDrawer
            ref={drawerRef}
            processing={processing}
            onSubmit={onSubmit}
            drawerTitle={selected ? "Edit Supplier" : "Create New Supplier"}
            reset={formClear}
        >
            {loading ? <Loader center content={loadingText} vertical /> :
                <>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Firm Name</label>
                        <InputGroup>
                            <Input
                                placeholder="Firm Name..."
                                value={data.name}
                                onChange={(value) => setData('name', value)}
                            />
                        </InputGroup>
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Firm Phone</label>
                        <InputGroup>
                            <Input
                                placeholder="Firm Contact..."
                                value={data.phone}
                                onChange={(value) => setData('phone', value)}
                            />
                        </InputGroup>
                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Contact Person Name </label>
                        <InputGroup>
                            <Input
                                placeholder="Contact Person Name..."
                                value={data.contact_person}
                                onChange={(value) => setData('contact_person', value)}
                            />
                        </InputGroup>
                        <InputError message={errors.contact_person} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Firm Address </label>
                        <InputGroup>
                            <Input
                                placeholder="Firm Address..."
                                value={data.address}
                                onChange={(value) => setData('address', value)}
                            />
                        </InputGroup>
                        <InputError message={errors.address} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>PAN Number </label>
                        <InputGroup>
                            <Input
                                placeholder="PAN Number..."
                                value={data.pan}
                                onChange={(value) => setData('pan', value)}
                            />
                        </InputGroup>
                        <InputError message={errors.pan} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Supplying Brands </label>
                        <TagPicker
                            creatable
                            data={brands}
                            style={{ width: '100%' }}
                            onChange={(value) => setData('brands', value)}
                            placement='top'
                            defaultValue={data.brands}
                        />
                    </div>
                </>
            }
        </FormDrawer>
    )
} 