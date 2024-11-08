import Authenticated from '@/Layouts/AuthenticatedLayout'

export default function Attribute({ auth }) {
    return (
        <Authenticated user={auth?.user} activeKey={['products']}>
        </Authenticated>
    )
}
