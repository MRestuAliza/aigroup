'use client';
import React, { useState } from 'react'
import type { Tag } from "@/types/tag";
import { Collection } from '@/types/collection';
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge";
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import TagChip from '@/components/common/TagChip';


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
                title: "Contesdasr",
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

function page() {
    const [search, setSearch] = useState("");

    const filteredCollections = collections.filter((collection) =>
        collection.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div>
                <div className="mb-4">
                    <h1 className="text-3xl font-bold">Collections</h1>
                    <p className="text-base text-muted-foreground">Organize your prompts into focused collections for each workflow.</p>
                </div>
                <Card className="p-4 flex flex-col border-border lg:flex-row border">
                    <Input placeholder="Search collections..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-amber-500 text-white hover:bg-amber-600 font-semibold">
                                + New Collection
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[520px]">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-[#404040]">
                                    Create New Collections
                                </DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">
                                    Add a new prompt to your collection.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="collection-title">Collection Title</Label>
                                    <Input
                                        id="collection-title"
                                        placeholder="e.g. World Class Ad Copywriter"
                                        className="border-[#E5E5E5]"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="collection-description">Description</Label>
                                    <textarea
                                        id="collection-description"
                                        placeholder="Enter your collection description here..."
                                        className="min-h-20 rounded-md border border-[#E5E5E5] p-2 text-sm"
                                    ></textarea>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" className="border-[#E5E5E5]">
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button type="submit" className="bg-amber-500 text-white hover:bg-amber-600 font-semibold">
                                    + New Collection
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Card>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
                    {filteredCollections.map((collection) => (
                        <Card className="border border-amber-100 hover:border-amber-300 transition-shadow shadow-sm h-full" key={collection.id}>
                            <CardHeader className="flex justify-between">
                                <div>
                                    <CardTitle className="font-bold text-xl">{collection.name}</CardTitle>
                                    {collection.description && (
                                        <CardDescription className="text-sm text-muted-foreground mt-1">{collection.description}</CardDescription>
                                    )}
                                </div>
                                <Badge variant="outline" className="text-[11px]">
                                    {collection.prompts.length} prompts
                                </Badge>
                            </CardHeader>

                            <CardContent className="flex-1 mt-2">
                                {collection.prompts.length > 0 ? (
                                    <div className="space-y-3">
                                        {collection.prompts.slice(0, 3).map((prompt) => (
                                            <div className="" key={prompt.title}>
                                                <div className="border border-border rounded-md p-2">
                                                    <h2 className=" text-sm font-medium line-clamp-1">{prompt.title}</h2>
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
                            <CardFooter className="flex items-center justify-between text-xs">
                                <button className="text-amber-600 hover:underline">
                                    View collection
                                </button>

                                <div className="flex gap-2 text-muted-foreground">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="hover:text-amber-500">Rename</button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[520px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl font-bold text-[#404040]">
                                                    Edit....
                                                </DialogTitle>
                                                <DialogDescription className="text-sm text-muted-foreground">
                                                    Edit your collection.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-2">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="collection-title">Collection Title</Label>
                                                    <Input
                                                        id="collection-title"
                                                        placeholder="e.g. World Class Ad Copywriter"
                                                        className="border-[#E5E5E5]"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="collection-description">Description</Label>
                                                    <textarea
                                                        id="collection-description"
                                                        placeholder="Enter your collection description here..."
                                                        className="min-h-20 rounded-md border border-[#E5E5E5] p-2 text-sm"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline" className="border-[#E5E5E5]">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button type="submit" className="bg-amber-500 text-white hover:bg-amber-600 font-semibold">
                                                    Save
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    {/* <button className="hover:text-red-500">Delete</button> */}
                                    <AlertDialog>
                                        <AlertDialogTrigger className="text-red-500 hover:text-red-600">Delete</AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete .... Collection?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone and will permanently delete your collection
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className="bg-red-500 text-white hover:bg-red-600">Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default page