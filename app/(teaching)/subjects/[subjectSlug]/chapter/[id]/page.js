import React from 'react';

function Page({params}) {
    const chapter = params.id || 'No chapter selected'
    return (
        <div>Chapter {chapter}</div>
    );
}

export default Page;
