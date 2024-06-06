import { useState, useEffect } from "react";
import axios from "axios";

import BookCreate from './Components/BookCreate';
import BookList from './Components/BookList';

function App() {
  const [books, setBooks] = useState([]);
  const LOCAL_API = 'http://localhost:3001/books/'

  const fetchBooks = async () => {
    const response = await axios.get(LOCAL_API);

    setBooks(response.data);
  }

  // Executes fetchBook() only on initial render when 
  // an empty array is passed as the second argument
  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (title) => {
    const response = await axios.post(LOCAL_API, {
      title
    });

    const updatedBooks = [
      ...books,
      response.data
    ];

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(LOCAL_API + id);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(LOCAL_API + id,{
      title: newTitle
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data }
      }
      return book
    });

    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList
        books={books}
        onDelete={deleteBookById}
        onEdit={editBookById}
      />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;