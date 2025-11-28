import type { Tag } from "./tag";
import { promptSchema } from "@/lib/schemas";
import { z } from "zod";

export type PromptFormInput = z.input<typeof promptSchema>;
export type PromptFormOutput = z.output<typeof promptSchema>;

export interface Prompt {
  id?: string;
  title: string;
  description: string;
  prompt: string;
  tags: Tag[];
  collectionId?: string;
  createdAt?: Date;
}

export interface PromptCardProps {
  data: Prompt;
  onEdit: (data: Prompt) => void;
}
