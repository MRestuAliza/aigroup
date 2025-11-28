"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PromptFormDialog from "./PromptFormDialog";
import PromptCard from "./PromptCard";
import { usePrompts } from "@/hooks/usePrompts";
import type { Prompt } from "@/types/prompt";

interface Props {
  initialData: Prompt[];
}

export default function PromptManager() {
  const { prompts, loading, filters, setFilters, refetch, handleDeletePrompt } = usePrompts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleOpenCreate = () => {
    setSelectedPrompt(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (data: Prompt) => {    
    setSelectedPrompt(data);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    refetch();
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card className="p-4 flex flex-col border-border lg:flex-row border gap-3 mb-6">
        <Input 
            placeholder="Search prompts..." 
            className="w-full" 
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
        />

        <div className="flex flex-col w-full gap-3 justify-end md:flex-row">
            <Select value={filters.collectionId} onValueChange={(val) => handleFilterChange("collectionId", val)}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Collections: All" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-collections">Collections: All</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="coding">Coding</SelectItem>
                </SelectContent>
            </Select>
            <Select value={filters.tag} onValueChange={(val) => handleFilterChange("tag", val)}>
                <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Tags: All" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-tags">Tags: All</SelectItem>
                    <SelectItem value="SEO">SEO</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                </SelectContent>
            </Select>
            <Select value={filters.sort} onValueChange={(val) => handleFilterChange("sort", val)}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="created-desc">Newest First</SelectItem>
                    <SelectItem value="created-asc">Oldest First</SelectItem>
                    <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                </SelectContent>
            </Select>

            <Button onClick={handleOpenCreate} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2">
                <Plus className="w-4 h-4" /> Create Prompt
            </Button>
            
            <PromptFormDialog 
                key={selectedPrompt ? selectedPrompt.id : "new"}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                initialData={selectedPrompt}
                onSuccess={handleSuccess}
            />
        </div>
      </Card>

      <section className="space-y-4">
        {loading ? (
           <div className="flex justify-center py-20">
               <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
           </div>
        ) : prompts.length > 0 ? (
            prompts.map((prompt) => (
                <PromptCard key={prompt.id} data={prompt} onEdit={handleEdit} onDelete={() => handleDeletePrompt(prompt.id)}/>
            ))
        ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                <p>No prompts found matching your search.</p>
            </div>
        )}
      </section>
    </>
  );
}