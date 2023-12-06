'use client'
import React from 'react';
import { subjects } from "@/app/(teaching)/subjects/dummy_subject";
import { chapters } from "@/app/(teaching)/subjects/[subjectSlug]/dummy_chapters";
import CustomLink from "@/ui/custom-link";
import { usePathname } from "next/navigation";

// Define the component styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    //boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#000000',
    fontSize: '2.5rem',
    marginBottom: '15px',
    textAlign: 'center',
  },
  chapterCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
  },
  chapterTitle: {
    color: '#F0462A',
    fontSize: '1.5rem',
    margin: '10px 0',
    position: 'relative',

  },
  subTopicLink: {
    textDecoration: 'none',
    color: '#555',
    fontSize: '1.2rem',
    margin: '5px 0',
    display: 'block',
  },
  listNumber: {
    content: 'counter(li)',
    counterIncrement: 'listNumber',
    marginRight: '5px',
    fontWeight: 'bold',
    color: '#ffffff',
    position: 'absolute',
    left: '-20px',
  },
  subTopic: {
    color: '#555',
    fontSize: '1.2rem',
    margin: '5px 0',
    paddingLeft: '10px',
  },
};

function Page({ params }) {
  // Get the current path using the usePathname hook
  const current_path = usePathname();
  // Extract the subject slug from the parameters, default to 'No subject found' if not present
  const subject = params.subjectSlug || 'No subject found';

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Subject: {subject}</h2>
      <ol style={{ listStyle: 'none', paddingLeft: '0px', counterReset: 'listNumber' }}>
        {chapters.map((topic, i) => (
          <li key={i} style={styles.chapterCard}>
            <h2 style={styles.chapterTitle}>
              <span style={styles.listNumber}></span> {topic.title}
            </h2>
            <ul>
              {topic.subtopics.map((sub, j) => (
                <li key={i.toString() + "-" + j.toString()} style={styles.subTopic}>
                  <CustomLink
                    style={styles.subTopicLink}
                    active={sub.active}
                    href={current_path + '/chapter/' + sub.slug}
                  >
                    {sub.active ? <b>{sub.title}</b> : sub.title}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Page;
