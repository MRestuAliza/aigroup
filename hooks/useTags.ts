import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Tag {
  label: string;
  count: number;
}

interface TagsResponse {
  status: string;
  message?: string;
  data: {
    tags: Tag[];
  };
}

interface UseTagsReturn {
  tags: Tag[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTags = (): UseTagsReturn => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/tags");
      const data: TagsResponse = await response.json();

      if (response.ok && data.status === "success") {
        setTags(data.data.tags);
      } else {
        throw new Error(data.message || "Failed to fetch tags");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      toast.error("Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const refetch = async () => {
    await fetchTags();
  };

  return {
    tags,
    loading,
    error,
    refetch,
  };
};