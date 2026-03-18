'use client';
import React, { useState } from 'react'
import CollectionsManager from '@/components/collections/CollectionManager';

function page() {

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Collections</h1>
                <p className="text-base text-muted-foreground">Organize your prompts into focused collections for each workflow.</p>
            </div>
            <CollectionsManager />
        </div>
    )
}

export default page