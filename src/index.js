import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

const init = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://127.0.0.1:32768/employees", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.listen({ port: 7000 }, () =>
    console.log(
      `Ready and listening at http://localhost:7000${server.graphqlPath}`
    )
  );
};

init();
