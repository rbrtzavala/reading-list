import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);
  const LOCAL_API = 'http://localhost:3001/books/'

  const fetchBooks = async () => {
    const response = await axios.get(LOCAL_API);

    setBooks(response.data);
  }

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

  const valueToShare = {
    books,
    createBook,
    deleteBookById,
    editBookById,
    fetchBooks
  }

  return (
    <BooksContext.Provider value={ valueToShare }>
      {children}
    </BooksContext.Provider>
  )
}

export { Provider };
export default BooksContext;