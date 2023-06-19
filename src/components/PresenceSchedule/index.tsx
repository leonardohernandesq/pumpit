'use client'

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { SectionMain } from "@/components/SectionMain";
import { TitlePages } from "@/components/TitlePages";

interface ICalendarEvent{
    title:string,
    date:string,
}

export function PresenceSchedule(){
    const [schedulePresence, setSchedulePresence] = useState<ICalendarEvent[]>([]);

    function handleDateSelect(arg: any){
        const newPresence: ICalendarEvent = {
            title: "Presença",
            date: arg.startStr,
        };

        setSchedulePresence((prevPresence => [...prevPresence, newPresence]));
    };

    const attendanceDates: string[] = [
        '2023-06-01',
        '2023-06-05',
        '2023-06-10',
    ];

    useEffect(() => {
        const initialPresence: ICalendarEvent[] = attendanceDates.map((date) => ({
            title: "Presença",
            date: date
        }));

        setSchedulePresence(initialPresence);
    }, [])


    return(
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={schedulePresence}
                select={handleDateSelect}
                locale={'pt-br'}
            />
    );
}