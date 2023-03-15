const InputError = ({messages = [], showFirst, className}) => {
    if (showFirst) {
        messages = messages.slice(0, 1);
    }

    return <>
        {messages.length > 0 && (
            <>
                {messages.map((message, index) => (
                    <p key={index} className={`${className ?? ''} invalid-feedback text-sm text-danger mb-0`}>
                        {message}
                    </p>
                ))}
            </>
        )}
    </>
}

export default InputError