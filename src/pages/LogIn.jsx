// library imports
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

// imports from files
import Button from "../components/Button"
import Input from "../components/Input"
import { useAuth } from "../auth/AuthProvider"
import AuthError from "../auth/AuthError"

const initialError = { code: "", show: false }

const LogIn = () => {
    const { logIn, currentUser } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        if (currentUser) navigate(from, { replace: true })
    }, [currentUser])

    const [error, setError] = useState(initialError)
    const {
        handleSubmit,
        formState: { errors },
        register,
        trigger,
    } = useForm()

    const onSubmit = async (data) => {
        setError(initialError)
        try {
            await logIn(data.email, data.password)
        } catch (error) {
            setError({ code: error.code, show: true })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-4 sm:w-3/4 md:w-1/2 lg:w-1/4"
            autoComplete="new-password"
        >
            <Input
                type="email"
                name="email"
                id="email"
                label="Email"
                register={{
                    ...register("email", {
                        required: {
                            value: true,
                            message: "Email is required!",
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address!",
                        },
                    }),
                }}
                onKeyUp={() => {
                    trigger("email")
                }}
                error={errors.email}
                autoFocus={true}
            />
            <Input
                type="password"
                name="password"
                id="password"
                label="Password"
                register={{
                    ...register("password", {
                        required: {
                            value: true,
                            message: "Password is required!",
                        },
                    }),
                }}
                onKeyUp={() => {
                    trigger("password")
                }}
                error={errors.password}
            />
            <Button
                type="submit"
                disabled={Object.keys(errors).length}
                text="Log In"
                fullWidth={true}
            />
            {error.show && <AuthError code={error.code} />}
            <div className="text-start">
                <p className="text-lg">
                    Forgot your password?{" "}
                    <Link
                        className="text-primary dark:text-primaryDark"
                        to="/reset-password"
                    >
                        <span className="inline-block hover:underline">
                            Reset password
                        </span>
                    </Link>
                </p>
                <p className="text-lg">
                    You don't have an account?{" "}
                    <Link
                        className="text-primary dark:text-primaryDark"
                        to="/register"
                    >
                        <span className="inline-block hover:underline">
                            Register
                        </span>
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default LogIn
