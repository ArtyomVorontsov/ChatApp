import React from 'react'
import {ApolloProvider as Provider, InMemoryCache, ApolloClient, createHttpLink, DefaultOptions, split } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

//settings
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const token = localStorage.getItem('token');

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});


const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: token ? `Bearer ${token}` : "",
    },
  },
});



const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});


export default function ApolloProvider(props: any) {
    return (
        <Provider client={client} {...props}/>
    )
}

