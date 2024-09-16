import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Button, Drawer } from "rsuite";

export default function CategoryDrawer(props) {

	const { open, setOpen, title, selected, setSelected } = props
	const [loading, setLoading] = useState(false)

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
				</Drawer.Body>
			</Drawer>
		</React.Fragment>
	)
}
