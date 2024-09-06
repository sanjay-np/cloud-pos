export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'error-msg ' + className}>
            {message}
        </p>
    ) : null;
}
