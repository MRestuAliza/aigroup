"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Folder } from "lucide-react";
import type { Prompt } from "@/types/prompt";
import type { Tag } from "@/types/tag";
import TagChip from "@/components/common/TagChip";

interface Collection {
  id: string;
  name: string;
  description?: string;
  prompts: Prompt[];
  updatedAt: string;
}

const collections: Collection[] = [
  {
    id: "marketing",
    name: "Marketing",
    description: "All prompts for ads, campaigns, and content.",
    prompts: [
      {
        title: "World Class Ad Copywriter",
        description:
          "Craft concise and engaging ad copy for a specific audience.",
        tags: [
          { label: "Google Ads", color: "green" },
          { label: "Facebook", color: "blue" },
          { label: "Marketing", color: "yellow" },
        ] as Tag[],
        usageRate: "90%",
      },
    ],
    updatedAt: "2025-11-20",
  },
  {
    id: "coding",
    name: "Coding & Dev",
    description: "Refactor, unit test, and debugging prompts.",
    prompts: [
      {
        title: "Code Refactoring Expert",
        description:
          "Review and refactor JavaScript/TypeScript code for readability.",
        tags: [
          { label: "JavaScript", color: "yellow" },
          { label: "Refactor", color: "blue" },
        ] as Tag[],
        usageRate: "75%",
      },
    ],
    updatedAt: "2025-11-18",
  },
  {
    id: "personal",
    name: "Personal",
    description: "Journaling, planning, and life admin prompts.",
    prompts: [],
    updatedAt: "2025-11-17",
  },
];

export default function CollectionsPage() {
  const [search, setSearch] = React.useState("");

  const filtered = collections.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted px-4 py-6 md:px-8">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Collections
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize your prompts into focused collections for each workflow.
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

      {/* Table / List View */}
      <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableHead className="w-[40%]">Collection</TableHead>
              <TableHead className="hidden md:table-cell">
                Sample Prompts
              </TableHead>
              <TableHead className="w-[110px] text-center">
                # Prompts
              </TableHead>
              <TableHead className="hidden md:table-cell w-[140px]">
                Last updated
              </TableHead>
              <TableHead className="w-[40px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((collection) => {
              const firstPrompt = collection.prompts[0];

              return (
                <TableRow
                  key={collection.id}
                  className="hover:bg-muted/60 cursor-pointer"
                >
                  {/* Name + description */}
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Folder className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {collection.name}
                          </span>
                          {collection.prompts.length === 0 && (
                            <Badge
                              variant="outline"
                              className="text-[10px] border-dashed"
                            >
                              Empty
                            </Badge>
                          )}
                        </div>
                        {collection.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {collection.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Sample prompt (desktop only) */}
                  <TableCell className="hidden md:table-cell">
                    {firstPrompt ? (
                      <div>
                        <p className="text-xs font-medium text-foreground line-clamp-1">
                          {firstPrompt.title}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {firstPrompt.tags.slice(0, 3).map((tag) => (
                            <TagChip
                              key={tag.label}
                              label={tag.label}
                              colorKey={tag.color}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No sample prompt yet.
                      </span>
                    )}
                  </TableCell>

                  {/* Count */}
                  <TableCell className="text-center">
                    <span className="text-xs font-medium">
                      {collection.prompts.length}
                    </span>
                  </TableCell>

                  {/* Last Updated */}
                  <TableCell className="hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {collection.updatedAt}
                    </span>
                  </TableCell>

                  {/* Arrow */}
                  <TableCell className="text-right pr-4">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              );
            })}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-sm text-muted-foreground"
                >
                  No collections found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
