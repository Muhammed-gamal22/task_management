import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Controller } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import { get } from "react-hook-form";

const CustomInput = (props) => {

    const {
        control,
        formState: { errors },
    } = useFormContext();
    const error = get(errors, props.name || "");
    return (
        <div className="flex flex-col gap-3">
            <Label>{props.placeholder}</Label>

            {props.type === "date" ? (
                <Controller
                    control={control}
                    name={props.name}
                    rules={props.rules}
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="justify-between">
                                    {field.value
                                        ? new Date(field.value).toLocaleDateString("ar-EG")
                                        : "اختر تاريخ"}
                                    <CalendarIcon />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => field.onChange(date)}
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
            ) : (
                <Controller
                    control={control}
                    rules={props.rules}
                    render={({ field }) => (
                        <>
                            <Input {...field} {...props}
                                dir="rtl" className="border border-primary" />

                        </>
                    )}
                    name={props.name}
                />
            )}
            {error &&
                <p className="text-red-500">{error?.message}</p>
            }
        </div>
    )
}
export default CustomInput