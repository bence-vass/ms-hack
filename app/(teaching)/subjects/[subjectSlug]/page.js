'use client'

import React from 'react';
import {subjects} from "@/app/(teaching)/subjects/dummy_subject";
import {chapters} from "@/app/(teaching)/subjects/[subjectSlug]/dummy_chapters";
import CustomLink from "@/ui/custom-link";
import {usePathname} from "next/navigation";

function Page({params}) {
    const current_path = usePathname()

    const subject = params.subjectSlug || 'No subject found'
    return (
        <div>
            <h2>Subject: {subject}</h2>
            <ol>
                {chapters.map((topic, i) => {
                    return (<li key={i}>
                        <h2>{topic.title}</h2>
                        <ul>
                            {topic.subtopics.map((sub, j) => {
                                return (<li key={i.toString() + "-" + j.toString()}>
                                    <CustomLink active={sub.active} href={current_path + '/' + sub.slug}>
                                        {sub.title}
                                    </CustomLink>
                                </li>)
                            })}
                        </ul>
                    </li>)
                })}
            </ol>
        </div>
    );
}

export default Page;
