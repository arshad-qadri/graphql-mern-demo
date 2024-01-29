const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { default: axios } = require("axios");

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
    type Todo {
        userId: ID!
        id: ID!
        title:String!
        completed:Boolean!
        user:User
    }
    type User {
        name:String!
    }
    type Query{
        getTodos:[Todo]
        getAllUsers:[User]
        getUsers(id:ID!):User
    }
    `,
    resolvers: {
      Todo: {
        user: async (todo) => {
        return  (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`
            )
          ).data;
        },
      },

      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
      },
    },
  });
  // app.listen(8000, ()=>console.log(`Server started on port 8000`))
  const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
