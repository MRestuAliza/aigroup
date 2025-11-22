import React from 'react'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import PromptCard from '@/components/common/PromptCard'
import { Prompt } from '@/types/prompt'

const samplePrompts: Prompt[] = [
    {
        title: "World Class Ad Copywriter",
        description:
            "A prompt to craft succinct and engaging ad copy for a specific type of audience, focusing on pain points and solutions.",
        tags: [
            { label: "Google Ads", color: "green" },
            { label: "Facebook", color: "blue" },
            { label: "Marketing", color: "yellow" },
        ],
    },
    {
        title: "Content Calendar Generator",
        description:
            "Create an effective content calendar for your business that aligns your content with your quarterly marketing goals.",
        tags: [
            { label: "Newsletter", color: "pink" },
            { label: "Blog", color: "purple" },
        ],
    },
    {
        title: "Code Refactoring Expert",
        description:
            "Review and refactor the provided JavaScript code snippet to improve readability, performance, and adherence to best practices.",
        tags: [
            { label: "Coding", color: "blue" },
            { label: "JavaScript", color: "yellow" },
        ],
    },
];

function page() {
    return (
        <div>

            <main className="">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold">My Prompts</h1>
                    <p className="text-base text-muted-foreground">Manage your prompts here.</p>
                </div>
                <Card className="p-4 flex flex-col border-border lg:flex-row border">
                    <Input placeholder="Search prompts..." className="" />
                    <div className="flex flex-col w-full gap-3 justify-end md:flex-row">
                        <Select defaultValue="all-collections">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Collections: All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-collections">Collections: All</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="coding">Coding</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select defaultValue="all-tags">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tags: All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-tags">Tags: All</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select defaultValue="created-desc">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Created Time (Newest)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="created-desc">
                                    Created Time (Newest)
                                </SelectItem>
                                <SelectItem value="created-asc">
                                    Created Time (Oldest)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-amber-500 text-white hover:bg-amber-600 font-semibold">
                                    + Create Prompt
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[520px]">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold text-[#404040]">
                                        Create New Prompt
                                    </DialogTitle>
                                    <DialogDescription className="text-sm text-muted-foreground">
                                        Add a new prompt to your collection.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="prompt-title">Prompt Title</Label>
                                        <Input
                                            id="prompt-title"
                                            placeholder="e.g. World Class Ad Copywriter"
                                            className="border-[#E5E5E5]"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="prompt-description">Description</Label>
                                        <Input
                                            id="prompt-description"
                                            placeholder="Describe what this prompt does..."
                                            className="border-[#E5E5E5]"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="prompt">Prompt</Label>
                                        <textarea
                                            id="prompt"
                                            placeholder="Enter your prompt here..."
                                            className="min-h-20 rounded-md border border-[#E5E5E5] p-2 text-sm"
                                        ></textarea>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <Input
                                            id="tags"
                                            placeholder="e.g. Google Ads, SEO, JavaScript"
                                            className="border-[#E5E5E5]"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Separate tags with commas. (optional)
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Category</Label>
                                        <Select>
                                            <SelectTrigger className="border-[#E5E5E5] w-full">
                                                <SelectValue placeholder="Select Collection" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                <SelectItem value="coding">Coding</SelectItem>
                                                <SelectItem value="design">Design</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="border-[#E5E5E5]">
                                            Cancel
                                        </Button>
                                    </DialogClose>

                                    <Button type="submit" className="bg-amber-500 text-white hover:bg-amber-600 font-semibold">
                                        Save Prompt
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card>

                <section className="space-y-4 mt-6">
                    {samplePrompts.map((prompt, index) => (
                        <PromptCard
                            key={index}
                            title={prompt.title}
                            description={prompt.description}
                            tags={prompt.tags}
                        />
                    ))}
                </section>
            </main>

        </div>
    )
}

export default page