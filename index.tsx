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
  const [books, setBooks] = useState<BooksResponse>();
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchFromApi = async () => {
      const newBooks = await BookService.getBooks(query, startIndex);
      setBooks(newBooks);
      setLoading(false);
    };
    fetchFromApi();
  }, [query, startIndex]);

  const updateStartIndex = offset => setStartIndex(startIndex + offset);
  const updateSearch = (query = "") => {
    setStartIndex(0);
    setQuery(query);
  };

  return (
    <div>
      <div className="header">
        <h1>Boogle</h1>
        <h2>Welcome to Boogle, the number 1 book search engine</h2>
      </div>
      <div className="searchArea">
        <input
          placeholder="Start typing... (at least two characters)"
          value={query}
          onChange={({ target }) => updateSearch(target.value)}
        />
        <button onClick={() => updateSearch("")}>Clear</button>
      </div>
      <div className="results">
        {query.length < 2 && (
          <p className="instruction">Please make a search above</p>
        )}
        {query && query.length >= 2 && isLoading && (
          <p className="instruction">Loading...</p>
        )}
        {query && !isLoading && books && <BookList {...books} />}
      </div>
      {query && !isLoading && (
        <div className="pageNavigation">
          <button
            disabled={startIndex < 10}
            onClick={() => updateStartIndex(-10)}
            className="previousPage"
          >
            Previous page
          </button>
          <button onClick={() => updateStartIndex(10)} className="nextPage">
            Next page
          </button>
        </div>
      )}
    </div>
  );
};

render(<App />, document.getElementById("root"));
