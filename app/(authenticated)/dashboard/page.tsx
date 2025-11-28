import { Metadata } from "next";
import PromptManager from "@/components/prompt/PromptManager"; 

export const metadata: Metadata = {
  title: "My Prompts - AI Prompt Manager",
  description: "Organize and manage your best AI prompts collection.",
};


export default async function Page() {

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Prompts</h1>
        <p className="text-muted-foreground mt-1">
          Manage your collection of high-quality AI prompts.
        </p>
      </div>
      <PromptManager />
    </div>
  );
}