import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Prompt } from "@/types/prompt";

interface FilterParams {
  search?: string;
  collectionId?: string;
  tag?: string;
  sort?: string;
}

export function usePrompts(initialData: Prompt[] = [], initialFilters?: FilterParams) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialData);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterParams>({
    search: "",
    collectionId: "all-collections",
    tag: "all-tags",
    sort: "created-desc",
    ...initialFilters
  });

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.collectionId && filters.collectionId !== "all-collections") {
        params.append("collectionId", filters.collectionId);
      }
      if (filters.tag && filters.tag !== "all-tags") {
        params.append("tag", filters.tag);
      }
      if (filters.sort) params.append("sort", filters.sort);

      const res = await fetch(`/api/prompts?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Failed to fetch");
      const mappedPrompts: Prompt[] = json.data.prompts.map((p: any) => ({
        id: p._id,
        title: p.title,
        description: p.description,
        prompt: p.prompt,
        tags: p.tags,
        createdAt: p.createdAt,
      }));

      setPrompts(mappedPrompts);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load prompts");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleDeletePrompt = async (id: string) => {
    try {
      const res = await fetch(`/api/prompts/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Failed to delete prompt");
      }

      setPrompts((prevPrompts) => prevPrompts.filter((p) => p.id !== id));
      toast.success("Prompt deleted successfully");
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPrompts();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchPrompts]);

  return {
    prompts,
    loading,
    filters,
    setFilters,
    refetch: fetchPrompts,
    handleDeletePrompt
  };
}