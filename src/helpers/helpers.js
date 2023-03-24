export const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
}

export const resolveFirebaseError = (code) => {
    const errors = [
        {
            code: "auth/email-already-exists",
            msg: "Email already exists!",
        },
        {
            code: "auth/email-already-in-use",
            msg: "Email already in use!",
        },
        {
            code: "auth/user-not-found",
            msg: "Invalid username/password!",
        },
        {
            code: "auth/wrong-password",
            msg: "Invalid username/password!",
        },
        {
            code: "auth/internal-error",
            msg: "The Authentication server encountered an unexpected error while trying to process the request!",
        },
        {
            code: "auth/missing-email",
            msg: "This email address is not registered!",
        },
        {
            code: "auth/invalid-email",
            msg: "Invalid email address!",
        },
    ]
    const error = errors.find((err) => err.code === code) || {}
    return error.msg ?? "Unkown error."
}
