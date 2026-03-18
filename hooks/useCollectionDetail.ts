import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Prompt } from "@/types/prompt";

interface FilterParams {
  search?: string;
  tag?: string;
  sort?: string;
}

// 1. Kita definisikan bentuk datanya biar TypeScript senang
interface CollectionMeta {
  id: string;
  title: string;
  description: string;
}

export function useCollectionDetail(collectionId: string) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  
  // 2. INI PIRING BARUNYA: State untuk menyimpan info Collection (Title & Desc)
  const [collection, setCollection] = useState<CollectionMeta | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterParams>({
    search: "",
    tag: "all-tags",
    sort: "created-desc",
  });

  const fetchPromptsByCollectionId = useCallback(async () => {
    if (!collectionId) return; 

    try {
      setLoading(true);

      const params = new URLSearchParams();
      // Ingat: Endpoint kamu sepertinya sudah menghandle ID di URL path (/api/collections/ID)
      // Jadi mungkin params filter ini untuk fitur search di dalam collection tsb
      if (filters.search) params.append("search", filters.search);
      if (filters.tag && filters.tag !== "all-tags") {
        params.append("tag", filters.tag);
      }
      if (filters.sort) params.append("sort", filters.sort);

      // Panggil API
      const res = await fetch(`/api/collections/${collectionId}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Failed to fetch");

      // 3. AMBIL BURGERNYA (Collection Info)
      if (json.data && json.data.collection) {
        setCollection({
          id: json.data.collection._id,
          title: json.data.collection.title,
          description: json.data.collection.description,
        });
      }

      // 4. AMBIL KENTANGNYA (Prompts List)
      // Pastikan cek json.data.prompts ada atau tidak (kadang kosong array)
      const rawPrompts = json.data.prompts || []; 
      const mappedPrompts: Prompt[] = rawPrompts.map((p: any) => ({
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
      toast.error("Failed to load collection details");
    } finally {
      setLoading(false);
    }
  }, [collectionId, filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPromptsByCollectionId();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchPromptsByCollectionId]);

  return {
    collection, // <--- JANGAN LUPA DI-RETURN BIAR BISA DIPAKAI DI UI
    prompts,
    loading,
    filters,
    setFilters,
    refetch: fetchPromptsByCollectionId,
  };
}