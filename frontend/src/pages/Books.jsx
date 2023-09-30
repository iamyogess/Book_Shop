import React, { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/books/");
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <div>
      <h1>List of Available Books</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id}>
            {book.img && <img src={book.img} alt="book img" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
