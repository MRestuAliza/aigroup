'use client';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Collection } from "@/types/collection";
import { useCollectionForm } from "@/hooks/useCollectionForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: Collection | null;
    onSuccess: (newCollection: Collection) => void;
}

export default function CollectionDialog({ open, onOpenChange, initialData, onSuccess }: Props) {
    const isEditMode = !!initialData;
    const { form, onSubmit, isSubmitting } = useCollectionForm(onSuccess, initialData);

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[520px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-[#404040]">
                            {isEditMode ? "Edit Collection" : "Create New Collection"}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            {isEditMode ? "Edit your collection." : "Create a new collection."}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <FormField
                                control={form.control as any}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Collection Title</FormLabel>
                                        <FormControl><Input placeholder="Enter your collection title here..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control as any}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Write description..." className="min-h-[100px] resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
                                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white" disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : (isEditMode ? "Update Collection" : "Create Collection")}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>
        </>
    )
}
