import React from 'react'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Button } from '@/components/ui/button'
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
                        <Select defaultValue="all-category">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Category: All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-category">Category: All</SelectItem>
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

                        <Button className="bg-amber-500 text-white hover:bg-amber-600 font-semibold">+ Create Prompt</Button>
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