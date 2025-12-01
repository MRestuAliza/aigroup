"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreateCollectionDialog from './CollectionDialog';
import { useCollection } from '@/hooks/useCollection';
import { Plus, Loader2 } from "lucide-react";
import CollectionCard from './CollectionCard';
import type { Collection } from '@/types/collection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function CollectionManager() {
    const { collections, loading, searchParams, setSearchParams, refetch, handleDeleteCollections, filtersCollection, setFiltersCollection } = useCollection();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchParams((prev) => ({
            ...prev,
            search: value,
        }));
    };

    const handleFilterChange = (key: string, value: string) => {
        setFiltersCollection((prev) => ({ ...prev, [key]: value }));
    };

    const handleOpenCreate = () => {
        setSelectedCollection(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (data: Collection) => {
        setSelectedCollection(data);
        setIsDialogOpen(true);
    };

    const handleCreateSuccess = () => {
        refetch();
        setIsDialogOpen(false);
    };
    return (
        <div>
            <Card className="p-4 flex flex-col border-border lg:flex-row border gap-3 mb-6">
                <Input placeholder="Search collections..." className="w-full" value={searchParams.search ?? ""} onChange={handleSearchChange} />
                <div className="flex flex-col justify-end md:flex-row gap-3">
                    <Select value={filtersCollection.sort} onValueChange={(val) => handleFilterChange("sort", val)}>
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
                        <Plus className="w-4 h-4" /> Create Collection
                    </Button>

                    <CreateCollectionDialog key={selectedCollection ? selectedCollection.id : "new"} open={isDialogOpen} onOpenChange={setIsDialogOpen} initialData={selectedCollection} onSuccess={handleCreateSuccess} />
                </div>

            </Card>
            <section className="">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                    </div>
                ) : collections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {collections.map((collection) => (
                            <CollectionCard key={collection.id} data={collection} onEdit={handleEdit} onDelete={() => handleDeleteCollections(collection.id)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground w-full">
                        <p>No collections found matching your search.</p>
                    </div>
                )}
            </section>
        </div>
    )
}
