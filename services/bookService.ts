export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

export interface BooksResponse {
  items: Book[];
  totalItems: number;
}

const api = "https://www.googleapis.com/books/v1/volumes";

export const BookService = {
  getBooks(
    query: string,
    startIndex = 0,
    maxResults = 10
  ): Promise<BooksResponse> {
    // If no query or query is just 2 chars, return empty
    // just trying to not overload the api :)
    if (!query || query.length < 2) {
      return Promise.resolve({ totalItems: 0, items: [] });
    }
    query = query.toLowerCase().replace(/\s/, "+");
    return fetch(
      `${api}?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`
    ).then(response => response.json());
  }
};
