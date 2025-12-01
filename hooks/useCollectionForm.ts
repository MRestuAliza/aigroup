import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CollectionFormInput, CollectionFormOutput, Collection } from '@/types/collection';
import { collectionSchema } from "@/lib/schemas";
import { toast } from "sonner";

export function useCollectionForm(onSuccess: (newCollection: Collection) => void, initialData?: Collection | null, onOpenChange?: (open: boolean) => void) {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();

    const form = useForm<CollectionFormInput, any, CollectionFormOutput>({
        resolver: zodResolver(collectionSchema),
        defaultValues: {
            title: "",
            description: "",

        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                description: initialData.description,
            });
        } else {
            form.reset({
                title: "",
                description: "",
            });
        }
    }, [initialData, form]);

    const handleSubmitCollection = async (data: CollectionFormOutput) => {
        if (!session || !session.user) {
            toast.error("Please login first.");
            return;
        }
        try {
            const userPlan = session?.user?.plan;
            if (userPlan !== "lifetime") {
                toast.error("Only lifetime users can create collections. Please upgrade.");
                return;
            }

            let response;
            if (initialData) {
                response = await fetch(`/api/collections/${initialData.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch("/api/collections", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
            }

            const resultJson = await response.json();
            if (!response.ok) {
                if (response.status === 401) throw new Error("You must be logged in to create a collection.");
                if (response.status === 403 && resultJson.data?.plan) throw new Error(resultJson.data.plan);
                if (resultJson.message) throw new Error(resultJson.message);
                throw new Error("Failed to create collection. Please try again.");
            }
            onSuccess(resultJson);
            toast.success("Collection created successfully!");
            form.reset();
            setOpen(false);
        } catch (error) {
            console.error("Error creating collection:", error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong.");
            }
        }
    }
    return {
        form,
        open,
        setOpen,
        onSubmit: form.handleSubmit(handleSubmitCollection),
        isSubmitting: form.formState.isSubmitting,
    }
}
