import React from 'react';

function Page({params}) {
    const bookTitle = params.title || 'Select a book'
    return (
        <div>Book: {bookTitle}</div>
    );
}

export default Page;
