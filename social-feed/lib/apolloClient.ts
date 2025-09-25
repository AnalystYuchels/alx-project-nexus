import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_ENDPOINT = 'https://graphqlzero.almansi.me/api'; // public placeholder

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: false,
            merge(existing = { data: [] }, incoming: { data: any[] }) {
              return {
                ...incoming,
                data: [...(existing.data || []), ...(incoming.data || [])],
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
