const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubsub = new PubSub();

const BOOK_ADDED = 'BOOK_ADDED';

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }

  type Subscription {
    bookAdded: Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook(root, { title, author }) {
      pubsub.publish(BOOK_ADDED, { bookAdded: { title, author } });
      books.push({ title, author });
      return { title, author };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, cors: true });

server.listen(4000).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});