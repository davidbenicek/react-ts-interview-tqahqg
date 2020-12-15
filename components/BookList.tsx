import React from "react";

import { Book } from "../services/bookService";

import "./style.css";

type BookListProps = {
  items: Book[];
  totalItems: number;
};

const BookList = (props: BookListProps) => {
  const renderBookResult = ({
    id,
    volumeInfo: { title, subtitle, imageLinks }
  }: Book) => (
    <div key={id} className="bookResult">
      <img src={imageLinks && imageLinks.thumbnail} alt="" />
      <div className="bookDetails">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
      </div>
    </div>
  );

  return (
    <div>
      {props.items &&
        !!props.items.length &&
        props.items.map(book => renderBookResult(book))}
      {!props.items && <p className="instruction">No results found</p>}
    </div>
  );
};

export default BookList;
