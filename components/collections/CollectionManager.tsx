import React from 'react'
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CreateCollectionDialog from './CreateCollectionDialog';
import { useCollection } from '@/hooks/useCollection';
import { Loader2 } from "lucide-react";
import CollectionCard from './CollectionCard';
import type { Collection } from '@/types/collection';

export default function CollectionManager() {
    const { collections, loading, searchParams, setSearchParams, refetch, handleDeleteCollections } = useCollection();
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchParams((prev) => ({
            ...prev,
            search: value,
        }));
    };

    const handleCreateSuccess = (newCollection: Collection) => {
        refetch();
    };
    return (
        <div>
            <Card className="p-4 flex flex-col border-border lg:flex-row borderz mb-6">
                <Input placeholder="Search collections..." value={searchParams.search ?? ""} onChange={handleSearchChange} />
                <CreateCollectionDialog onSuccess={handleCreateSuccess} />
            </Card>
            <section className="">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                    </div>
                ) : collections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {collections.map((collection) => (
                            <CollectionCard key={collection.id} data={collection} onDelete={() => handleDeleteCollections(collection.id)}/>
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
