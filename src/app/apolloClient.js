import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

/** @type {ApolloClient<InMemoryCache> | undefined} */
let client;


// Check if in development environment
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  loadDevMessages();
  loadErrorMessages();
}

// Ensure Apollo Client is only initialized on the client side
if (typeof window !== 'undefined') {
  const APIURL = 'https://api.studio.thegraph.com/query/50950/contract/v0.2';

  client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });
}

export default client;
