# graphql-subscriptions
Testing GraphQL subscriptions

Run both the client (`http://localhost:3000`) and the server (`http://localhost:4000`, `ws://localhost:4000`)
```
cd client && npm i && npm start
```
```
cd server && npm i && npm start
```

Then you can test with this migration
```graphql
mutation {
  addBook(title:"I love my pizza", author: "John Peppermint") {
    title
    author
  }
}
```

The UI will update immediately
![Screenshot 2019-04-04 at 15 47 47](https://user-images.githubusercontent.com/2150927/55565036-02777100-56f1-11e9-89a9-c0a0bd171095.png)
