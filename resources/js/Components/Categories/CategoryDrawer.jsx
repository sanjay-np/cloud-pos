import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Button, Drawer, Input, InputGroup, Uploader } from "rsuite";
import InputError from "../InputError";
import { AirplayIcon } from "lucide-react";

export default function CategoryDrawer(props) {

	const { open, setOpen, title, selected, setSelected } = props
	const [loading, setLoading] = useState(false)
	const [logo, setLogo] = useState(null)
	const { data, setData, post, processing, errors, reset } = useForm({
		name: '',
		description: '',
		image: null
	})


	const onSubmit = () => { }


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
						<label className='text-gray-600 font-semibold mb-1 block'>Category Logo</label>
						<Uploader
							className='category-logo-uploader'
							fileListVisible={false}
							listType="picture"
							action="/"
							autoUpload={false}
							onChange={file => {
								previewFile(file[0]?.blobFile, value => { setLogo(value); });
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
				</Drawer.Body>
			</Drawer>
		</React.Fragment>
	)
}
