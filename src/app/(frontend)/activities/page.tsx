import type { Metadata } from 'next/types'

import { ActivitiesCollectionArchive } from '@/components/ActivitiesCollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const activities = await payload.find({
    collection: 'activities',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Attività</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="activities"
          currentPage={activities.page}
          limit={12}
          totalDocs={activities.totalDocs}
        />
      </div>

      <ActivitiesCollectionArchive activities={activities.docs} />

      <div className="container">
        {activities.totalPages > 1 && activities.page && (
          <Pagination page={activities.page} totalPages={activities.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `NeurUni Website Activities`,
  }
}
