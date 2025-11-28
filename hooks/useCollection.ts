import { useCallback, useEffect, useState } from 'react'
import { toast } from "sonner";
import type { Collection } from "@/types/collection";

interface SearchParams {
    search?: string;
}

export function useCollection(initialData: Collection[] = [], initialSearchParams: SearchParams = {}) {
    const [collections, setCollections] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);

    const fetchCollections = useCallback(async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();
            if (searchParams.search) params.append("search", searchParams.search);

            const res = await fetch(`/api/collections?${params.toString()}`);
            const json = await res.json();

            if (!res.ok) throw new Error(json.message || "Failed to fetch");
            const mappedCollections: Collection[] = json.data.collections.map((c: any) => ({
                id: c._id,
                title: c.title,
                description: c.description ?? "",
                color: c.color,
                sortOrder: c.sortOrder,
                promptCount: c.promptCount ?? (c.previews?.length || 0),
                previews: (c.previews || []).map((p: any) => ({
                    id: p._id,
                    title: p.title,
                    tags: p.tags || [],
                })),
                createdAt: c.createdAt,
            }));


            setCollections(mappedCollections);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load collections");
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    const handleDeleteCollections = async (id: string) => {
        try {
            const res = await fetch(`/api/collections/${id}`, {
                method: "DELETE",
            });

            const json = await res.json();
            if (!res.ok) {
                throw new Error(json.message || "Failed to delete collection");
            }

            setCollections((prevCollection) => prevCollection.filter((p) => p.id !== id));
            toast.success("Collection deleted successfully");
        } catch (error: any) {
            console.error("Delete error:", error);
            toast.error(error.message || "Something went wrong");
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCollections();
        }, 500);
        return () => clearTimeout(timer);
    }, [fetchCollections]);

    return {
        collections,
        loading,
        searchParams,
        setSearchParams,
        refetch: fetchCollections,
        handleDeleteCollections
    }
}
