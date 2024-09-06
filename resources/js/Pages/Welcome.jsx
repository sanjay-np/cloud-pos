import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="Welcome" />
            <header>
                <nav className="-mx-3 flex flex-1 justify-end">
                    {auth.user ? (
                        <Link href={route('dashboard')}>
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')}>
                                Log in
                            </Link>
                            <Link href={route('register')}>
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
            <footer>
                Laravel v{laravelVersion} (PHP v{phpVersion})
            </footer>
        </>
    );
}
