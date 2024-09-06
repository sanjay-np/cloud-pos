import Clock from '@/Components/Clock/Clock';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="page-content dashboard-page">
                <div className="greetings-section">
                    <h1 className='title'>Hello {auth?.user?.name},</h1>
                    <Clock />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
