'use client'

import { PresenceSchedule } from "@/components/PresenceSchedule";
import { SectionMain } from "@/components/SectionMain";
import { TitlePages } from "@/components/TitlePages";


export default function Schedule(){
    return(
        <SectionMain>
            <TitlePages title="Presença"/>

            <PresenceSchedule />
        </SectionMain>
    );
}