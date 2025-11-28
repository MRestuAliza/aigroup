import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PromptFormInput, PromptFormOutput, Prompt } from "@/types/prompt";
import { promptSchema } from "@/lib/schemas";
import { toast } from "sonner";

export function usePromptForm(onSuccess: (newPrompt: Prompt) => void, initialData?: Prompt | null) {
    const { data: session } = useSession();
    const form = useForm<PromptFormInput, any, PromptFormOutput>({
        resolver: zodResolver(promptSchema),
        defaultValues: {
            title: "",
            description: "",
            prompt: "",
            tags: "",
            collectionId: undefined,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                description: initialData.description,
                prompt: initialData.prompt,
                tags: (initialData.tags || []).map((t: any) => t.label || t).join(", "),
                collectionId: initialData.collectionId,
            });

        } else {
            form.reset({
                title: "",
                description: "",
                prompt: "",
                tags: "",
                collectionId: undefined,
            });
        }
    }, [initialData, form]);

    const handleFormSubmit = async (data: PromptFormOutput) => {
        if (!session || !session.user) {
            toast.error("Please login first.");
            return;
        }

        try {
            const userPlan = session?.user?.plan;
            const payload = { ...data };
            if (userPlan !== "lifetime") {
                toast.error("Only lifetime users can create prompts. Please upgrade.");
                return;
            }


            if (payload.collectionId === "uncategorized" || payload.collectionId === "") {
                payload.collectionId = null;
            }

            let response;
            if (initialData) {
                response = await fetch(`/api/prompts/${initialData.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch("/api/prompts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
            }

            const resultJson = await response.json();

            if (!response.ok) {
                if (resultJson.message) throw new Error(resultJson.message);
                throw new Error("Failed to save prompt.");
            }

            onSuccess(resultJson);
            toast.success(initialData ? "Prompt updated!" : "Prompt created!");

        } catch (error: any) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Something went wrong.");
        }
    }

    return {
        form,
        onSubmit: form.handleSubmit(handleFormSubmit),
        isSubmitting: form.formState.isSubmitting,
    };
}