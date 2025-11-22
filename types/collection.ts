import type { Prompt } from "./prompt";

export interface Collection {
    id: string;
    name: string;
    description?: string;
    prompts: Prompt[];
}