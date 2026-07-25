import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CustomButton = ({
    children,
    isLoading = false,
    disabled = false,
    className = "",
    icon: Icon,
    ...props
}) => {
    return (
        <Button
            disabled={disabled || isLoading}
            className={`cursor-pointer font-semibold transition-all duration-200 active:scale-95 rounded-xl shadow-sm disabled:opacity-50 ${className}`}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {children}
                </>
            ) : (
                <>
                    {Icon && <Icon className="w-4 h-4" />}
                    {children}
                </>
            )}
        </Button>
    );
};

export default CustomButton;