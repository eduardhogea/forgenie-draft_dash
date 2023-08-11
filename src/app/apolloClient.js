import { ApolloClient, InMemoryCache } from '@apollo/client';

const APIURL = 'https://api.studio.thegraph.com/query/50950/contract/v0.2'

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export default client;
