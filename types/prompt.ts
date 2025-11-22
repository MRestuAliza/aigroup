import type { Tag } from "./tag";

export interface Prompt {
  title: string;
  description: string;
  tags: Tag[];
}

export interface PromptCardProps {
  title: string;
  description: string;
  tags: Tag[];
}