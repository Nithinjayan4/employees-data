const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const { connectToDB } = require('./db');

const PORT = process.env.PORT || 4000;

connectToDB().then(() => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  server.listen({ port: PORT, host: '0.0.0.0', path: '/graphql' }).then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });
});
