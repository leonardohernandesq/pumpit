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
        '2023-07-01',
        '2023-07-03',
        '2023-07-04',
        '2023-07-05',
        '2023-07-07',
        '2023-07-10',
        '2023-07-11',
        '2023-07-12',
        '2023-07-13',
        '2023-07-14',
        '2023-07-17',
        '2023-07-18',
        '2023-07-19',
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