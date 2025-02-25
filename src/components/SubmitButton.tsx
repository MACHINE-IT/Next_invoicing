'use client'

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button className="font-semibold py-2 px-4 rounded w-full relative">
            <span className={pending ? 'text-transparent' : ''}>Submit</span>
            {pending && (
                <span className="flex items-center justify-center w-full h-full absolute text-gray-400">
                    <LoaderCircle className="animate-spin"/>
                </span>
            )}
        </Button>
    )
};

export default SubmitButton;