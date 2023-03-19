import { resolveFirebaseError } from "../helpers/helpers"

const AuthError = ({ code }) => {
    const errorMsg = resolveFirebaseError(code)
    return <small className="text-error dark:text-errorDark">{errorMsg}</small>
}

export default AuthError
