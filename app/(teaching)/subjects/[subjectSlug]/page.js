import React from 'react';

function Page({params}) {
    const subject = params.subjectSlug || 'No subject found'
    return (
        <div>Subject: {subject}</div>
    );
}

export default Page;
