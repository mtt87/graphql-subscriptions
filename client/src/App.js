import React, { Component } from "react";
import gql from "graphql-tag";
import "./App.css";
import { Subscription } from "react-apollo";

const PRODUCT_UPDATED_SUBSCRIPTION = gql`
  subscription productUpdates {
    productUpdates {
      id
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Subscription subscription={PRODUCT_UPDATED_SUBSCRIPTION}>
            {result => {
              console.log(result);
              return null;
            }}
          </Subscription>
        </header>
      </div>
    );
  }
}

export default App;
