import { useState } from "react";

import BookCreate from './Components/BookCreate.js';

function App() {
  const [books, setBooks] = useState([]);

  const createBook = (title) => {
    console.log(`Add book with title: ${title}`)
  };

  const editBook = () => {

  };

  const deleteBook = () => {

  };

  return (
    <div>
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;