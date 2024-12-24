import ViewModal from '@/Components/Overlays/ViewModal'

const CustomerView = ({ modelRef, selected }) => {
    return (
        <ViewModal ref={modelRef} title={`Customer ${selected}`}>

        </ViewModal>
    )
}
export default CustomerView