import { collectionSchema } from "@/lib/schemas";
import type { Prompt } from "./prompt";
import { z } from "zod";
import { Tag } from "./tag";


export interface CollectionPromptPreview {
  id: string;
  title: string;
  tags: Tag[];
}

export interface Collection {
  id: string;
  title: string;
  description?: string;
  color?: string;
  sortOrder?: number;
  promptCount: number;
  previews: CollectionPromptPreview[];
  createdAt?: string;
}

export interface CollectionCardProps {
    data: Collection;
}

export type CollectionFormInput = z.input<typeof collectionSchema>;
export type CollectionFormOutput = z.output<typeof collectionSchema>;