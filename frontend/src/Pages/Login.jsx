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

export default function Login() {
    const navigate = useNavigate();
    const { setToken } = useTokenStore();

    const methods = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => postData("/auth/login", data),
        onSuccess: (response) => {
            if (response?.token) {
                setToken(response.token);
                localStorage.setItem("token", response.token);
                toast.success("Logged in successfully!");
                navigate("/tasks");
            } else {
                toast.error("Invalid server response. Token missing.");
            }
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || error.message || "Failed to log in");
        },
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md space-y-8">

                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-sm">
                        <ListTodo className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                        Welcome back
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Enter your credentials to access your tasks dashboard
                    </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
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
                            <CustomButton
                                type="submit"
                                isLoading={isPending || methods.formState.isSubmitting}
                                className="w-full py-2.5 bg-white hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2"
                            >
                                Sign In
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </CustomButton>
                        </form>
                    </FormProvider>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-primary hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

