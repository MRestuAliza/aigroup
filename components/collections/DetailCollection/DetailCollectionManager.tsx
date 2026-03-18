import CollectionDetail from '@/components/collections/DetailCollection/CollectionDetail'
import React from 'react'

// Terima props collectionId
interface Props {
  collectionId: string;
}

export default function DetailCollectionManager({ collectionId }: Props) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Collection Details</h1> 
        <p className="text-base text-muted-foreground">Manage prompts inside this specific collection.</p>
      </div>
      
      {/* Oper lagi ID-nya ke komponen utama */}
      <CollectionDetail collectionId={collectionId} />
    </div>
  )
}