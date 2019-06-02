// ### Part 1

// * Open the `Books.js` file. Add code so that `this.state.title`, `this.state.author`, and `this.state.synopsis` are updated as their corresponding `Input` components are updated (see the `name` properties on each `Input`). Any props you attach to the `Input` components will be passed down to their underlying elements, so there's no need to modify any code other than the code inside of `Books.js`.

// * Add code so that when the `FormBtn` is clicked, an AJAX request is performed saving the new book. An object containing the new book's `title`, `author` and `synopsis` should be passed into the `API.saveBook` method.

import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () =>{
    console.log("Getting book list!")
    API.getBooks()
      .then(res =>{
        console.log("Finished getting book list!",res);

        //clears out the form for us:
        this.setState({
          books: res.data, title: "", author: "", synopsis: "",
        })
      })
      .catch(err => console.log(err))
  }

  deleteBook = id =>{
    API.deleteBook(id)
    .then(res => this.loadBooks())
    .catch(err => console.log(err))
  };

  handleOnChange = (event) => {
    // const value = event.target.value,
    // const name = event.target.name
    //destructuring assignment:
    const { value, name } = event.target

    //return only numbers (controlled vs uncontrolled state .. this is controlled state).. input restriction/form validation
  //   if (isNaN(parseInt(value))){
  //     return;
  //   }

    this.setState({
      [name]: value
    })
  }

  //save the book
  saveBook = (event) => {
    event.preventDefault();
    API.saveBook({
      title: this.state.title,
      author: this.state.author,
      synopsis: this.state.title,
    })
    //then reflect saved book on updated list, which also clears out the form
    .then(response => {
      this.loadBooks()
      })
  };

  deleteBook = (id) => {
    API.deleteBook(id)
      .then(() => {
        this.loadBooks();
      })
  }

  render() {
    console.log(this.state)
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form> 
              {/* //how do we relate the button click to state? controlled vs uncontrolled state..control for 'ya burnt' */}
              <button onClick={(e) => {e.preventDefault(); this.setState({ author: 'ya burnt' }); }}>Click me!</button>
              <Input 
              name="title" 
              placeholder="Title (required)"
              onChange={this.handleOnChange}
              value={this.state.title} 
              />
              <Input 
              name="author" 
              placeholder="Author (required)" 
              onChange={this.handleOnChange}
              value={this.state.author}
              />
              <TextArea 
              name="synopsis" 
              placeholder="Synopsis (Optional)" 
              onChange={this.handleOnChange}
              value={this.state.synopsis}
              />
              <FormBtn onClick={this.saveBook}>Submit Book</FormBtn>
             
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      {/* partial application (function that calls another function with the same args every time) to delete book
                      so we apply these arguments to that function every time, so now every list item has an id associated with it every time we call deleteBook. see deleteBook lifecycle method above
                      .map the passed in deleteBook function to the instance of a component*/}
                      <DeleteBtn onClick={() => {this.deleteBook(book._id); }} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
