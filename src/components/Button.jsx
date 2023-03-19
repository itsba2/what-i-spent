import { classNames } from "../helpers/helpers"

const Button = ({
    text,
    type = null,
    onClick = () => {},
    extraClasses = "",
    secondary = false,
    fullWidth = false,
    disabled = false,
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={classNames(
                "rounded-md p-2 font-semibold ",
                secondary
                    ? "bg-secondary text-onSecondary hover:bg-secondaryVar dark:bg-secondaryDark dark:text-onSecondaryDark dark:hover:bg-secondaryVarDark"
                    : "bg-primary text-onPrimary hover:bg-primaryVar dark:bg-primaryDark dark:text-onPrimaryDark dark:hover:bg-primaryVarDark",
                fullWidth && "w-full",
                extraClasses
            )}
        >
            {text}
        </button>
    )
}

export default Button
