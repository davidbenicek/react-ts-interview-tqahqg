import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import BookList from "./components/BookList";
import { BookService, BooksResponse } from "./services/bookService";
import "./style.css";

/**
 * Please create functional components using hooks.
 * You can install any additional libraries but it is also totally fine if you keep it simple and not use any additional dependencies.
 *
 * 1. Implement free text search and list books
 *    `BookService` returns a list of books based on a `query` string using Google Books API.
 *     Display a text input where users can enter a search text and then list the matching books using `BookService`.
 *     Show at least the title and cover image of each matching book.
 *
 *
 * 2. [Bonus] Implement pagination
 *    Show 10 books per page and implement going to next/previous page.
 */

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BooksResponse>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchFromApi = async () => {
      const newBooks = await BookService.getBooks(query);
      console.log(newBooks);
      setBooks(newBooks);
      setLoading(false);
    };
    fetchFromApi();
  }, [query]);

  return (
    <div>
      <h1>Boogle</h1>
      <h2>Welcome to Boogle, the number 1 book search engine</h2>
      <input
        placeholder="Start typing..."
        onChange={({ target }) => setQuery(target.value)}
      />
      {query.length < 2 && <h3>Please make a search above</h3>}
      {query && query.length >= 2 && isLoading && <h3>Loading...</h3>}
      {query && !isLoading && <BookList {...books} />}
    </div>
  );
};

render(<App />, document.getElementById("root"));
