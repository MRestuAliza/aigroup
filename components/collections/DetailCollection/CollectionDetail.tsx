"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PromptFormDialog from "@/components/prompt/PromptFormDialog";
import PromptCard from "@/components/prompt/PromptCard";
import { usePrompts } from "@/hooks/usePrompts";
import type { Prompt } from "@/types/prompt";
import { useCollectionDetail } from "@/hooks/useCollectionDetail";
import { useRouter } from 'next/navigation';

interface Props {
  collectionId: string;
}

export default function CollectionDetail({ collectionId }: Props) {
  const { handleDeletePrompt } = usePrompts();
  const { collection, prompts, loading, filters, setFilters, refetch } = useCollectionDetail(collectionId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const router = useRouter();

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
  const handleBack = () => {
    router.push('/collections');
  }

  return (
    <>
      <div className="mb-8">
        <Button onClick={handleBack} className="bg-amber-500 mb-2 hover:bg-amber-600 text-white font-semibold gap-2">
          ← Back
        </Button>
        <h1 className="text-3xl font-bold">{collection?.title}</h1>
        <p className="text-base text-muted-foreground">{collection?.description}</p>
      </div>
      <Card className="p-4 flex flex-col border-border lg:flex-row border gap-3 mb-6">
        <Input placeholder="Search prompts..." className="w-full" value={filters.search} onChange={(e) => handleFilterChange("search", e.target.value)} />
        <div className="flex flex-col w-full gap-3 justify-end md:flex-row">
          <Select value={filters.tag} onValueChange={(val) => handleFilterChange("tag", val)}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Tags: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-tags">Tags: All</SelectItem>
              {/* {tagsLoading ? (
                <SelectItem value="" disabled>Loading tags...</SelectItem>
              ) : (
                tags.map((tag) => (
                  <SelectItem key={tag.label} value={tag.label}>
                    {tag.label} ({tag.count})
                  </SelectItem>
                ))
              )} */}
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
            <PromptCard key={prompt.id} data={prompt} onEdit={handleEdit} onDelete={() => handleDeletePrompt(prompt.id)} />
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