import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import ActivitiesCalendar from '@/components/ActivitiesCalendar'

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
      fields: true,
      meta: true,
    },
  })

  const colorMap = {
    white: {
      backgroundColor: '#ffffff',
      borderColor: '#b3b3b3',
      textColor: '#333333',
    },
    blue: {
      backgroundColor: '#3399ff',
      borderColor: '#0066ff',
      textColor: '#f2f2f2',
    },
    red: {
      backgroundColor: '#ff6666',
      borderColor: '#ff5050',
      textColor: '#f2f2f2',
    },
    yellow: {
      backgroundColor: '#cccc00',
      borderColor: '#cc9900',
      textColor: '#333333',
    },
    green: {
      backgroundColor: '#33cc33',
      borderColor: '#009900',
      textColor: '#f2f2f2',
    },
    purple: {
      backgroundColor: '#9933ff',
      borderColor: '#6600cc',
      textColor: '#f2f2f2',
    },
    brown: {
      backgroundColor: '#cc9966',
      borderColor: '#996633',
      textColor: '#f2f2f2',
    },
    orange: {
      backgroundColor: '#ff9900',
      borderColor: '#cc3300',
      textColor: '#f2f2f2',
    },
  }

  const events = activities.docs.map((activity) => {
    const colors = colorMap[activity.fields.color] // mappatura colori per avere sfondo e bordo con colori diversi

    return {
      title: activity.title,
      date: activity.fields.activityDate,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      textColor: colors.textColor,
      url: `/activities/${activity.slug}`,
    }
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1>Calendario delle attività</h1>
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

      <ActivitiesCalendar events={events} />

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
