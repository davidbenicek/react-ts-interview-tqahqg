import React from "react";

import { Book } from "../services/bookService";

import "./style.css";

type BookListProps = {
  items: Book[];
  totalItems: number;
};
const BookList = (props: BookListProps) => {
  const renderBookResult = ({ id, title, subtitle, imageLinks }) => (
    <div key={id}>
      <img src={imageLinks.thumbnail} alt="" />
      <div>
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
      </div>
    </div>
  );

  console.log("pr", props);

  return (
    <div>
      {props.items &&
        props.items.map(({ volumeInfo }) => renderBookResult(volumeInfo))}
      {!props.items && <h3>No results found</h3>}
    </div>
  );
};

export default BookList;
