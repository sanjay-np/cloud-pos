import { useEffect, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import AppSheet from '@/components/app/app-sheet';
import SaleForm from './sale-form';

import { useSheetStore } from '@/hooks/use-sheet';
import { type Mode } from '@/types';

type SaleOperationProps = {
	saleId: number | null;
	mode: Mode
}

const SaleOperation = ({ saleId, mode }: SaleOperationProps) => {

	const drawerTitle = mode == 'add'
		? 'Add Sale'
		: mode == 'edit'
			? "Edit Sale"
			: 'Sale Details'

	const [isProcessing, setIsProcessing] = useState<boolean>(false)
	const [sale, setSale] = useState<any | null>(null)
	const { closeSheet } = useSheetStore()

	const {
		data,
		setData,
		post,
		processing,
		errors,
		reset,
	} = useForm<Required<any>>({
		date: "",
		products: [],
		customer_id: "",
		tax_percentage: 0,
		tax_amount: 0,
		discount_amount: 0,
		shipping_amount: 0,
		total_amount: 0,
		paid_amount: 0,
		due_amount: 0,
		status: "",
		payment_status: "",
		payment_method: "",
		note: "",
	})

	const handleSubmit = () => {
		if (mode == "add") {
			post(route('sales.store'), {
				onSuccess: () => {
					toast.success('Sales created successfully')
					closeSheet()
					reset();
				}
			})
		}
		if (mode == "edit" && saleId) {
			router.post(route('sales.update', saleId), {
				_method: "put",
				...data
			}, {
				onSuccess: () => {
					toast.success('Sales updated successfully')
					closeSheet()
					reset();
				}
			})
		}
	}

	useEffect(() => {
		if (!saleId) return

		setIsProcessing(true)
		const fetchPurchase = async () => {
			try {
				const result = await fetch(route('sales.show', saleId))
				const response = await result.json()

				if (response) {
					setSale(response)
					setData(response)
					setIsProcessing(false)
				}

			} catch (err: any) {
				console.log(err);
			} finally {
				setIsProcessing(false)
			}
		}
		fetchPurchase()

	}, [saleId])

	return (
		<AppSheet
			title={drawerTitle}
			subTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
			onConfirm={handleSubmit}
			processing={processing}
			width={"sm:max-w-[720px]"}
		>
			{(mode == 'add' || mode == 'edit') && (
				<SaleForm
					data={data}
					setData={setData}
					errors={errors}
					isProcessing={isProcessing}
				/>
			)}
			{mode == 'view' && (
				<div className="grid gap-4 px-4">
					{(isProcessing && !sale) && (
						<>
							loading...
						</>
					)}
					{(!isProcessing && sale) && (
						<>
							{JSON.stringify(sale, null, 2)}
						</>
					)}
				</div>
			)}
		</AppSheet>
	)
}

export default SaleOperation