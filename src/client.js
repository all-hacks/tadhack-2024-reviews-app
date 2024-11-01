// src/client.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.staging.v2.tnid.com/company',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIiLCJjb21wYW55X2lkIjoiMTBlMWIzYWEtMzQ3Yi00ODkyLThjNmEtNDAwOTI4MTkzMDUwIiwiZXhwIjoxNzMxMDQ1MjcyLCJpYXQiOjE3MzA0NDA0NzIsImlzcyI6IiIsImp0aSI6ImQwZjU1MWQxLWUyYTMtNGM3YS04OTNjLTdhNmIwZDcxMjIzOSIsIm5iZiI6MTczMDQ0MDQ3MSwic3ViIjoiQ29tcGFueUlkOjEwZTFiM2FhLTM0N2ItNDg5Mi04YzZhLTQwMDkyODE5MzA1MCIsInR5cCI6ImFjY2VzcyJ9._lwBD85xnzx10MCYwXgsZ-6U-BfsFGVu5p0QZ9deA_ZB_U6YvDttbG6i6b-FSbuoO-oM2fnCIpoCa3ZMsa-pkA';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  //uri: 'https://api.staging.v2.tnid.com/company',
  cache: new InMemoryCache(),
});

export default client;
