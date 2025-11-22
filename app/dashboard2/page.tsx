"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import TagChip from "@/components/common/TagChip";
import type { Tag } from "@/types/tag";
import type { Prompt } from "@/types/prompt";

// Bisa dipakai lagi kalau nanti mau pindah ke file types/layout.ts
interface Collection {
  id: string;
  name: string;
  description?: string;
  prompts: Prompt[];
}

const collections: Collection[] = [
  {
    id: "marketing",
    name: "Marketing",
    description: "Ad copy, content calendar, dan semua prompt untuk marketing.",
    prompts: [
      {
        title: "World Class Ad Copywriter",
        description:
          "Craft concise and engaging ad copy for a specific audience focusing on pain points and solutions.",
        tags: [
          { label: "Google Ads", color: "green" },
          { label: "Facebook", color: "blue" },
          { label: "Marketing", color: "yellow" },
        ] as Tag[],
      },
      {
        title: "Content Calendar Generator",
        description:
          "Generate a 30-day content calendar based on your campaign goals.",
        tags: [
          { label: "Newsletter", color: "pink" },
          { label: "Blog", color: "purple" },
        ] as Tag[],
      },
      {
        title: "Content Calendar Generator",
        description:
          "Generate a 30-day content calendar based on your campaign goals.",
        tags: [
          { label: "Newsletter", color: "pink" },
          { label: "Blog", color: "purple" },
        ] as Tag[],
      },
      {
        title: "Content Calendar Generator",
        description:
          "Generate a 30-day content calendar based on your campaign goals.",
        tags: [
          { label: "Newsletter", color: "pink" },
          { label: "Blog", color: "purple" },
        ] as Tag[],
      },
    ],
  },
  {
    id: "coding",
    name: "Coding & Dev",
    description: "Prompt untuk refactoring code, generate unit test, dan debug.",
    prompts: [
      {
        title: "Code Refactoring Expert",
        description:
          "Review and refactor JavaScript/TypeScript code to improve readability and performance.",
        tags: [
          { label: "JavaScript", color: "yellow" },
          { label: "Refactor", color: "blue" },
        ] as Tag[],
      },
    ],
  },
  {
    id: "personal",
    name: "Personal Workspace",
    description: "Prompt-pribadi untuk journaling, planning, dan life admin.",
    prompts: [],
  },
];

export default function CollectionsPage() {
  const [search, setSearch] = React.useState("");

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted px-4 py-6 md:px-8">
      {/* Header Page */}
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Collections
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Group your prompts into collections like <span className="font-medium">Marketing</span>,{" "}
            <span className="font-medium">Coding</span>, or <span className="font-medium">Personal workspace</span>.
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[220px]"
          />
          <Button className="bg-amber-500 hover:bg-amber-600">
            + New Collection
          </Button>
        </div>
      </header>

      {/* List Collections */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCollections.map((collection) => (
          <Card className="border border-amber-100 hover:border-amber-300 transition-shadow shadow-sm h-full flex flex-col">
            {/* Header */}
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-lg">{collection.name}</CardTitle>

                  {collection.description && (
                    <CardDescription className="mt-1 text-xs">
                      {collection.description}
                    </CardDescription>
                  )}
                </div>

                <Badge variant="outline" className="text-[11px]">
                  {collection.prompts.length} prompts
                </Badge>
              </div>
            </CardHeader>

            {/* Prompt Preview */}
            <CardContent className="flex-1 mt-2">
              {collection.prompts.length > 0 ? (
                <div className="space-y-3">
                  {collection.prompts.slice(0, 3).map((prompt) => (
                    <div
                      key={prompt.title}
                      className="border border-border rounded-md p-2"
                    >
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {prompt.title}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-1">
                        {prompt.tags.slice(0, 3).map((tag) => (
                          <TagChip
                            key={tag.label}
                            label={tag.label}
                            colorKey={tag.color}
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                  {collection.prompts.length > 3 && (
                    <p className="text-[11px] text-muted-foreground">
                      + {collection.prompts.length - 3} more prompts
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-4 flex-1 flex items-center text-xs text-muted-foreground">
                  No prompts in this collection yet.
                </div>
              )}
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex items-center justify-between text-xs">
              <button className="text-amber-600 hover:underline">
                View collection
              </button>

              <div className="flex gap-2 text-muted-foreground">
                <button className="hover:text-amber-500">Rename</button>
                <button className="hover:text-red-500">Delete</button>
              </div>
            </CardFooter>
          </Card>

        ))}

        {filteredCollections.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-12">
            No collections found.
          </div>
        )}
      </div>
    </div>
  );
}
