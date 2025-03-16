import AvatarUpload from "@/components/ui/avatar-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { validateImageFile } from "@/lib/utils";

type BrandFormProps = {
	data: any;
	setData: any;
	errors: any;
	isProcessing: boolean
}

const BrandForm = ({ data, setData, errors, isProcessing }: BrandFormProps) => {

	const handleImageUpload = async (file: File) => {
		const isValid = validateImageFile(file);
		if (!isValid) return;
		setData('image', file)
	}

	if (isProcessing) {
		return (
			<div>
				{/* Todo: Add Skeletion */}
				Loading...
			</div>
		)
	}

	return (
		<div className="grid gap-4 px-4">
			<div className="flex w-full gap-4 items-center justify-between mb-2">
				<div className="relative">
					<AvatarUpload
						onImageUpload={handleImageUpload}
						fallback="BL"
						size="lg"
						initialImage={data?.image_url}
					/>
				</div>
				<div className="text-left">
					<h2 className="font-semibold text-lg">Brand Logo</h2>
					<p className="text-muted-foreground text-xs">Upload a profile picture to personalize customer's account</p>
				</div>
			</div>
			<div className="grid w-full gap-2">
				<Label>Brand Name</Label>
				<Input
					type="text"
					placeholder="Nike"
					defaultValue={data.name}
					onChange={(e) => setData('name', e.target.value)}
				/>
			</div>
			<div className="grid w-full gap-2">
				<Label htmlFor="message">Description</Label>
				<Textarea
					placeholder="Description"
					id="message"
					className="border"
					defaultValue={data.description}
					rows={5}
					onChange={(e) => setData('description', e.target.value)}
				/>
			</div>
		</div>
	)
}

export default BrandForm