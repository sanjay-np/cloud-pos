import { Head } from "@inertiajs/react"

const ErrorPage = ({ status }: {
    status: number,
}) => {

    return (
        <>
            <Head title="Error" />
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center">
                {status === 404 && (
                    <div className="text-center flex flex-col gap-2.5 items-center justify-center">
                        <img src="/icons/svgs/19.svg" className="w-96 h-96" />
                        <h1 className="text-4xl font-bold">Where Did That Page Go?</h1>
                        <p className="max-w-2xl w-full">
                            It looks like you've stumbled upon a page that isn't here anymore. Don't worry, even the internet gets lost sometimes! Let's get you back on track.
                        </p>
                    </div>
                )}

                {status === 500 && (
                    <div className="text-center flex flex-col gap-2.5 items-center justify-center">
                        <img src="/icons/svgs/20.svg" className="w-96 h-96" />
                        <h1 className="text-4xl font-bold">Something Broke on Our Server</h1>
                        <p className="max-w-2xl w-full">
                            We apologize for the inconvenience. Our server is having a moment. Please refresh the page or try again later. If the problem persists, please contact support.
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ErrorPage
