import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../App.css";

/** VIEW ONE BLOCK OF  BOOK  */

export default function BookCard({ book, deleteBook }) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{book.book_name}</Card.Header>
        <Card.Description>
          <p>
            <label> Book Name : </label> {book.book_name}
          </p>
          <p>
            <label> Book Author : </label>
            {book.author}
          </p>
          <p>
            <label> Book Description : </label>
            {book.description}
          </p>
          <p>
            <label> Book Count : </label>
            {book.count}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link to={`/book/edit/${book._id}`} className="ui basic button green">
            Edit
          </Link>
          <Button basic color="red" onClick={() => deleteBook(book._id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

BookCard.propTypes = {
  book: PropTypes.object.isRequired
};
