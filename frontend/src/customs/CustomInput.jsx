import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Controller, useFormContext, get } from "react-hook-form";

const CustomInput = ({
    name,
    label,
    placeholder,
    type = "text",
    rules = {},
    rows = 3,
    dir,
    className = "",
    ...rest
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const [showPassword, setShowPassword] = useState(false);
    const error = get(errors, name || "");

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {(label || placeholder) && (
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {label || placeholder} {rules.required && <span className="text-rose-500">*</span>}
                </Label>
            )}

            {type === "date" ? (
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    type="button"
                                    className={`w-full justify-between font-normal text-left text-sm py-2.5 px-3.5 rounded-xl border ${error ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${!field.value && 'text-slate-400'}`}
                                >
                                    {field.value
                                        ? new Date(field.value).toLocaleDateString()
                                        : (placeholder || "Select date")}
                                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => {
                                        if (date) {
                                            field.onChange(date.toISOString().split('T')[0]);
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
            ) : type === "textarea" ? (
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            rows={rows}
                            placeholder={placeholder}
                            dir={dir}
                            className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border ${error ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20'} rounded-xl text-sm focus:outline-none focus:ring-2 text-slate-900 dark:text-slate-100 resize-none transition-all ${className}`}
                            {...rest}
                        />
                    )}
                />
            ) : type === "password" ? (
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field }) => (
                        <div className="relative">
                            <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder={placeholder}
                                dir={dir}
                                className={`w-full pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/50 border ${error ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20'} rounded-xl text-sm focus:outline-none focus:ring-2 text-slate-900 dark:text-slate-100 transition-all ${className}`}
                                {...rest}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    )}
                />
            ) : (
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            dir={dir}
                            className={`w-full py-2.5 bg-slate-50 dark:bg-slate-800/50 border ${error ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20'} rounded-xl text-sm focus:outline-none focus:ring-2 text-slate-900 dark:text-slate-100 transition-all ${className}`}
                            {...rest}
                        />
                    )}
                />
            )}

            {error && (
                <p className="text-xs text-rose-500 mt-0.5">{error.message}</p>
            )}
        </div>
    );
};

export default CustomInput;