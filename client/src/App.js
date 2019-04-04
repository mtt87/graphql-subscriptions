import React, { Component } from 'react';
import logo from './logo.svg';
import gql from 'graphql-tag';
import './App.css';
import { Query } from 'react-apollo';

const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription onBookAdded {
    bookAdded {
      title
      author
    }
  }
`;

const BOOKS = gql`
  query books {
    books {
      title
      author
    }
  }
`;

class Books extends Component {
  componentDidMount() {
    this.props.subscribeToNewBooks();
  }

  render() {
    const { books } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Query query={BOOKS}>
            {({ subscribeToMore, loading, data, error }) => {
              if (loading || error) {
                return null;
              }
              if (!data) {
                return null;
              }
              console.log(data);
              return (
                <Books 
                  subscribeToNewBooks={() =>
                    subscribeToMore({
                      document: BOOK_ADDED_SUBSCRIPTION,
                      updateQuery: (prev, { subscriptionData }) => {
                        console.log(subscriptionData);
                        if (!subscriptionData.data) {
                          return prev;
                        }
                        const newBook = subscriptionData.data.bookAdded;
          
                        return Object.assign({}, prev, {
                          books: [newBook, ...prev.books]
                        });
                      }
                    })
                  }
                  books={data.books}
                />
              )
            }}
          </Query>
        </header>
      </div>
    );
  }
}

export default App;
