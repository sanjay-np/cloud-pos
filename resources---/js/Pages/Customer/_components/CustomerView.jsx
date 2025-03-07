import ViewModal from '@/Components/Overlays/ViewModal'

const CustomerView = ({ modelRef, selected }) => {
    return (
        <ViewModal ref={modelRef} title={`Customer Details`} size='md'>

        </ViewModal>
    )
}
export default CustomerView