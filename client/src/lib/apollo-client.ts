import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://employee-directory-app-nouq.onrender.com/graphql', // Apollo v3 default path
  cache: new InMemoryCache(),
});

export default client;
