import React from 'react'
import CollectionDetail from '@/components/collections/DetailCollection/CollectionDetail'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  return (
    <div><CollectionDetail collectionId={id} /></div>
  )
}
