import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import BookListPage from "./pages/book-list-page";
import BookFormPage from "./pages/book-form-page";
import "./App.css";

/* IMPORT ALL HIGH ODER COMPONENT AND CREATE ROUTES */
class App extends Component {
  render() {
    return (
      <Container>
        <div className="ui two item menu">
          <NavLink className="item" activeClassName="" exact to="/">
            Book List
          </NavLink>
          <NavLink className="item" activeClassName="" exact to="/book/new">
            Add Book
          </NavLink>
        </div>

        <Route path="/" component={BookListPage} exact={true} />
        <Route path="/book/new" component={BookFormPage} />
        <Route path="/book/edit/:_id" component={BookFormPage} />
      </Container>
    );
  }
}

export default App;
