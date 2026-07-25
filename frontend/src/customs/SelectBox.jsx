import React from "react";
import {
    Select,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext, get } from "react-hook-form";

const SelectBox = ({
    name,
    label,
    placeholder = "Select an option",
    options = [],
    rules = {},
    dir,
    className = "",
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = get(errors, name || "");

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {(label || placeholder) && (
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {label || placeholder} {rules.required && <span className="text-rose-500">*</span>}
                </Label>
            )}

            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <Select
                        value={value || ""}
                        onValueChange={onChange}
                        dir={dir}
                    >
                        <SelectTrigger className={`w-full justify-between py-2.5 px-3.5 bg-slate-50 dark:bg-slate-800 border ${error ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 ${className}`}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>

                        <SelectContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1 z-50">
                            {options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer text-xs font-medium p-2 text-slate-800 dark:text-slate-200"
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />

            {error && (
                <p className="text-xs text-rose-500 mt-0.5">{error.message}</p>
            )}
        </div>
    );
};

export default SelectBox;
