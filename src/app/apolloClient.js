import { ApolloClient, InMemoryCache } from '@apollo/client';

const APIURL = 'https://api.studio.thegraph.com/query//<SUBGRAPH_NAME>/';

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export default client;
