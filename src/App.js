import { useEffect, useContext } from "react";

import BookCreate from './Components/BookCreate';
import BookList from './Components/BookList';
import BooksContext from "./context/books";

function App() {
  const { fetchBooks } = useContext(BooksContext);

  // Executes fetchBook() only on initial render when 
  // an empty array is passed as the second argument
  useEffect(() => {
    fetchBooks();
  }, []);


  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;