import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Button, Drawer, Input, InputGroup, Loader, SelectPicker, Uploader } from "rsuite";
import InputError from "../InputError";
import { AirplayIcon } from "lucide-react";
import axios from "axios";
import { previewFile } from "@/Lib/Utils";
import { toast } from "sonner";

export default function CategoryDrawer(props) {

	const { open, setOpen, title, selected, setSelected } = props
	const [loading, setLoading] = useState(false)
	const [logo, setLogo] = useState(null)
	const { data, setData, post, processing, errors, reset } = useForm({
		name: '',
		description: '',
		image: null,
		status: '',
		parent_id: 0
	})
	useEffect(() => {
		if (!selected) return;
		if (title !== 'Edit') return
		const fetchData = async () => {
			setLoading(true)
			try {
				const res = await axios.get(route('categories.find', selected));
				setData(res?.data);
				setLogo(res?.data?.image_url);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false)
			}
		};
		fetchData();
	}, [selected])


	const onSubmit = () => {
		if (title === 'Add') {
			post(route('categories.store'), {
				onSuccess: () => {
					setLogo(null)
					setOpen(false)
					reset()
					toast.success('Success', {
						description: 'Category added successfully',
					})
				}
			})
		} else if (title === 'Edit') {
			router.post(route('categories.update', selected), {
				_method: 'put',
				...data
			}, {
				onSuccess: () => {
					setOpen(false)
					setSelected(null)
					setLogo(null)
					reset()
					toast.success('Success', {
						description: 'Category updated successfully',
					})
				},
			})
		}
	}


	return (
		<React.Fragment>
			<Drawer open={open} onClose={() => setOpen(false)} backdrop={'static'} size={'xs'} keyboard={false}>

				<Drawer.Header className="pe-6 items-center">
					<Drawer.Title className='font-semibold text-gray-600'>{title} Category</Drawer.Title>
					<Drawer.Actions>
						<Button appearance="primary" color='green' onClick={onSubmit} loading={processing}>
							<span className='font-semibold'>Submit</span>
						</Button>
					</Drawer.Actions>
				</Drawer.Header>
				<Drawer.Body className="p-6">
					{loading ? (
						<Loader center content="loading" />
					) :
						<React.Fragment>
							<div className="mb-4">
								<label className='text-gray-600 font-semibold mb-1 block'>Category Name</label>
								<InputGroup>
									<Input
										placeholder="Category Name..."
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
										placeholder="Category Description..."
										as="textarea"
										rows={3}
										value={data.description}
										onChange={e => setData('description', e)}
									/>
								</InputGroup>
							</div>
							<div className="mb-4">
								<label className='text-gray-600 font-semibold mb-1 block'>Parent Category</label>
								<SelectPicker
									data={[]}
									placeholder="Select Parent Category..."
									className="text-base w-full"
									value={data.parent_id}
									onChange={value => setData('parent_id', value)}
								/>
								<InputError message={errors.parent_id} className="mt-2" />
							</div>
							<div className="mb-4">
								<label className='text-gray-600 font-semibold mb-1 block'>Category Logo</label>
								<Uploader
									className='category-logo-uploader'
									fileListVisible={false}
									listType="picture"
									action="/"
									autoUpload={false}
									onChange={file => {
										previewFile(file[0]?.blobFile, value => {
											setLogo(value);
										});
										setData('image', file[0]);
									}}
								>
									<button style={{ width: 140, height: 140 }}>
										{logo ? (
											<img src={logo} width="100%" height="100%" />
										) : (
											<AirplayIcon size={64} strokeWidth={1.2} color='gray' />
										)}
									</button>
								</Uploader>
							</div>
							<div className="mb-4">
								<label className="text-gray-600 font-semibold mb-1 block">Status</label>
								<SelectPicker
									data={[
										{ value: 'published', label: 'Published' },
										{ value: 'draft', label: 'Draft' }
									]}
									placeholder="Select status..."
									className="text-base w-full"
									value={data.status}
									onChange={value => setData('status', value)}
									placement="top"
								/>
								<InputError message={errors.status} className="mt-2" />
							</div>
						</React.Fragment>
					}
				</Drawer.Body>
			</Drawer>
		</React.Fragment>
	)
}
