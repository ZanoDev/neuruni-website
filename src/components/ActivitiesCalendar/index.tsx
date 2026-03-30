'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useRouter } from 'next/navigation'

type CalendarEvent = {
  title: string
  date: string
  url?: string
}

type Props = {
  events: CalendarEvent[]
}

export default function ActivitiesCalendar({ events }: Props) {
  const router = useRouter()

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={(info) => {
        info.jsEvent.preventDefault()

        if (info.event.url) {
          router.push(info.event.url)
        }
      }}
    />
  )
}
