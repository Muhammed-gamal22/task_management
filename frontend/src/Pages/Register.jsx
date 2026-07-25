import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/services/services";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTokenStore } from "@/store/token-store";
import { ListTodo, Loader2, ArrowRight } from "lucide-react";
import CustomInput from "@/customs/CustomInput";
import CustomButton from "@/customs/CustomButton";

export default function Register() {
    const navigate = useNavigate();
    const { setToken } = useTokenStore();

    const methods = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const passwordValue = methods.watch("password");

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => postData("/auth/register", {
            name: data.name,
            email: data.email,
            password: data.password,
        }),
        onSuccess: (response) => {
            if (response?.token) {
                setToken(response.token);
                localStorage.setItem("token", response.token);
                toast.success("Account created successfully!");
                navigate("/tasks");
            } else {
                toast.success("Registration successful! Please log in.");
                navigate("/login");
            }
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || error.message || "Registration failed");
        },
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-sm">
                        <ListTodo className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                        Create an account
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Join us today and organize your tasks efficiently
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name Input */}
                            <CustomInput
                                name="name"
                                label="Full Name"
                                placeholder="John Doe"
                                rules={{
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters",
                                    },
                                }}
                            />
                            {/* Email Input */}
                            <CustomInput
                                name="email"
                                label="Email Address"
                                placeholder="name@example.com"
                                type="email"
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address",
                                    },
                                }}
                            />

                            {/* Password Input */}
                            <CustomInput
                                name="password"
                                label="Password"
                                placeholder="••••••••"
                                type="password"
                                rules={{
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                }}
                            />

                            {/* Confirm Password Input */}
                            <CustomInput
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="••••••••"
                                type="password"
                                rules={{
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === passwordValue || "Passwords do not match",
                                }}
                            />

                            {/* Submit CustomButton */}
                            <CustomButton
                                type="submit"
                                isLoading={isPending || methods.formState.isSubmitting}
                                className="w-full py-2.5 bg-white hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 mt-2"
                            >
                                Sign Up
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </CustomButton>
                        </form>
                    </FormProvider>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-primary hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

