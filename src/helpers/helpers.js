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

export const chartColors = {
    onLight: [
        "#1F77B4",
        "#FF7F0E",
        "#2CA02C",
        "#D62728",
        "#9467BD",
        "#8C564B",
        "#E377C2",
        "#7F7F7F",
        "#BCBD22",
        "#17BECF",
        "#9EDAE5",
        "#FFBB78",
        "#98DF8A",
        "#FF9896",
    ],

    onDark: [
        "#F5D78E",
        "#E67E22",
        "#7FB3D5",
        "#6F98A8",
        "#D5B8A9",
        "#979C9F",
        "#8F534B",
        "#C0504D",
        "#4F81BD",
        "#9BBB59",
        "#4BACC6",
        "#8064A2",
        "#C3D69B",
        "#4E72B8",
    ],
}

// https://stackoverflow.com/questions/59257753/firebase-firestore-query-an-array-of-more-than-10-elements
export const chunkArray = (list, chunk) => {
    let result = []

    for (let i = 0; i < list.length; i += chunk) {
        result.push(list.slice(i, i + chunk))
    }

    return result
}
