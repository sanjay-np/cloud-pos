import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Index({ auth }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Expenses" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <h1>Expenses</h1>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
