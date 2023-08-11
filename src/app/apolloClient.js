import { ApolloClient, InMemoryCache } from '@apollo/client';

const APIURL = 'https://api.studio.thegraph.com/query/contract/v0.0.1/';



const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export default client;
