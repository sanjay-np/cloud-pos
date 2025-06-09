const ErrorPage = ({ status, message }: {
    status: number,
    message: string
}) => {
    return (
        <div>
            <h1>Error {status}</h1>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPage
