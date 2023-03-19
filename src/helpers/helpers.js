export const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
}

export const resolveFirebaseError = (code) => {
    const errors = [
        {
            code: "email-already-exists",
            msg: "Email already exists!",
        },
        {
            code: "user-not-found",
            msg: "Invalid username/password!",
        },
        {
            code: "wrong-password",
            msg: "Invalid username/password!",
        },
        {
            code: "internal-error",
            msg: "The Authentication server encountered an unexpected error while trying to process the request!",
        },
        {
            code: "missing-email",
            msg: "This email address is not registered!",
        },
        {
            code: "invalid-email",
            msg: "Invalid email address!",
        },
    ]
    const error = errors.find((err) => `auth/${err.code}` === code) || {}
    return error.msg ?? "Unkown error."
}
