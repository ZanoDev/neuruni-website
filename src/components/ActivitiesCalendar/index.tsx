'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import itLocale from '@fullcalendar/core/locales/it'
import { useRouter } from 'next/navigation'

type CalendarEvent = {
  title: string
  date: string
  backgroundColor: string
  borderColor: string
  textColor: string
  url: string
}

type Props = {
  events: CalendarEvent[]
}

export default function ActivitiesCalendar({ events }: Props) {
  const router = useRouter()

  return (
    <div className="w-full max-w-5xl mx-auto px-4 font-mono">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        locale={itLocale}
        height="auto"
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="24:00:00"
        headerToolbar={{
          left: 'prev today next',
          center: 'title',
          right: 'timeGridDay timeGridWeek dayGridMonth',
        }}
        buttonText={{
          timeGridDay: 'Oggi',
          timeGridWeek: 'Settimana',
          dayGridMonth: 'Mese',
        }}
        initialView="timeGridWeek"
        events={events}
        eventClick={(info) => {
          info.jsEvent.preventDefault()

          if (info.event.url) {
            router.push(info.event.url)
          }
        }}
        dayMaxEventRows={true}
        eventDisplay="block"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
      />
    </div>
  )
}
