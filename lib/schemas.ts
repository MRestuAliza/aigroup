import { z } from "zod";
import { TAG_COLORS } from "@/types/tag";

export const promptSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 Characters long").max(100, "title must be at most 100 Characters long").trim(),
    description: z.string().optional().transform(val => val?.trim() || ""),
    prompt: z.string().min(10, "Prompt must be at least 10 Characters long").trim(),
    tags: z.string().transform((str) => {
        if (!str) return [];
        return str.split(",").map((t) => t.trim()).filter((t) => t.length > 0).map((label) => {
                const randomColor = TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];
                return {
                    label: label,
                    color: randomColor,
                };
            });
    }),
    collectionId: z.string().optional().nullable(),
    source: z.enum(["web", "extension"]).optional(),
})

export const createPromptSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  prompt: z.string(),
  tags: z.array(
    z.object({
      label: z.string(),
      color: z.string()
    })
  ).optional().default([]),
  
  collectionId: z.string().optional().nullable(),
  source: z.enum(["web", "extension"]).optional()
});

export const collectionSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title maximum 50 characters").trim(),
  description: z.string().max(200, "Maximum description 200 characters").optional(),
  color: z.string().optional(),
});

export const createCollectionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
});