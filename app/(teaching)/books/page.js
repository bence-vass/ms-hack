import React from 'react';
import { books } from "@/app/(teaching)/books/dummy_books";

function Page(props) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {books.map((book, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <img src={book.img} alt={book.title}
            style={{maxWidth: '200px', height: 'auto', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
          />
          <h3 style={{ marginBottom: '5px' }}>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
    );
}

export default Page;
