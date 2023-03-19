// library imports
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

// imports from files
import Button from "../components/Button"
import Input from "../components/Input"
import { useAuth } from "../auth/AuthProvider"
import AuthError from "../auth/AuthError"

const initialError = { code: "", show: false }

const Register = () => {
    const { createUser, currentUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) navigate("/", { replace: true })
    }, [currentUser])

    const {
        handleSubmit,
        formState: { errors },
        register,
        trigger,
        watch,
    } = useForm()

    const [error, setError] = useState(initialError)

    const onSubmit = async (data) => {
        setError(initialError)
        try {
            await createUser(data.email, data.password, data.username)
        } catch (error) {
            setError({ code: error.code, show: true })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-4 sm:w-3/4 md:w-1/2 lg:w-1/4"
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
                        pattern: {
                            value: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&\'()*+,-.\/:;<=>?@[\]^_`{|}~])[\w\d!"#$%&\'()*+,-.\/:;<=>?@[\]^_`{|}~]{8,}$/i,
                            message:
                                "Password must contain at least one letter, one number and one special character. No spaces.",
                        },
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters!",
                        },
                    }),
                }}
                onKeyUp={() => {
                    trigger("password")
                }}
                error={errors.password}
            />
            <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm Password"
                register={{
                    ...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "You need to confirm the password!",
                        },
                        validate: (value) =>
                            value === watch("password") ||
                            "The password does not match",
                    }),
                }}
                onKeyUp={() => {
                    trigger("confirmPassword")
                }}
                error={errors.confirmPassword}
            />
            <Input
                type="text"
                name="username"
                id="username"
                label="Username"
                register={{
                    ...register("username", {
                        required: {
                            value: true,
                            message: "Username is required!",
                        },
                        pattern: {
                            value: /^[A-Za-z][A-Za-z0-9_]{4,14}$/i,
                            message:
                                "Username must start with a letter and only contain letter, number and underscore",
                        },
                        minLength: {
                            value: 5,
                            message: "Username must be at least 5 characters!",
                        },
                        maxLength: {
                            value: 15,
                            message: "Username must be at most 15 characters",
                        },
                    }),
                }}
                onKeyUp={() => {
                    trigger("username")
                }}
                error={errors.username}
            />
            <Button
                type="submit"
                disabled={Object.keys(errors).length}
                text="Register"
                fullWidth={true}
            />
            {error.show && <AuthError code={error.code} />}
            <p className="text-lg">
                Already have an account?{" "}
                <Link
                    className="text-primary dark:text-primaryDark"
                    to="/login"
                >
                    <span className="inline-block hover:underline">Log In</span>
                </Link>
            </p>
        </form>
    )
}

export default Register
