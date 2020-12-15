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

const api = 'https://www.googleapis.com/books/v1/volumes';

export const BookService = {

    getBooks(query: string, startIndex = 0, maxResults = 10): Promise<BooksResponse> {
        if (!query) {
            return Promise.resolve({ totalItems: 0, items: [] });
        }
        query = query.toLowerCase().replace(/\s/, '+');
        return fetch(`${api}?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`).then(response => response.json())
    }
}
