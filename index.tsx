import React, { useState } from "react";
import { render } from "react-dom";
import { BookService } from "./bookService";
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

// example usage of book service to get books matching `Switzerland` (feel free to delete)
BookService.getBooks("Switzerland").then(response => {
  console.log(response);
});

const App: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1>Boogle</h1>
      <h2>Welcome to Boogle, the number 1 book search engine</h2>
      <input
        placeholder="Start typing..."
        onChange={({ target }) => setQuery(target.value)}
      />
      {query}
    </div>
  );
};

render(<App />, document.getElementById("root"));
