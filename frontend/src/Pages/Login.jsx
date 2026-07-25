import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/services/services";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "@/customs/CustomInput";


export default function Login() {
    const navigate = useNavigate();
    const params = useParams();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => postData("/auth/login", data),
        onSuccess: (response) => {
            localStorage.setItem("token", response.token);
            toast.success("Login successful!");
            navigate("/tasks");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || error.message);
        },
    });
    const methods = useForm({
        defaultValues: {
            user_email: "",
            user_password: "",
            company_id: "",
        },
    });

    const onSubmit = async (data) => {
        await mutate({
            ...data,
            company_id: params?.id || "",
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center  px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl flex gap-2 flex-col items-center justify-center font-bold">
                        <h2>Login</h2>

                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <div className="space-y-2">
                                <CustomInput
                                    rules={{
                                        required: "البريد الإلكتروني مطلوب",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "الرجاء إدخال بريد إلكتروني صالح"
                                        }
                                    }}
                                    name="email" placeholder="البريد الإلكتروني" type="email" />
                                <CustomInput
                                    rules={{
                                        required: "كلمة المرور مطلوبة",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "كلمة المرور يجب أن تكون على الأقل 6 أحرف",
                                        },
                                    }}
                                    name="password" placeholder="كلمة المرور" type="password" />
                                {/* <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="البريد الإلكتروني"
                                {...register("user_email", {
                                    required: "البريد الإلكتروني مطلوب",
                                    pattern: {
                                        value:
                                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "الرجاء إدخال بريد إلكتروني صالح",
                                    },
                                })}
                            />

                            {errors.user_email && (
                                <p className="text-sm text-destructive">
                                    {errors.user_email.message}
                                </p>
                            )} */}
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={methods.formState.isSubmitting}
                            >
                                تسجيل الدخول
                                {/* {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"} */}
                            </Button>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    );
}