const Input = ({
    label,
    id,
    name,
    register,
    onKeyUp,
    error,
    type = "text",
    placeholder = "",
    autoFocus = false,
}) => {
    return (
        <div className="flex w-full flex-col gap-2">
            <label
                htmlFor={id}
                className="font-semibold text-onBackground dark:text-onBackgroundDark"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                {...register}
                onKeyUp={onKeyUp}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className="rounded border border-primary bg-surface py-2 text-center text-onSurface outline-none ring-0 focus:ring-2 focus:ring-primary dark:border-primaryDark dark:bg-surfaceDark dark:text-onSurfaceDark dark:focus:ring-primaryDark"
            />
            {error && (
                <small className="text-error dark:text-errorDark">
                    {error.message}
                </small>
            )}
        </div>
    )
}

export default Input
